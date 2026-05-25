import { MapPin, Phone, Star, Clock } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { getNearbyLocations, getLocationDetails } from '../services/api';
import { Button } from './Button';
import { Card } from './Card';

export function MapComponent({ latitude, longitude, type = 'fertilizer_store' }) {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const markers = useRef([]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = initMap;
    document.head.appendChild(script);
  }, []);

  const initMap = () => {
    if (!mapRef.current) return;

    const newMap = new window.google.maps.Map(mapRef.current, {
      zoom: 14,
      center: { lat: latitude, lng: longitude },
      mapTypeControl: true,
      fullscreenControl: true,
      zoomControl: true,
      styles: [
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{ color: '#e9e9e9' }, { lightness: 17 }],
        },
      ],
    });

    setMap(newMap);
    fetchNearbyLocations(latitude, longitude, type, newMap);
  };

  const fetchNearbyLocations = async (lat, lng, locType, mapInstance) => {
    setLoading(true);
    try {
      const data = await getNearbyLocations(lat, lng, locType);
      setLocations(data);

      // Clear existing markers
      markers.current.forEach(m => m.setMap(null));
      markers.current = [];

      // Add new markers
      data.forEach((location, index) => {
        const marker = new window.google.maps.Marker({
          position: { lat: location.location.latitude, lng: location.location.longitude },
          map: mapInstance,
          title: location.name,
          label: String(index + 1),
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: '#16a34a',
            fillOpacity: 0.9,
            strokeColor: '#fff',
            strokeWeight: 2,
          },
        });

        marker.addListener('click', () => {
          setSelectedLocation(location);
          mapInstance.setCenter({ lat: location.location.latitude, lng: location.location.longitude });
          mapInstance.setZoom(16);
        });

        markers.current.push(marker);
      });

      // Add user location marker
      const userMarker = new window.google.maps.Marker({
        position: { lat, lng },
        map: mapInstance,
        title: 'Your Location',
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: '#3b82f6',
          fillOpacity: 1,
          strokeColor: '#fff',
          strokeWeight: 2,
        },
      });
      markers.current.push(userMarker);
    } catch (error) {
      console.error('Error fetching nearby locations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTypeChange = (newType) => {
    if (map) {
      fetchNearbyLocations(latitude, longitude, newType, map);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
      <Card className="p-0 overflow-hidden">
        <div ref={mapRef} className="h-[500px] w-full rounded-lg" />
      </Card>

      <div className="space-y-4">
        <div className="flex gap-2">
          {['fertilizer_store', 'expert', 'soil_lab'].map(t => (
            <Button
              key={t}
              variant={type === t ? 'primary' : 'secondary'}
              onClick={() => handleTypeChange(t)}
              className="flex-1 text-xs"
            >
              {t === 'fertilizer_store' ? '🏪' : t === 'expert' ? '👨‍🌾' : '🧪'} {t.replace('_', ' ')}
            </Button>
          ))}
        </div>

        <div className="space-y-3 max-h-[450px] overflow-y-auto">
          {loading && <p className="text-center text-slate-500">Loading locations...</p>}

          {locations.slice(0, 8).map((location, index) => (
            <Card
              key={location.id}
              className={`cursor-pointer transition ${selectedLocation?.id === location.id ? 'ring-2 ring-leaf-600' : ''}`}
              onClick={() => setSelectedLocation(location)}
            >
              <div className="flex items-start gap-3">
                <div className="grid h-8 w-8 place-items-center rounded-full bg-leaf-600 text-sm font-bold text-white">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm truncate dark:text-white">{location.name}</h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                    <MapPin size={12} />
                    {location.distance} km
                  </p>
                  {location.rating > 0 && (
                    <p className="text-xs font-semibold text-amber-600 flex items-center gap-1 mt-1">
                      <Star size={12} fill="currentColor" />
                      {location.rating}
                    </p>
                  )}
                  {location.openNow !== undefined && (
                    <p className="text-xs mt-1 flex items-center gap-1">
                      <Clock size={12} />
                      <span className={location.openNow ? 'text-green-600' : 'text-red-600'}>
                        {location.openNow ? 'Open now' : 'Closed'}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {selectedLocation && (
          <div className="pt-4 border-t">
            <Button className="w-full" onClick={() => window.open(`tel:${selectedLocation.phone}`)}>
              <Phone size={16} /> Contact
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
