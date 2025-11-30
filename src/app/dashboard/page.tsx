'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import { useRouter } from 'next/navigation';
import { IEmergencyRequest } from '@/types/models';

export default function DashboardPage() {
  const [requests, setRequests] = useState<IEmergencyRequest[]>([]);
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
      .select('*')
      .eq('requester_id', userId)
      .order('created_at', { ascending: false });

    if (data) {
      setRequests(data);
    }
    setLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) return <div className="p-8 text-center">Loading Dashboard...</div>;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">My Dashboard</h1>
        <button
          onClick={handleSignOut}
          className="text-red-600 hover:text-red-800 font-semibold"
        >
          Sign Out
        </button>
      </div>

      <div className="mb-8 p-6 bg-blue-50 rounded-xl border border-blue-100">
        <h2 className="text-xl font-bold text-blue-800 mb-2">Welcome, {user?.user_metadata?.full_name || 'User'}!</h2>
        <p className="text-blue-600">
          You are logged in as a <strong>{user?.user_metadata?.role}</strong>.
        </p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Requests</h2>
        <a href="/requests/create" className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
          + New Request
        </a>
      </div>

      {requests.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100 shadow-sm">
          <p className="text-gray-500 mb-4">You haven't made any requests yet.</p>
          <a href="/requests/create" className="text-primary font-bold hover:underline">Request Help Now</a>
        </div>
      ) : (
        <div className="grid gap-4">
          {requests.map((req) => (
            <div key={req.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${req.type === 'Medical' ? 'bg-red-100 text-red-700' :
                      req.type === 'Fire' ? 'bg-orange-100 text-orange-700' :
                        'bg-gray-100 text-gray-700'
                    }`}>
                    {req.type}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${req.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      req.status === 'resolved' ? 'bg-green-100 text-green-700' :
                        'bg-blue-100 text-blue-700'
                    }`}>
                    {req.status}
                  </span>
                </div>
                <p className="text-gray-800 font-medium mb-1">{req.description}</p>
                <p className="text-gray-500 text-sm">📍 {(req.location as any).address}</p>
              </div>
              <div className="text-right text-xs text-gray-400">
                {new Date(req.created_at).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
