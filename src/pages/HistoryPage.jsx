import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

function HistoryPage() {
  const navigate = useNavigate();
  const [txns, setTxns] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      const url = filter ? `/transaction/history?type=${filter}` : '/transaction/history';
      const res = await axiosInstance.get(url);
      setTxns(res.data);
    };
    fetchHistory();
  }, [filter]);

  return (
    <div style={{maxWidth:'600px',margin:'40px auto',padding:'24px'}}>
      <h2>Transaction History</h2>
      <div style={{marginBottom:'12px'}}>
        {['','SENT','RECEIVED'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{marginRight:'8px',
              fontWeight: filter===f ? 'bold' : 'normal'}}>
            {f || 'All'}
          </button>
        ))}
      </div>
      <table style={{width:'100%',borderCollapse:'collapse'}}>
        <thead><tr>
          {['Type','Amount','With','Status','Date'].map(h =>
            <th key={h} style={{textAlign:'left',padding:'8px',
              borderBottom:'1px solid #eee'}}>{h}</th>)}
        </tr></thead>
        <tbody>
          {txns.map((t) => (
            <tr key={t.referenceId}>
              <td style={{padding:'8px',color: t.type==='SENT' ? 'red':'green'}}>{t.type}</td>
              <td style={{padding:'8px'}}>₹{t.amount}</td>
              <td style={{padding:'8px'}}>{t.counterpartyName}</td>
              <td style={{padding:'8px',color:'green'}}>{t.status}</td>
              <td style={{padding:'8px'}}>{t.timestamp?.substring(0,10)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => navigate('/dashboard')}
        style={{marginTop:'16px'}}>Back to Dashboard</button>
    </div>
  );
}
export default HistoryPage;