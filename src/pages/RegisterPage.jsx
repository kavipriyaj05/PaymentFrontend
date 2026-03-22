import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', tpin: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setLoading(true); setError('');
    try {
      await axiosInstance.post('/auth/register', form);
      navigate('/login');
    } catch {
      setError('Registration failed. Please try again.');
    } finally { setLoading(false); }
  };

  return (
    <div className="page-wrapper">
      <div className="card">
        <div className="brand">
          <div className="brand-icon">P</div>
          <span className="brand-name">PayFlow</span>
        </div>
        <h1 className="page-title">Create account</h1>
        <p className="page-subtitle">Start sending money in seconds.</p>

        <div className="field">
          <label>Full Name</label>
          <div className="input-wrapper">
            <span className="input-icon">👤</span>
            <input className="input" name="name" placeholder="Your Name" onChange={handleChange} />
          </div>
        </div>
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
            <input className="input" name="password" type="password" placeholder="Min. 8 characters" onChange={handleChange} />
          </div>
        </div>
        <div className="field">
          <label>Transaction PIN (4-digit)</label>
          <div className="input-wrapper">
            <span className="input-icon">🔑</span>
            <input className="input input-pin" name="tpin" type="password" maxLength="4"
              placeholder="• • • •" onChange={handleChange} style={{ paddingLeft: '44px' }} />
          </div>
        </div>

        {error && <div className="alert alert-error"><span>⚠️</span> {error}</div>}

        <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
          {loading ? <span className="spinner" /> : null}
          {loading ? 'Creating account...' : 'Create Account →'}
        </button>
        <p className="auth-footer">Already have an account? <a href="/login">Sign in</a></p>
      </div>
    </div>
  );
}

export default RegisterPage;