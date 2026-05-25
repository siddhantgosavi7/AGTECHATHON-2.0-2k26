import fs from 'node:fs/promises';
import { env } from '../config/env.js';
import { extractJson } from '../utils/json.js';

const endpoint = () =>
  `https://generativelanguage.googleapis.com/v1beta/models/${env.geminiModel}:generateContent?key=${env.geminiApiKey}`;

export async function generateText(prompt, { temperature = 0.35 } = {}) {
  if (!env.geminiApiKey) throw new Error('GEMINI_API_KEY is not configured.');

  const response = await fetch(endpoint(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { temperature },
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Gemini request failed: ${response.status} ${detail}`);
  }

  const data = await response.json();
  return data?.candidates?.[0]?.content?.parts?.map((part) => part.text || '').join('\n') || '';
}

export async function analyzeCropImage(filePath, mimeType) {
  if (!env.geminiApiKey) throw new Error('GEMINI_API_KEY is not configured.');

  const bytes = await fs.readFile(filePath);
  const imageBase64 = bytes.toString('base64');
  const prompt = `You are KrishiRakshak AI, an agriculture disease detection assistant.
Analyze ONLY the uploaded image. Do not assume tomato or early blight unless visible evidence supports it.
Return only valid JSON. No markdown.
Required JSON keys:
crop, disease, confidence, severity, symptoms, description, treatment, organicRemedies, dosage, safety, prevention, boundingBox, weatherRisk, needsExpertReview.
Rules:
- If the image is a diseased leaf but crop is uncertain, set crop to "Unknown crop".
- If disease is uncertain, set disease to "Unknown leaf disease" and confidence below 55.
- severity must be Low, Medium, or High.
- confidence must be a number from 0 to 100.
- symptoms/treatment/organicRemedies/dosage/safety/prevention must be arrays of short farmer-friendly strings.
- boundingBox must contain x, y, width, height as percentages from 0 to 100 for the most visibly affected area.
- needsExpertReview must be true when confidence is below 70.`;

  const response = await fetch(endpoint(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [
        {
          role: 'user',
          parts: [
            { text: prompt },
            { inline_data: { mime_type: mimeType, data: imageBase64 } },
          ],
        },
      ],
      generationConfig: { temperature: 0.2 },
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Gemini image analysis failed: ${response.status} ${detail}`);
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.map((part) => part.text || '').join('\n') || '';
  const parsed = extractJson(text);
  if (!parsed) {
    throw new Error('Gemini did not return valid diagnosis JSON.');
  }
  return parsed;
}

export function fallbackDiagnosis() {
  return {
    crop: 'Tomato',
    disease: 'Early Blight',
    confidence: 86,
    severity: 'Medium',
    symptoms: ['Brown concentric rings on leaves', 'Yellowing around infected spots', 'Drying lower leaves'],
    description: 'Likely fungal infection favored by warm, humid conditions. Confirm with a local expert if symptoms spread rapidly.',
    treatment: ['Mancozeb 75% WP', 'Copper oxychloride spray', 'Remove visibly infected leaves'],
    organicRemedies: ['Neem oil spray', 'Compost tea as preventive support'],
    dosage: ['Mancozeb 2g per liter of water', 'Neem oil 3ml per liter of water'],
    safety: ['Wear gloves and mask', 'Avoid spraying in strong wind', 'Do not spray during peak afternoon heat'],
    prevention: ['Avoid overhead watering', 'Improve row ventilation', 'Rotate crops next season', 'Remove crop debris'],
    boundingBox: { x: 38, y: 28, width: 32, height: 28 },
    weatherRisk: 'High humidity can increase fungal spread over the next 48 hours.',
  };
}
