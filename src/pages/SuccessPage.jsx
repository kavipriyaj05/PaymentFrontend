import { useNavigate } from 'react-router-dom';

function SuccessPage() {
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem('txnSuccess') || '{}');

  return (
    <div style={{maxWidth:'400px',margin:'60px auto',
      padding:'24px',textAlign:'center'}}>
      <h2 style={{color:'green'}}>Transfer Successful!</h2>
      <div style={{background:'#f0faf0',borderRadius:'12px',padding:'20px',margin:'16px 0'}}>
        <p>Amount Sent: ₹{data.amount}</p>
        <p>Reference: {data.referenceId}</p>
        <p>New Balance: ₹{data.newBalance}</p>
      </div>
      <button onClick={() => navigate('/dashboard')}
        style={{width:'100%',marginBottom:'10px'}}>Go to Dashboard</button>
      <button onClick={() => navigate('/history')}
        style={{width:'100%'}}>View History</button>
    </div>
  );
}
export default SuccessPage;