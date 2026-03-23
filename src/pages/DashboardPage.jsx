import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

function DashboardPage() {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(null);
  // Pre-populate from localStorage so data shows instantly after login
  const [profile, setProfile] = useState({
    name: localStorage.getItem('name') || '',
    accountNumber: localStorage.getItem('accountNumber') || '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token:', token);
        if (!token) { navigate('/login'); return; }

        const b = await axiosInstance.get('/account/balance');
        console.log('Balance response (full):', b.data);
        // Handle both { balance: X } and { data: { balance: X } }
        const balanceValue = b.data?.balance ?? b.data?.data?.balance ?? b.data;
        setBalance(balanceValue);

        const p = await axiosInstance.get('/account/profile');
        console.log('Profile response (full):', p.data);
        // Normalize field names: support both camelCase and snake_case
        const profileData = p.data?.data ?? p.data;
        setProfile({
          name: profileData.name || profileData.fullName || localStorage.getItem('name') || '',
          email: profileData.email || '',
          accountNumber:
            profileData.accountNumber ||
            profileData.account_number ||
            profileData.accNo ||
            localStorage.getItem('accountNumber') ||
            '',
        });
      } catch (err) {
        console.error('Dashboard API Error:', err.response?.status, err.response?.data);
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.clear();
          navigate('/login');
        }
      }
    };
    fetchData();
  }, [navigate]);

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