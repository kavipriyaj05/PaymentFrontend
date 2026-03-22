import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async () => {
    setLoading(true); setError('');
    try {
      const res = await axiosInstance.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('name', res.data.name);
      localStorage.setItem('accountNumber', res.data.accountNumber);
      navigate('/dashboard');
    } catch {
      setError('Invalid email or password.');
    } finally { setLoading(false); }
  };

  return (
    <div className="page-wrapper">
      <div className="card">
        <div className="brand">
          <div className="brand-icon">P</div>
          <span className="brand-name">PayFlow</span>
        </div>
        <h1 className="page-title">Welcome back</h1>
        <p className="page-subtitle">Sign in to your account to continue.</p>

        <div className="field">
          <label>Email Address</label>
          <div className="input-wrapper">
            <span className="input-icon">✉️</span>
            <input className="input" name="email" type="email" placeholder="you@example.com" onChange={handleChange} />
          </div>
        </div>
        <div className="field">
          <label>Password</label>
          <div className="input-wrapper">
            <span className="input-icon">🔒</span>
            <input className="input" name="password" type="password" placeholder="Enter your password" onChange={handleChange} />
          </div>
        </div>

        {error && <div className="alert alert-error"><span>⚠️</span> {error}</div>}

        <button className="btn btn-primary" onClick={handleLogin} disabled={loading}>
          {loading ? <span className="spinner" /> : null}
          {loading ? 'Signing in...' : 'Sign In →'}
        </button>
        <p className="auth-footer">New to PayFlow? <a href="/register">Create an account</a></p>
      </div>
    </div>
  );
}

export default LoginPage;