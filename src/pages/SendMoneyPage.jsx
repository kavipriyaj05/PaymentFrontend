import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

function SendMoneyPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ receiverAccount: '', amount: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSend = async () => {
    setLoading(true); setError('');
    try {
      const res = await axiosInstance.post('/otp/generate', form);
      localStorage.setItem('otpReference', res.data.otpReference);
      localStorage.setItem('transferAmount', form.amount);
      localStorage.setItem('receiverAccount', form.receiverAccount);
      navigate('/otp');
    } catch {
      setError('Failed to send OTP. Check the account number and try again.');
    } finally { setLoading(false); }
  };

  return (
    <div className="page-wrapper">
      <div className="card">
        <div className="send-header">
          <button className="back-btn" onClick={() => navigate('/dashboard')}>←</button>
          <h1 className="page-title" style={{ marginBottom: 0 }}>Send Money</h1>
        </div>

        <div className="amount-display">
          <div className="amount-display-label">Amount to send</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: 'var(--text-muted)', fontWeight: 500 }}>₹</span>
            <input className="amount-input-styled" name="amount" type="number" placeholder="0.00" onChange={handleChange} />
          </div>
        </div>

        <div className="field">
          <label>Recipient Account Number</label>
          <div className="input-wrapper">
            <span className="input-icon">🏦</span>
            <input className="input" name="receiverAccount" placeholder="Enter account number" onChange={handleChange} />
          </div>
        </div>

        {error && <div className="alert alert-error"><span>⚠️</span> {error}</div>}

        <button className="btn btn-primary" onClick={handleSend} disabled={loading || !form.receiverAccount || !form.amount}>
          {loading ? <span className="spinner" /> : null}
          {loading ? 'Sending OTP...' : '🔐 Send OTP & Continue'}
        </button>
        <div style={{ marginTop: '10px', textAlign: 'center', fontSize: '12px', color: 'var(--text-muted)' }}>
          An OTP will be sent to your registered email for verification.
        </div>
      </div>
    </div>
  );
}

export default SendMoneyPage;