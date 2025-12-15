'use client';

import { useCallback, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import Loader from '@/components/Loader';

interface LocationPickerProps {
  onLocationSelect: (lat: number, lng: number, address: string) => void;
  initialLocation?: { lat: number; lng: number };
}

const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '12px'
};

const defaultCenter = {
  lat: 31.5204, // Lahore, Pakistan
  lng: 74.3587
};

export default function LocationPicker({ onLocationSelect, initialLocation }: LocationPickerProps) {
  const [markerPosition, setMarkerPosition] = useState(initialLocation || defaultCenter);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || '',
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handleMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      setMarkerPosition({ lat, lng });

      // Reverse geocoding to get address
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === 'OK' && results && results[0]) {
          const address = results[0].formatted_address;
          onLocationSelect(lat, lng, address);
        } else {
          onLocationSelect(lat, lng, `${lat.toFixed(6)}, ${lng.toFixed(6)}`);
        }
      });
    }
  }, [onLocationSelect]);

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setMarkerPosition({ lat, lng });
          if (map) {
            map.panTo({ lat, lng });
            map.setZoom(15);
          }

          // Reverse geocoding
          const geocoder = new google.maps.Geocoder();
          geocoder.geocode({ location: { lat, lng } }, (results, status) => {
            if (status === 'OK' && results && results[0]) {
              const address = results[0].formatted_address;
              onLocationSelect(lat, lng, address);
            }
          });
        },
        (error) => {
          let message = 'Unable to get your current location.';
          switch (error.code) {
            case error.PERMISSION_DENIED:
              message = 'Location access denied. Please enable location permissions and try again.';
              break;
            case error.POSITION_UNAVAILABLE:
              message = 'Location information is unavailable. Please check your device settings.';
              break;
            case error.TIMEOUT:
              message = 'Location request timed out. Please try again.';
              break;
            default:
              message = 'An unknown error occurred while retrieving location.';
              break;
          }
          alert(message + ' You can click on the map to select a location manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  if (loadError) {
    return <div className="text-red-600 p-4 bg-red-50 rounded-lg">Error loading maps. Please check your API key.</div>;
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-[400px] bg-gray-100 rounded-xl flex items-center justify-center">
        <Loader className="min-h-0" text="Loading map..." />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <p className="text-sm font-semibold text-gray-700">📍 Click on the map to select location</p>
        <button
          type="button"
          onClick={handleGetCurrentLocation}
          className="text-sm bg-[#008C5A] text-white px-4 py-2 rounded-lg hover:bg-[#006B47] transition-colors font-semibold"
        >
          📍 Use Current Location
        </button>
      </div>
      <div className="border-2 border-gray-300 rounded-xl overflow-hidden shadow-lg">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={markerPosition}
          zoom={13}
          onLoad={onLoad}
          onUnmount={onUnmount}
          onClick={handleMapClick}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: true,
          }}
        >
          <Marker
            position={markerPosition}
            draggable={true}
            onDragEnd={(e) => {
              if (e.latLng) {
                handleMapClick({ latLng: e.latLng } as google.maps.MapMouseEvent);
              }
            }}
          />
        </GoogleMap>
      </div>
    </div>
  );
}
