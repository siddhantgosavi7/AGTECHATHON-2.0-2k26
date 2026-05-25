export function buildWeatherRisk({ location = 'Pune, Maharashtra', crop = 'Tomato' } = {}) {
  const humidity = 82;
  const rain = 68;
  const temp = 29;
  const riskScore = Math.min(100, Math.round(humidity * 0.45 + rain * 0.35 + Math.max(0, temp - 24) * 3));

  return {
    location,
    crop,
    temp,
    humidity,
    rain,
    wind: 11,
    riskScore,
    risks: [
      { disease: 'Fungal Blight', level: riskScore > 70 ? 'High' : 'Medium', action: 'Spray preventive fungicide before evening humidity rises.' },
      { disease: 'Powdery Mildew', level: 'Medium', action: 'Improve airflow and inspect shaded rows.' },
      { disease: 'Bacterial Spot', level: 'Low', action: 'Avoid splash irrigation for 48 hours.' },
    ],
  };
}
