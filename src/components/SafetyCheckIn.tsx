'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase';
import {
  calculateDistance,
  hasBeenAskedAboutEmergency,
  markEmergencyAsAsked,
  saveSafetyStatus,
  SAFETY_CHECK_CONFIG,
} from '@/utils/safety-check';
import { Heart, X, MapPin, AlertCircle } from 'lucide-react';

interface Emergency {
  id: string;
  type: string;
  description: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  created_at: string;
}

export default function SafetyCheckIn() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [nearbyEmergency, setNearbyEmergency] = useState<Emergency | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [responding, setResponding] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    checkUser();
  }, []);

  // Get user location (only if logged in)
  useEffect(() => {
    if (!user) return;
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.log('Location permission denied:', error);
        }
      );
    }
  }, [user]);

  // Check for nearby emergencies (only if logged in)
  useEffect(() => {
    if (!user || !userLocation) return;

    const checkNearbyEmergencies = async () => {
      try {
        // Fetch recent emergencies (last 24 hours)
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
        
        const { data: emergencies, error } = await supabase
          .from('emergency_requests')
          .select('*')
          .gte('created_at', twentyFourHoursAgo)
          .neq('status', 'resolved')
          .order('created_at', { ascending: false });

        if (error || !emergencies) return;

        // Find nearest emergency within threshold
        for (const emergency of emergencies) {
          const location = emergency.location as any;
          if (!location?.lat || !location?.lng) continue;

          const distance = calculateDistance(
            userLocation.lat,
            userLocation.lng,
            location.lat,
            location.lng
          );

          // Check if emergency is nearby and user hasn't been asked yet
          if (
            distance <= SAFETY_CHECK_CONFIG.PROXIMITY_THRESHOLD_KM &&
            !hasBeenAskedAboutEmergency(emergency.id)
          ) {
            setNearbyEmergency(emergency);
            setShowCheckIn(true);
            break;
          }
        }
      } catch (error) {
        console.error('Error checking emergencies:', error);
      }
    };

    // Check immediately
    checkNearbyEmergencies();

    // Check periodically
    const interval = setInterval(checkNearbyEmergencies, SAFETY_CHECK_CONFIG.CHECK_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [userLocation]);

  const handleResponse = async (isSafe: boolean) => {
    if (!nearbyEmergency) return;

    setResponding(true);

    try {
      // Save safety status
      saveSafetyStatus(nearbyEmergency.id, isSafe);
      
      // Mark as asked
      markEmergencyAsAsked(nearbyEmergency.id);

      // Close the popup immediately
      setShowCheckIn(false);
      setNearbyEmergency(null);

      if (!isSafe) {
        // If need help, redirect to create emergency request after closing
        setTimeout(() => {
          router.push('/requests/create');
        }, 100);
      }
    } catch (error) {
      console.error('Error saving response:', error);
    } finally {
      setResponding(false);
    }
  };

  const handleDismiss = () => {
    if (nearbyEmergency) {
      markEmergencyAsAsked(nearbyEmergency.id);
    }
    setShowCheckIn(false);
    setNearbyEmergency(null);
  };

  if (!showCheckIn || !nearbyEmergency) return null;

  const distance = userLocation
    ? calculateDistance(
        userLocation.lat,
        userLocation.lng,
        (nearbyEmergency.location as any).lat,
        (nearbyEmergency.location as any).lng
      ).toFixed(1)
    : null;

  return (
    <div className="fixed inset-0 bg-black/60 z-[200] flex items-center justify-center p-4 animate-fade-in">
      <div
        className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
          aria-label="Dismiss"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Header with Gradient */}
        <div className="bg-gradient-to-r from-[#008C5A] to-[#00A366] p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
          <div className="relative z-10 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Are You Safe?</h2>
            <p className="text-sm opacity-90">We detected an emergency near you</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Emergency Info */}
          <div className="mb-6 p-4 bg-red-50 rounded-xl border border-red-200">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-bold">
                {nearbyEmergency.type}
              </span>
              {distance && (
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-bold">
                  {distance} km away
                </span>
              )}
            </div>
            <p className="text-gray-700 text-sm mb-2 line-clamp-2">{nearbyEmergency.description}</p>
            <div className="flex items-start gap-2 text-xs text-gray-600">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{(nearbyEmergency.location as any).address}</span>
            </div>
          </div>

          {/* Message */}
          <div className="mb-6 text-center">
            <p className="text-gray-700 leading-relaxed">
              Your safety matters to us. Please let us know if you're okay.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleResponse(true)}
              disabled={responding}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
               I'm Safe
            </button>
            <button
              onClick={() => handleResponse(false)}
              disabled={responding}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
               Need Help
            </button>
          </div>

          {/* Footer Note */}
          <p className="text-xs text-gray-500 text-center mt-4">
            Your response helps us coordinate emergency support better
          </p>
        </div>
      </div>
    </div>
  );
}
