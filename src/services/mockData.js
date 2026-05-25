export const healthTrends = [
  { month: 'Jan', score: 74, scans: 12 },
  { month: 'Feb', score: 79, scans: 18 },
  { month: 'Mar', score: 68, scans: 24 },
  { month: 'Apr', score: 82, scans: 21 },
  { month: 'May', score: 88, scans: 32 },
  { month: 'Jun', score: 84, scans: 29 },
];

export const diseaseFrequency = [
  { name: 'Blight', value: 32 },
  { name: 'Rust', value: 24 },
  { name: 'Mildew', value: 18 },
  { name: 'Leaf Spot', value: 26 },
];

export const diagnosisHistory = [
  {
    id: 1,
    crop: 'Tomato',
    disease: 'Early Blight',
    severity: 'Medium',
    confidence: 92,
    date: '2026-05-18',
    image: 'https://images.unsplash.com/photo-1598512752271-33f913a5af13?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 2,
    crop: 'Wheat',
    disease: 'Leaf Rust',
    severity: 'High',
    confidence: 88,
    date: '2026-05-12',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 3,
    crop: 'Grape',
    disease: 'Powdery Mildew',
    severity: 'Low',
    confidence: 84,
    date: '2026-05-04',
    image: 'https://images.unsplash.com/photo-1596363505729-4190a9506133?auto=format&fit=crop&w=700&q=80',
  },
];

export const experts = [
  { name: 'Dr. Meera Patil', type: 'Agriculture Expert', distance: '2.4 km', rating: 4.9, phone: '+91 98765 44120' },
  { name: 'GreenGrow Fertilizers', type: 'Fertilizer Shop', distance: '4.1 km', rating: 4.6, phone: '+91 98765 20314' },
  { name: 'District Soil Lab', type: 'Soil Testing Center', distance: '6.8 km', rating: 4.7, phone: '+91 98765 77881' },
];

export const schemes = [
  { title: 'PM-KISAN', benefit: 'Income support for eligible farmer families', status: 'Open' },
  { title: 'Soil Health Card', benefit: 'Nutrient recommendations and soil testing', status: 'Open' },
  { title: 'PM Fasal Bima Yojana', benefit: 'Crop insurance against weather and pest losses', status: 'Apply soon' },
];

export const suggestedPrompts = [
  'Why are my tomato leaves turning yellow?',
  'Best fertilizer for sugarcane?',
  'How to prevent fungal infection?',
  'Should I spray after rainfall?',
];
