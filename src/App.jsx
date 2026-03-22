import { Routes, Route, Navigate } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import SendMoneyPage from './pages/SendMoneyPage';
import OtpPage from './pages/OtpPage';
import TpinPage from './pages/TpinPage';
import HistoryPage from './pages/HistoryPage';
import SuccessPage from './pages/SuccessPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/send" element={<SendMoneyPage />} />
      <Route path="/otp" element={<OtpPage />} />
      <Route path="/tpin" element={<TpinPage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/success" element={<SuccessPage />} />
    </Routes>
  );
}
export default App;