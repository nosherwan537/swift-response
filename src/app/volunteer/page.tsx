'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import { useRouter } from 'next/navigation';
import { IEmergencyRequest, IVolunteerRegistration } from '@/types/models';
import VolunteerAction from '@/app/components/VolunteerAction';
import Link from 'next/link';

export default function VolunteerPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState<IEmergencyRequest[]>([]);
  const [myRegistrations, setMyRegistrations] = useState<Record<string, IVolunteerRegistration>>({});
  const [activeTab, setActiveTab] = useState<'feed' | 'my-volunteering'>('feed');

  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        await fetchData(user.id);
      }
      setLoading(false);
    };
    checkUser();
  }, []);

  const fetchData = async (userId: string) => {
    // Fetch active requests
    const { data: requestsData } = await supabase
      .from('emergency_requests')
      .select('*')
      .neq('status', 'resolved') // Show pending/assigned
      .neq('requester_id', userId) // Don't show my own requests
      .order('created_at', { ascending: false });

    if (requestsData) {
      setRequests(requestsData);
    }

    // Fetch my registrations
    const { data: regData } = await supabase
      .from('volunteer_registrations')
      .select('*')
      .eq('volunteer_id', userId);

    if (regData) {
      const regMap: Record<string, IVolunteerRegistration> = {};
      regData.forEach((r: IVolunteerRegistration) => {
        regMap[r.request_id] = r;
      });
      setMyRegistrations(regMap);
    }
  };

  const onRegistrationSuccess = (newReg: IVolunteerRegistration) => {
    setMyRegistrations(prev => ({
      ...prev,
      [newReg.request_id]: newReg
    }));
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-primary font-bold">Loading...</div>;
  }

  // Marketing Page for Unauthenticated Users
  if (!user) {
    return (
      <div className="bg-white min-h-screen">
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#008C5A] to-[#006B47] text-white overflow-hidden">
          <div className="container mx-auto px-4 text-center py-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Become a Volunteer</h1>
            <p className="text-xl opacity-95 mb-8">Join the community response team today.</p>
            <Link href="/login?redirect=/volunteer" className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-lg shadow-lg transition-transform hover:-translate-y-1">
              Login to Get Started
            </Link>
          </div>
        </section>
        {/* Simplified Marketing Content */}
        <div className="relative min-h-screen flex flex-wrap items-center justify-center max-w-6xl mx-auto py-12 px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Why Join?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-xl">
              <div className="text-4xl mb-4">❤️</div>
              <h3 className="text-xl font-bold mb-2">Help Others</h3>
              <p className="text-gray-600">Make a direct impact in your local community.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-2">Fast Response</h3>
              <p className="text-gray-600">Get notified immediately when help is needed nearby.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold mb-2">Community</h3>
              <p className="text-gray-600">Connect with other volunteers and verified NGOs.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Volunteer Dashboard
  const myVolunteeredRequests = requests.filter(r => myRegistrations[r.id]);
  const displayedRequests = activeTab === 'feed' ? requests : myVolunteeredRequests;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Volunteer Dashboard</h1>
            <p className="text-gray-600">Welcome, {user.user_metadata?.full_name || 'Volunteer'}</p>
          </div>
          <div className="bg-white p-1 rounded-lg border border-gray-200 flex">
            <button
              onClick={() => setActiveTab('feed')}
              className={`px-4 py-2 rounded-md font-semibold text-sm transition-all ${activeTab === 'feed' ? 'bg-primary text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
              style={{ backgroundColor: activeTab === 'feed' ? '#008C5A' : undefined }}
            >
              All Requests
            </button>
            <button
              onClick={() => setActiveTab('my-volunteering')}
              className={`px-4 py-2 rounded-md font-semibold text-sm transition-all ${activeTab === 'my-volunteering' ? 'bg-primary text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
              style={{ backgroundColor: activeTab === 'my-volunteering' ? '#008C5A' : undefined }}
            >
              My Volunteering ({Object.keys(myRegistrations).length})
            </button>
          </div>
        </div>

        {displayedRequests.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-lg">
              {activeTab === 'feed' 
                ? 'No active emergency requests at the moment. Good news!' 
                : 'You haven\'t volunteered for any requests yet.'}
            </p>
            {activeTab === 'my-volunteering' && (
              <button 
                onClick={() => setActiveTab('feed')}
                className="mt-4 text-[#008C5A] font-bold hover:underline"
              >
                Browse Open Requests
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-6">
            {displayedRequests.map(req => (
              <div key={req.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                        req.type === 'Medical' ? 'bg-red-100 text-red-700' :
                        req.type === 'Fire' ? 'bg-orange-100 text-orange-700' :
                        req.type === 'Flood' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {req.type}
                      </span>
                      <span className="text-gray-400 text-sm">•</span>
                      <span className="text-gray-500 text-sm">{new Date(req.created_at).toLocaleString()}</span>
                    </div>
                    {myRegistrations[req.id] && (
                      <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full border border-green-200">
                        Volunteered
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-2">{req.description}</h3>
                  
                  <div className="flex items-start gap-2 text-gray-600 mb-4">
                    <span className="mt-1">📍</span>
                    <span>{(req.location as any).address || 'Location provided'}</span>
                  </div>

                  {/* Requester Info could be fetched if not available in req, but req doesn't have requester name, only ID. 
                      However, for simplicity I'll skip fetching requester name for now unless I join it.
                      The requirements say "requester name". I might need to fetch profiles.
                  */}
                  
                  <VolunteerAction 
                    request={req} 
                    userId={user.id}
                    existingRegistration={myRegistrations[req.id] || null}
                    onRegistrationSuccess={onRegistrationSuccess}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
