'use client';

import { useCallback, useState } from 'react';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import { Map, MapPin } from 'lucide-react';
import Loader from '@/components/Loader';

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
  status: string;
}

interface EmergencyMapProps {
  emergencies: Emergency[];
}

const containerStyle = {
  width: '100%',
  height: '500px',
  borderRadius: '12px'
};

const defaultCenter = {
  lat: 31.5204, // Lahore, Pakistan
  lng: 74.3587
};

export default function EmergencyMap({ emergencies }: EmergencyMapProps) {
  const [selectedEmergency, setSelectedEmergency] = useState<Emergency | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || '',
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);

    // Fit bounds to show all emergencies
    if (emergencies.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      emergencies.forEach((emergency) => {
        if (emergency.location?.lat && emergency.location?.lng) {
          bounds.extend({ lat: emergency.location.lat, lng: emergency.location.lng });
        }
      });
      map.fitBounds(bounds);
    }
  }, [emergencies]);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const getMarkerIcon = (type: string) => {
    // Return different colored markers based on emergency type
    const colors: Record<string, string> = {
      'Medical': '#DC3545',
      'Fire': '#FF6B35',
      'Flood': '#4A90E2',
      'Rescue': '#FFD700',
      'Other': '#6C757D'
    };

    const color = colors[type] || '#DC3545';

    return {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: color,
      fillOpacity: 1,
      strokeColor: '#FFFFFF',
      strokeWeight: 2,
      scale: 10,
    };
  };

  if (loadError) {
    return <div className="text-red-600 p-4 bg-red-50 rounded-lg">Error loading maps. Please check your API key.</div>;
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-[500px] bg-gray-100 rounded-xl flex items-center justify-center">
        <Loader className="min-h-0" text="Loading map..." />
      </div>
    );
  }

  const center = emergencies.length > 0 && emergencies[0].location?.lat
    ? { lat: emergencies[0].location.lat, lng: emergencies[0].location.lng }
    : defaultCenter;

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <p className="text-sm font-semibold text-gray-700 flex gap-2">
          <Map /> Your Emergencies Map ({emergencies.length} {emergencies.length === 1 ? 'emergency' : 'emergencies'})
        </p>
      </div>
      <div className="border-2 border-gray-300 rounded-xl overflow-hidden shadow-lg">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: true,
          }}
        >
          {emergencies.map((emergency) => {
            if (!emergency.location?.lat || !emergency.location?.lng) return null;

            return (
              <Marker
                key={emergency.id}
                position={{ lat: emergency.location.lat, lng: emergency.location.lng }}
                onClick={() => setSelectedEmergency(emergency)}
                icon={getMarkerIcon(emergency.type)}
              />
            );
          })}

          {selectedEmergency && selectedEmergency.location?.lat && selectedEmergency.location?.lng && (
            <InfoWindow
              position={{ lat: selectedEmergency.location.lat, lng: selectedEmergency.location.lng }}
              onCloseClick={() => setSelectedEmergency(null)}
            >
              <div className="p-2 max-w-xs">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${selectedEmergency.type === 'Medical' ? 'bg-red-100 text-red-700' :
                    selectedEmergency.type === 'Fire' ? 'bg-orange-100 text-orange-700' :
                      selectedEmergency.type === 'Flood' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                    }`}>
                    {selectedEmergency.type}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${selectedEmergency.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    selectedEmergency.status === 'resolved' ? 'bg-green-100 text-green-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                    {selectedEmergency.status}
                  </span>
                </div>
                <p className="font-semibold text-gray-800 mb-1">{selectedEmergency.description}</p>
                <p className="text-sm text-gray-600 mb-1">📍 {selectedEmergency.location.address}</p>
                <p className="text-xs text-gray-500">{new Date(selectedEmergency.created_at).toLocaleString()}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </div>
  );
}
