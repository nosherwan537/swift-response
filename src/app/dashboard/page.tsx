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
        <div className="grid gap-6">
          {requests.map((req: any) => (
            <div key={req.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-4">
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
                  <p className="text-gray-800 font-medium mb-1 text-lg">{req.description}</p>
                  <p className="text-gray-500 text-sm">📍 {(req.location as any).address}</p>
                </div>
                <div className="text-right text-xs text-gray-400">
                  {new Date(req.created_at).toLocaleDateString()}
                </div>
              </div>

              {/* Volunteers Section */}
              <div className="mt-6 pt-4 border-t border-gray-50">
                <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <span>🤝 Volunteers ({req.volunteer_registrations?.length || 0})</span>
                  {req.volunteer_registrations?.length > 0 && <span className="bg-red-500 w-2 h-2 rounded-full animate-pulse"></span>}
                </h4>
                
                {req.volunteer_registrations?.length === 0 ? (
                  <p className="text-sm text-gray-400 italic">No volunteers yet.</p>
                ) : (
                  <div className="space-y-3">
                    {req.volunteer_registrations.map((vol: any) => (
                      <div key={vol.id} className="bg-gray-50 p-3 rounded-lg border border-gray-100 text-sm">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-gray-800">{vol.volunteer?.full_name || 'Volunteer'}</span>
                          <span className="text-xs text-gray-500">{new Date(vol.created_at).toLocaleTimeString()}</span>
                        </div>
                        <div className="text-gray-600 mb-1">📞 {vol.contact_info}</div>

                        {vol.message && (
                          <div className="bg-white p-2 rounded border border-gray-100 text-gray-700 italic mt-2">
                            "{vol.message}"
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Actions Section */}
              <div className="mt-4 pt-4 border-t border-gray-100 flex gap-3 justify-end">
                <button
                  onClick={() => router.push(`/requests/edit/${req.id}`)}
                  className="px-4 py-2 text-sm font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={async () => {
                    if (confirm('Are you sure you want to delete this emergency request? This action cannot be undone.')) {
                      const { error } = await supabase
                        .from('emergency_requests')
                        .delete()
                        .eq('id', req.id);
                      
                      if (error) {
                        alert('Error deleting request: ' + error.message);
                      } else {
                        setRequests(prev => prev.filter(r => r.id !== req.id));
                      }
                    }
                  }}
                  className="px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
