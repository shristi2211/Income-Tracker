import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import PricingPage from './pages/PricingPage';
import BankConnectPage from './pages/BankConnectPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardPage from './pages/DashboardPage';
import InflowPage from './pages/InflowPage';
import OutflowPage from './pages/OutflowPage';
import SettingsPage from './pages/SettingsPage';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <Routes>
      {/* ── Public / Marketing Pages ── */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/bank-connect" element={<BankConnectPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* ── Protected Dashboard ── */}
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/app/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="inflow" element={<InflowPage />} />
        <Route path="outflow" element={<OutflowPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* ── Legacy redirects ── */}
      <Route path="/dashboard" element={<Navigate to="/app/dashboard" replace />} />
      <Route path="/inflow" element={<Navigate to="/app/inflow" replace />} />
      <Route path="/outflow" element={<Navigate to="/app/outflow" replace />} />
      <Route path="/settings" element={<Navigate to="/app/settings" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
