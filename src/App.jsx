import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AuthPage } from './pages/AuthPage';
import { ChatbotPage } from './pages/ChatbotPage';
import { DashboardPage } from './pages/DashboardPage';
import { DetectionPage } from './pages/DetectionPage';
import { HistoryPage } from './pages/HistoryPage';
import { LandingPage } from './pages/LandingPage';
import { ReportsPage } from './pages/ReportsPage';
import { SchemesPage } from './pages/SchemesPage';
import { WeatherPage } from './pages/WeatherPage';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/detect" element={<DetectionPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/weather" element={<WeatherPage />} />
        <Route path="/chatbot" element={<ChatbotPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/schemes" element={<SchemesPage />} />
      </Routes>
    </Layout>
  );
}
