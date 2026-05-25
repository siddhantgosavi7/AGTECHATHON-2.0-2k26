import { history } from '../data/store.js';

export function getHistory(req, res) {
  const query = String(req.query.q || '').toLowerCase();
  const items = query
    ? history.filter((item) => `${item.crop} ${item.disease} ${item.severity}`.toLowerCase().includes(query))
    : history;
  res.json(items);
}
