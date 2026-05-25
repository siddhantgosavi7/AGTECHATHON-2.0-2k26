import { experts, schemes } from '../data/store.js';

export function getSchemesAndExperts(_req, res) {
  res.json({ experts, schemes });
}
