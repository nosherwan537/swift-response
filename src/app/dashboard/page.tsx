'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import { useRouter } from 'next/navigation';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardStats from '@/components/dashboard/DashboardStats';
import DashboardRequestsSection from '@/components/dashboard/DashboardRequestsSection';
import EmergencyMap from '@/components/maps/EmergencyMap';
import Loader from '@/components/Loader';

export default function DashboardPage() {
  const [requests, setRequests] = useState<any[]>([]); // Changed IEmergencyRequest[] to any[] as IEmergencyRequest import was removed
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
      } else {
        setUser(user);
        fetchRequests(user.id);
      }
    };
    checkUser();
  }, [router]);

  const fetchRequests = async (userId: string) => {
    const { data, error } = await supabase
      .from('emergency_requests')
      .select(`
        *,
        volunteer_registrations (
          id,
          message,
          contact_info,
          created_at,
          volunteer: profiles (
            full_name
          )
        )
      `)
      .eq('requester_id', userId)
      .order('created_at', { ascending: false });

    if (data) {
      setRequests(data);
    }
    setLoading(false);
  };

  const handleEdit = (id: string) => {
    router.push(`/requests/edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this emergency request? This action cannot be undone.')) {
      const { error } = await supabase
        .from('emergency_requests')
        .delete()
        .eq('id', id);

      if (error) {
        alert('Error deleting request: ' + error.message);
      } else {
        setRequests(prev => prev.filter(r => r.id !== id));
      }
    }
  };

  if (loading) return <Loader text="Loading Dashboard..." />;

  return (
    <div className="flex flex-col min-h-[800px] bg-white">
      <DashboardHeader
        userName={user?.user_metadata?.full_name || 'User'}
      />

      <div className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <DashboardStats
          userName={user?.user_metadata?.full_name || 'User'}
          userRole={user?.user_metadata?.role || 'User'}
        />

        {/* Emergency Map */}
        {requests.length > 0 && (
          <div className="mb-8">
            <EmergencyMap emergencies={requests} />
          </div>
        )}

        <DashboardRequestsSection
          requests={requests}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
