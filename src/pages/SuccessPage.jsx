import { useNavigate } from 'react-router-dom';

function SuccessPage() {
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem('txnSuccess') || '{}');
  const steps = ['Amount', 'OTP', 'PIN', 'Done'];

  return (
    <div className="page-wrapper">
      <div className="card" style={{ textAlign: 'center' }}>

        <div style={{ display: 'flex', gap: '6px', marginBottom: '32px' }}>
          {steps.map((step) => (
            <div key={step} style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ height: '3px', borderRadius: '2px', background: 'var(--accent)', marginBottom: '5px' }} />
              <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--accent)', textTransform: 'uppercase' }}>{step}</span>
            </div>
          ))}
        </div>

        <div className="success-icon-wrapper">✓</div>
        <h1 className="page-title" style={{ color: 'var(--accent)', textAlign: 'center', fontSize: '22px' }}>Transfer Successful!</h1>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: '6px 0 4px' }}>Your money is on its way.</p>

        <div className="success-receipt">
          <div className="receipt-row">
            <span className="receipt-label">Amount Sent</span>
            <span className="receipt-value amount">₹{Number(data.amount || 0).toLocaleString('en-IN')}</span>
          </div>
          <div className="receipt-row">
            <span className="receipt-label">Reference ID</span>
            <span className="receipt-value">{data.referenceId || '—'}</span>
          </div>
          <div className="receipt-row">
            <span className="receipt-label">New Balance</span>
            <span className="receipt-value">₹{Number(data.newBalance || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
          </div>
          <div className="receipt-row">
            <span className="receipt-label">Status</span>
            <span style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '13px' }}>● Completed</span>
          </div>
        </div>

        <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
        <button className="btn btn-secondary" onClick={() => navigate('/history')}>View Transaction History</button>
      </div>
    </div>
  );
}

export default SuccessPage;