import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

function OtpPage() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    setLoading(true); setError('');
    const otpReference = localStorage.getItem('otpReference');
    try {
      const res = await axiosInstance.post('/otp/verify', { otp, otpReference });
      if (res.data.verified) { navigate('/tpin'); }
      else { setError('Incorrect OTP. Please try again.'); }
    } catch {
      setError('Error verifying OTP. Please try again.');
    } finally { setLoading(false); }
  };

  const steps = ['Amount', 'OTP', 'PIN', 'Done'];

  return (
    <div className="page-wrapper">
      <div className="card">
        <div className="send-header">
          <button className="back-btn" onClick={() => navigate('/send')}>←</button>
          <h1 className="page-title" style={{ marginBottom: 0 }}>Verify OTP</h1>
        </div>

        <div style={{ display: 'flex', gap: '6px', marginBottom: '24px' }}>
          {steps.map((step, i) => (
            <div key={step} style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ height: '3px', borderRadius: '2px', background: i <= 1 ? 'var(--accent)' : 'var(--border)', marginBottom: '5px' }} />
              <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.3px', color: i <= 1 ? 'var(--accent)' : 'var(--text-muted)', textTransform: 'uppercase' }}>{step}</span>
            </div>
          ))}
        </div>

        <div className="otp-info-box">
          <span className="otp-info-icon">📧</span>
          <span className="otp-info-text">A 6-digit verification code has been sent to your registered email address.</span>
        </div>

        <div className="field">
          <label>Enter 6-digit OTP</label>
          <input className="input input-otp" maxLength="6" placeholder="— — — — — —" onChange={(e) => setOtp(e.target.value)} />
        </div>

        {error && <div className="alert alert-error"><span>⚠️</span> {error}</div>}

        <button className="btn btn-primary" onClick={handleVerify} disabled={loading || otp.length < 6}>
          {loading ? <span className="spinner" /> : null}
          {loading ? 'Verifying...' : 'Verify OTP →'}
        </button>
      </div>
    </div>
  );
}

export default OtpPage;