import { env } from '../config/env.js';

const GOOGLE_MAPS_API = 'https://maps.googleapis.com/maps/api/place';

export async function getNearbyLocations(latitude, longitude, type = 'fertilizer_store', radius = 5000) {
  try {
    const searchTypes = {
      'fertilizer_store': 'fertilizer store|agricultural supplies',
      'expert': 'agricultural expert|farm consultant',
      'soil_lab': 'soil testing|agricultural laboratory',
    };

    const query = searchTypes[type] || type;
    const url = `${GOOGLE_MAPS_API}/nearbysearch/json`;

    const params = new URLSearchParams({
      location: `${latitude},${longitude}`,
      radius,
      keyword: query,
      key: env.googleMapsApiKey,
    });

    const response = await fetch(`${url}?${params}`);
    const data = await response.json();

    if (data.status !== 'OK') {
      return [];
    }

    return data.results.map(place => ({
      id: place.place_id,
      name: place.name,
      type: type,
      location: {
        latitude: place.geometry.location.lat,
        longitude: place.geometry.location.lng,
      },
      rating: place.rating || 0,
      address: place.vicinity,
      openNow: place.opening_hours?.open_now,
      photos: place.photos?.map(p => p.photo_reference) || [],
    }));
  } catch (error) {
    console.error('Maps API error:', error);
    return [];
  }
}

export async function getPlaceDetails(placeId) {
  try {
    const url = `${GOOGLE_MAPS_API}/details/json`;
    const params = new URLSearchParams({
      place_id: placeId,
      fields: 'name,rating,formatted_phone_number,opening_hours,website,reviews',
      key: env.googleMapsApiKey,
    });

    const response = await fetch(`${url}?${params}`);
    const data = await response.json();

    return data.result || null;
  } catch (error) {
    console.error('Place details error:', error);
    return null;
  }
}

export function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c).toFixed(1);
}
