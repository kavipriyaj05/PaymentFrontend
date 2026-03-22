import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

function DashboardPage() {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(null);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const b = await axiosInstance.get('/account/balance');
        const p = await axiosInstance.get('/account/profile');
        setBalance(b.data.balance);
        setProfile(p.data);
      } catch {}
    };
    fetchData();
  }, []);

  const handleLogout = () => { localStorage.clear(); navigate('/login'); };

  const initials = profile.name
    ? profile.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  const formattedBalance = balance !== null
    ? Number(balance).toLocaleString('en-IN', { minimumFractionDigits: 2 })
    : '——';

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-inner">

        <div className="topbar">
          <div className="topbar-left">
            <div className="avatar">{initials}</div>
            <div>
              <div className="topbar-greeting">Good day,</div>
              <div className="topbar-name">{profile.name || '—'}</div>
            </div>
          </div>
          <button className="icon-btn" onClick={handleLogout} title="Logout">🚪</button>
        </div>

        <div className="balance-card">
          <div className="balance-label">Available Balance</div>
          <div className="balance-amount"><span>₹</span>{formattedBalance}</div>
          <div className="balance-account">
            <div className="balance-account-dot" />
            {profile.accountNumber || '—'}
          </div>
        </div>

        <div className="section-title">Quick Actions</div>
        <div className="quick-actions">
          <button className="action-btn" onClick={() => navigate('/send')}>
            <div className="action-icon green">💸</div>
            <div>
              <div className="action-label">Send Money</div>
              <div className="action-desc">Transfer to any account</div>
            </div>
          </button>
          <button className="action-btn" onClick={() => navigate('/history')}>
            <div className="action-icon blue">📋</div>
            <div>
              <div className="action-label">History</div>
              <div className="action-desc">View all transactions</div>
            </div>
          </button>
        </div>

        <div className="section-title" style={{ marginTop: '28px' }}>Account</div>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
          <div style={{ padding: '16px 18px', display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Account Number</span>
            <span style={{ fontFamily: 'Courier New, monospace', fontWeight: 600, fontSize: '13px' }}>{profile.accountNumber || '—'}</span>
          </div>
          <div style={{ height: '1px', background: 'var(--border)' }} />
          <div style={{ padding: '16px 18px', display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Status</span>
            <span style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '13px' }}>● Active</span>
          </div>
          <div style={{ height: '1px', background: 'var(--border)' }} />
          <div style={{ padding: '16px 18px', display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Email</span>
            <span style={{ fontWeight: 500, fontSize: '13px' }}>{profile.email || '—'}</span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default DashboardPage;