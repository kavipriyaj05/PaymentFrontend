import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

function HistoryPage() {
  const navigate = useNavigate();
  const [txns, setTxns] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const url = filter ? `/transaction/history?type=${filter}` : '/transaction/history';
        const res = await axiosInstance.get(url);
        setTxns(res.data);
      } catch { setTxns([]); }
      finally { setLoading(false); }
    };
    fetchHistory();
  }, [filter]);

  const tabs = [{ value: '', label: 'All' }, { value: 'SENT', label: 'Sent' }, { value: 'RECEIVED', label: 'Received' }];

  return (
    <div className="history-wrapper">
      <div className="history-inner">

        <div className="topbar" style={{ marginBottom: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button className="back-btn" onClick={() => navigate('/dashboard')}>←</button>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 700, letterSpacing: '-0.3px' }}>Transactions</h1>
          </div>
        </div>

        <div className="filter-tabs">
          {tabs.map(tab => (
            <button key={tab.value} className={`filter-tab ${filter === tab.value ? 'active' : ''}`} onClick={() => setFilter(tab.value)}>
              {tab.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>Loading...</div>
        ) : txns.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📭</div>
            <div className="empty-state-text">No transactions found</div>
          </div>
        ) : (
          <div className="txn-list">
            {txns.map((t) => {
              const isSent = t.type === 'SENT';
              return (
                <div className="txn-item" key={t.referenceId}>
                  <div className={`txn-icon ${isSent ? 'sent' : 'received'}`}>{isSent ? '↑' : '↓'}</div>
                  <div className="txn-info">
                    <div className="txn-name">{t.counterpartyName || 'Unknown'}</div>
                    <div className="txn-date">{t.timestamp?.substring(0, 10) || '—'}</div>
                  </div>
                  <div className="txn-right">
                    <div className={`txn-amount ${isSent ? 'sent' : 'received'}`}>{isSent ? '-' : '+'}₹{Number(t.amount).toLocaleString('en-IN')}</div>
                    <div className="txn-status">{t.status}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default HistoryPage;