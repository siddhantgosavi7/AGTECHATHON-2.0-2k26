import { buildWeatherRisk } from '../services/weather.js';

export function weatherRisk(req, res) {
  res.json(buildWeatherRisk(req.query));
}
