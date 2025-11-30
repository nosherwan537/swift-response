export type Role = 'citizen' | 'volunteer' | 'ngo_admin';
export type RequestStatus = 'pending' | 'assigned' | 'resolved';
export type RequestType = 'Medical' | 'Fire' | 'Flood' | 'Rescue' | 'Other';
export type ResourceType = 'Shelter' | 'Blood' | 'Hospital' | 'Food' | 'Medicine';

export interface ILocation {
  lat: number;
  lng: number;
  address: string;
}

export interface IUser {
  id: string;
  full_name: string;
  role: Role;
  contact_info?: string;
  created_at: string;
}

export interface IEmergencyRequest {
  id: string;
  requester_id: string;
  type: RequestType;
  status: RequestStatus;
  description: string;
  location: ILocation;
  volunteer_id?: string | null;
  created_at: string;
}

export interface IResource {
  id: string;
  provider_id: string;
  type: ResourceType;
  quantity: string;
  location: ILocation;
  description?: string;
  created_at: string;
}
