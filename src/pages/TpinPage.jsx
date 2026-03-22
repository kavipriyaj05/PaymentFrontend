import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

function TpinPage() {
  const navigate = useNavigate();
  const [tpin, setTpin] = useState('');
  const [error, setError] = useState('');

  const handleTransfer = async () => {
    const receiverAccount = localStorage.getItem('receiverAccount');
    const amount = localStorage.getItem('transferAmount');
    const otpReference = localStorage.getItem('otpReference');
    try {
      const res = await axiosInstance.post('/transfer/send', {
        receiverAccount, amount, tpin, otpReference
      });
      localStorage.setItem('txnSuccess', JSON.stringify(res.data));
      navigate('/success');
    } catch (err) {
      setError(err.response?.data?.message || 'Transfer failed.');
    }
  };

  return (
    <div style={{maxWidth:'400px',margin:'60px auto',padding:'24px'}}>
      <h2>Enter Transaction PIN</h2>
      <p>Transferring ₹{localStorage.getItem('transferAmount')}</p>
      <input type="password" maxLength="4"
        placeholder="Enter 4-digit TPIN"
        onChange={(e) => setTpin(e.target.value)}
        style={{display:'block',width:'100%',marginBottom:'12px',
          fontSize:'28px',letterSpacing:'12px',textAlign:'center'}}/>
      {error && <p style={{color:'red'}}>{error}</p>}
      <button onClick={handleTransfer} style={{width:'100%'}}>
        Confirm Transfer
      </button>
    </div>
  );
}
export default TpinPage;