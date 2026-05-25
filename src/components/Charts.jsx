import { Bar, BarChart, CartesianGrid, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from 'recharts';
import { diseaseFrequency, healthTrends } from '../services/mockData';

const colors = ['#2fa84f', '#d2b379', '#54c66e', '#895b27'];

export function HealthTrendChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={healthTrends}>
        <CartesianGrid strokeDasharray="3 3" stroke="#dbe7d7" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="score" stroke="#218640" strokeWidth={3} dot={{ r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function DiseaseBarChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={diseaseFrequency}>
        <CartesianGrid strokeDasharray="3 3" stroke="#dbe7d7" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#2fa84f" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function FrequencyPieChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie data={diseaseFrequency} dataKey="value" nameKey="name" innerRadius={58} outerRadius={94} paddingAngle={3}>
          {diseaseFrequency.map((entry, index) => (
            <Cell key={entry.name} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
