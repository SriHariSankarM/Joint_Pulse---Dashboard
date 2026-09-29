import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import LiveData from './pages/LiveData';
import Alerts from './pages/Alerts';
import Maintenance from './pages/Maintenance';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="live-data" element={<LiveData />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="maintenance" element={<Maintenance />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
