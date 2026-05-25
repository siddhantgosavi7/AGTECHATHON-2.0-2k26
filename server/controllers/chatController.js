import { z } from 'zod';
import { generateText } from '../services/gemini.js';

const chatSchema = z.object({
  message: z.string().min(1),
  language: z.string().optional().default('en'),
});

export async function chat(req, res) {
  const { message, language } = chatSchema.parse(req.body);
  const prompt = `You are KrishiRakshak AI, a concise farming assistant for Indian farmers.
Reply in language code "${language}" when possible.
Give practical, safe crop guidance. Recommend expert confirmation for pesticide decisions.
Farmer question: ${message}`;

  try {
    const text = await generateText(prompt, { temperature: 0.45 });
    res.json({ role: 'assistant', text });
  } catch {
    res.json({
      role: 'assistant',
      text: `I could not reach Gemini right now. For "${message}", inspect watering, humidity, leaf spots, and upload a clear leaf photo for diagnosis.`,
      source: 'fallback',
    });
  }
}
