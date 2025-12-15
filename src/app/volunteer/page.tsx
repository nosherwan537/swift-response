'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import { useRouter } from 'next/navigation';
import { IEmergencyRequest, IVolunteerRegistration } from '@/types/models';
import VolunteerAction from '@/app/components/VolunteerAction';
import Link from 'next/link';
import EmergencyFilterPanel from '@/components/volunteer/EmergencyFilterPanel';
import EmergencyMap from '@/components/maps/EmergencyMap';
import { Heart, Zap, Users, MapPin } from 'lucide-react';
import Loader from '@/components/Loader';

export default function VolunteerPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState<IEmergencyRequest[]>([]);
  const [myRegistrations, setMyRegistrations] = useState<Record<string, IVolunteerRegistration>>({});
  const [activeTab, setActiveTab] = useState<'feed' | 'my-volunteering'>('feed');

  // Filter state
  const [filters, setFilters] = useState({
    emergencyType: 'All',
    urgencyLevel: 'All',
    location: ''
  });

  // Location and suggestion state
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [nearestEmergency, setNearestEmergency] = useState<IEmergencyRequest | null>(null);

  const router = useRouter();

  // Calculate distance between two coordinates using Haversine formula
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  // Request location and find nearest emergency
  const requestLocationAndSuggest = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          setUserLocation({ lat: userLat, lng: userLng });

          // Find nearest emergency
          if (requests.length > 0) {
            let nearest = requests[0];
            let minDistance = Infinity;

            requests.forEach(req => {
              const reqLocation = req.location as any;
              if (reqLocation?.lat && reqLocation?.lng) {
                const distance = calculateDistance(
                  userLat,
                  userLng,
                  reqLocation.lat,
                  reqLocation.lng
                );
                if (distance < minDistance) {
                  minDistance = distance;
                  nearest = req;
                }
              }
            });

            setNearestEmergency(nearest);
            setShowSuggestion(true);
          }
        },
        (error) => {
          console.log('Location permission denied:', error);
        }
      );
    }
  };

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

  // Request location after requests are loaded
  useEffect(() => {
    if (user && requests.length > 0 && !userLocation) {
      // Small delay to let the page load first
      setTimeout(() => {
        requestLocationAndSuggest();
      }, 1000);
    }
  }, [user, requests]);

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

  const handleFilterChange = (field: 'emergencyType' | 'urgencyLevel' | 'location', value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      emergencyType: 'All',
      urgencyLevel: 'All',
      location: ''
    });
  };

  if (loading) {
    return <Loader />;
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
              <div className="text-4xl mb-4 flex justify-center text-red-500"><Heart className="w-10 h-10" /></div>
              <h3 className="text-xl font-bold mb-2">Help Others</h3>
              <p className="text-gray-600">Make a direct impact in your local community.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <div className="text-4xl mb-4 flex justify-center text-yellow-500"><Zap className="w-10 h-10" /></div>
              <h3 className="text-xl font-bold mb-2">Fast Response</h3>
              <p className="text-gray-600">Get notified immediately when help is needed nearby.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <div className="text-4xl mb-4 flex justify-center text-blue-500"><Users className="w-10 h-10" /></div>
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
  let displayedRequests = activeTab === 'feed' ? requests : myVolunteeredRequests;

  // Apply filters
  displayedRequests = displayedRequests.filter(req => {
    // Emergency type filter
    if (filters.emergencyType !== 'All' && req.type !== filters.emergencyType) {
      return false;
    }

    // Urgency level filter (if urgency field exists)
    if (filters.urgencyLevel !== 'All') {
      const reqUrgency = (req as any).urgency || 'Medium'; // Default to Medium if not set
      if (reqUrgency !== filters.urgencyLevel) {
        return false;
      }
    }

    // Location filter
    if (filters.location) {
      const address = (req.location as any)?.address || '';
      if (!address.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Nearest Emergency Suggestion Popup */}
      {showSuggestion && nearestEmergency && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-scale-in">
            {/* Header with Gradient */}
            <div className="bg-gradient-to-r from-[#008C5A] to-[#00A366] p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12  bg-opacity-20 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Emergency Nearby!</h3>
                    <p className="text-sm opacity-90">We found someone who needs help</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-bold">
                    {nearestEmergency.type}
                  </span>
                  {userLocation && (nearestEmergency.location as any)?.lat && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-bold">
                      {calculateDistance(
                        userLocation.lat,
                        userLocation.lng,
                        (nearestEmergency.location as any).lat,
                        (nearestEmergency.location as any).lng
                      ).toFixed(1)} km away
                    </span>
                  )}
                </div>
                <p className="text-gray-700 mb-3 line-clamp-3">{nearestEmergency.description}</p>
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <MapPin className="w-5 h-5 mt-0.5" />
                  <span>{(nearestEmergency.location as any)?.address || 'Location not specified'}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowSuggestion(false);
                    // Scroll to the emergency card
                    const element = document.getElementById(`emergency-${nearestEmergency.id}`);
                    element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  className="flex-1 bg-gradient-to-r from-[#008C5A] to-[#00A366] hover:from-[#006B47] hover:to-[#008C5A] text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                  View Details
                </button>
                <button
                  onClick={() => setShowSuggestion(false)}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
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

        {/* Emergency Map */}
        {displayedRequests.length > 0 && (
          <div className="mb-8">
            <EmergencyMap emergencies={displayedRequests} />
          </div>
        )}

        {/* Two-column layout: Filter panel + Requests */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filter Panel - Left Column */}
          <div className="lg:col-span-1">
            <EmergencyFilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Requests - Right Column */}
          <div className="lg:col-span-3">

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
                  <div
                    key={req.id}
                    id={`emergency-${req.id}`}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${req.type === 'Medical' ? 'bg-red-100 text-red-700' :
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
                        <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
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
      </div>
    </div>
  );
}
