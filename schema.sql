-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- 1. PROFILES TABLE (Extends auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text,
  role text check (role in ('citizen', 'volunteer', 'ngo_admin')) default 'citizen',
  contact_info text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Policies for Profiles
create policy "Public profiles are viewable by everyone."
  on public.profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on public.profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on public.profiles for update
  using ( auth.uid() = id );

-- 2. EMERGENCY REQUESTS TABLE
create table public.emergency_requests (
  id uuid default uuid_generate_v4() primary key,
  requester_id uuid references public.profiles(id) not null,
  type text check (type in ('Medical', 'Fire', 'Flood', 'Rescue', 'Other')) not null,
  status text check (status in ('pending', 'assigned', 'resolved')) default 'pending',
  description text,
  location jsonb not null, -- Stores { lat: number, lng: number, address: string }
  volunteer_id uuid references public.profiles(id), -- Nullable, assigned volunteer
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.emergency_requests enable row level security;

-- Policies for Requests
create policy "Requests are viewable by everyone."
  on public.emergency_requests for select
  using ( true );

create policy "Authenticated users can create requests."
  on public.emergency_requests for insert
  with check ( auth.role() = 'authenticated' );

create policy "Requester can update their own request."
  on public.emergency_requests for update
  using ( auth.uid() = requester_id );

create policy "Volunteers and Admins can update status."
  on public.emergency_requests for update
  using ( 
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.role in ('volunteer', 'ngo_admin')
    )
  );

create policy "Requester can delete their own request."
  on public.emergency_requests for delete
  using ( auth.uid() = requester_id );

-- 3. RESOURCES TABLE
create table public.resources (
  id uuid default uuid_generate_v4() primary key,
  provider_id uuid references public.profiles(id) not null,
  type text check (type in ('Shelter', 'Blood', 'Hospital', 'Food', 'Medicine')) not null,
  quantity text, -- e.g., "50 beds", "10 units"
  location jsonb not null, -- { lat, lng, address }
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.resources enable row level security;

-- Policies for Resources
create policy "Resources are viewable by everyone."
  on public.resources for select
  using ( true );

create policy "NGO Admins and Volunteers can create resources."
  on public.resources for insert
  with check ( 
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.role in ('volunteer', 'ngo_admin')
    )
  );

create policy "Provider can update their own resources."
  on public.resources for update
  using ( auth.uid() = provider_id );

-- 4. TRIGGER TO AUTO-CREATE PROFILE ON SIGNUP
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, role)
  values (new.id, new.raw_user_meta_data->>'full_name', coalesce(new.raw_user_meta_data->>'role', 'citizen'));
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 5. VOLUNTEER REGISTRATIONS TABLE
create table public.volunteer_registrations (
  id uuid default uuid_generate_v4() primary key,
  request_id uuid references public.emergency_requests(id) on delete cascade not null,
  volunteer_id uuid references public.profiles(id) on delete cascade not null,
  message text,
  contact_info text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(request_id, volunteer_id)
);

-- Enable RLS
alter table public.volunteer_registrations enable row level security;

-- Policies for Volunteer Registrations

-- Volunteers can register themselves
create policy "Volunteers can register themselves."
  on public.volunteer_registrations for insert
  with check ( auth.uid() = volunteer_id );

-- Volunteers can see their own registrations
create policy "Volunteers can see their own registrations."
  on public.volunteer_registrations for select
  using ( auth.uid() = volunteer_id );

-- Requesters can see volunteers for their requests
create policy "Requesters can see volunteers for their requests."
  on public.volunteer_registrations for select
  using (
    exists (
      select 1 from public.emergency_requests
      where emergency_requests.id = volunteer_registrations.request_id
      and emergency_requests.requester_id = auth.uid()
    )
  );

