import { getNearbyLocations, getPlaceDetails, calculateDistance } from '../services/maps.js';

export async function getNearby(req, res) {
  try {
    const { latitude, longitude, type = 'fertilizer_store', radius = 5000 } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({ error: 'latitude and longitude required' });
    }

    const locations = await getNearbyLocations(
      parseFloat(latitude),
      parseFloat(longitude),
      type,
      parseFloat(radius)
    );

    const enriched = locations.map(loc => ({
      ...loc,
      distance: calculateDistance(
        parseFloat(latitude),
        parseFloat(longitude),
        loc.location.latitude,
        loc.location.longitude
      ),
    })).sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));

    res.json(enriched);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getDetails(req, res) {
  try {
    const { placeId } = req.query;

    if (!placeId) {
      return res.status(400).json({ error: 'placeId required' });
    }

    const details = await getPlaceDetails(placeId);
    res.json(details);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
