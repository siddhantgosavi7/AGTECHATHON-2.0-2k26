import axios from 'axios';
import { diagnosisHistory, experts, schemes } from './mockData';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
  timeout: 45000,
});

const wait = (ms = 700) => new Promise((resolve) => window.setTimeout(resolve, ms));

export async function detectDisease(file) {
  try {
    const formData = new FormData();
    formData.append('image', file);
    const { data } = await client.post('/detect-disease', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  } catch (error) {
    const message = error.response?.data?.error?.message || error.message || 'Disease detection failed.';
    throw new Error(message);
  }
}

export async function getWeatherRisk() {
  try {
    const { data } = await client.get('/weather-risk');
    return data;
  } catch {
    await wait();
    return {
      location: 'Pune, Maharashtra',
      temp: 29,
      humidity: 82,
      rain: 68,
      wind: 11,
      riskScore: 76,
      risks: [
        { disease: 'Fungal Blight', level: 'High', action: 'Spray preventive fungicide before evening humidity rises.' },
        { disease: 'Powdery Mildew', level: 'Medium', action: 'Improve airflow and inspect shaded rows.' },
        { disease: 'Bacterial Spot', level: 'Low', action: 'Avoid splash irrigation for 48 hours.' },
      ],
    };
  }
}

export async function sendChatMessage(message, language = 'en') {
  try {
    const { data } = await client.post('/chatbot', { message, language });
    return data;
  } catch {
    await wait(900);
    return {
      role: 'assistant',
      text: `Based on your question, start by checking recent watering, humidity, and visible leaf spots. For "${message}", I recommend uploading a clear leaf photo so the AI can confirm the likely disease.`,
      source: 'fallback',
    };
  }
}

export async function getHistory() {
  try {
    const { data } = await client.get('/history');
    return data;
  } catch {
    await wait(500);
    return diagnosisHistory;
  }
}

export async function getSchemesAndExperts() {
  try {
    const { data } = await client.get('/government-schemes');
    return data;
  } catch {
    await wait(500);
    return { experts, schemes };
  }
}

export async function createReport(payload) {
  try {
    const { data } = await client.post('/reports', payload);
    return data;
  } catch {
    await wait(400);
    return { id: crypto.randomUUID(), ...payload, createdAt: new Date().toISOString() };
  }
}

export async function saveDiagnosis(payload) {
  try {
    const { data } = await client.post('/diagnoses', payload);
    return data;
  } catch {
    await wait(300);
    return { id: crypto.randomUUID(), ...payload, date: new Date().toISOString() };
  }
}

export async function getNearbyLocations(latitude, longitude, type = 'fertilizer_store', radius = 5000) {
  try {
    const { data } = await client.get('/nearby', {
      params: { latitude, longitude, type, radius },
    });
    return data;
  } catch {
    await wait(600);
    return [
      { id: '1', name: 'Green Leaf Agro', type, distance: '2.4', rating: 4.9, address: 'Pune, MH', openNow: true },
      { id: '2', name: 'Farm Solutions', type, distance: '4.1', rating: 4.6, address: 'Pune, MH', openNow: true },
      { id: '3', name: 'Soil Care Center', type, distance: '6.8', rating: 4.7, address: 'Pune, MH', openNow: false },
    ];
  }
}

export async function getLocationDetails(placeId) {
  try {
    const { data } = await client.get('/place-details', {
      params: { placeId },
    });
    return data;
  } catch {
    return null;
  }
}

