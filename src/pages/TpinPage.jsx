import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

function TpinPage() {
  const navigate = useNavigate();
  const [tpin, setTpin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const amount = localStorage.getItem('transferAmount');
  const receiverAccount = localStorage.getItem('receiverAccount');

  const handleTransfer = async () => {
    setLoading(true); setError('');
    const otpReference = localStorage.getItem('otpReference');
    try {
      const res = await axiosInstance.post('/transfer/send', { receiverAccount, amount, tpin, otpReference });
      localStorage.setItem('txnSuccess', JSON.stringify(res.data));
      navigate('/success');
    } catch (err) {
      setError(err.response?.data?.message || 'Transfer failed. Check your PIN and try again.');
    } finally { setLoading(false); }
  };

  const steps = ['Amount', 'OTP', 'PIN', 'Done'];

  return (
    <div className="page-wrapper">
      <div className="card">
        <div className="send-header">
          <button className="back-btn" onClick={() => navigate('/otp')}>←</button>
          <h1 className="page-title" style={{ marginBottom: 0 }}>Confirm Transfer</h1>
        </div>

        <div style={{ display: 'flex', gap: '6px', marginBottom: '24px' }}>
          {steps.map((step, i) => (
            <div key={step} style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ height: '3px', borderRadius: '2px', background: i <= 2 ? 'var(--accent)' : 'var(--border)', marginBottom: '5px' }} />
              <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.3px', color: i <= 2 ? 'var(--accent)' : 'var(--text-muted)', textTransform: 'uppercase' }}>{step}</span>
            </div>
          ))}
        </div>

        <div style={{ background: 'var(--bg-input)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '18px', marginBottom: '24px' }}>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.6px', fontWeight: 600 }}>Transfer Summary</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '4px' }}>To Account</div>
              <div style={{ fontFamily: 'Courier New, monospace', fontSize: '14px', fontWeight: 600 }}>{receiverAccount}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Amount</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 800, color: 'var(--accent)', letterSpacing: '-0.5px' }}>₹{Number(amount).toLocaleString('en-IN')}</div>
            </div>
          </div>
        </div>

        <div className="field">
          <label>Transaction PIN (4-digit)</label>
          <input className="input input-pin" type="password" maxLength="4" placeholder="• • • •" onChange={(e) => setTpin(e.target.value)} />
        </div>

        {error && <div className="alert alert-error"><span>⚠️</span> {error}</div>}

        <button className="btn btn-primary" onClick={handleTransfer} disabled={loading || tpin.length < 4}>
          {loading ? <span className="spinner" /> : null}
          {loading ? 'Processing...' : '✅ Confirm & Transfer'}
        </button>
      </div>
    </div>
  );
}

export default TpinPage;