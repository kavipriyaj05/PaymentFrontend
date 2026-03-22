import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

function SendMoneyPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ receiverAccount:'', amount:'' });
  const [error, setError] = useState('');

  const handleChange = (e) =>
    setForm({...form, [e.target.name]: e.target.value});

  const handleSend = async () => {
    try {
      const res = await axiosInstance.post('/otp/generate', form);
      localStorage.setItem('otpReference', res.data.otpReference);
      localStorage.setItem('transferAmount', form.amount);
      localStorage.setItem('receiverAccount', form.receiverAccount);
      navigate('/otp');
    } catch (err) {
      setError('Failed to send OTP. Check account number.');
    }
  };

  return (
    <div style={{maxWidth:'400px',margin:'60px auto',padding:'24px'}}>
      <h2>Send Money</h2>
      <input name="receiverAccount" placeholder="Recipient Account Number"
        onChange={handleChange} style={{display:'block',width:'100%',marginBottom:'12px'}}/>
      <input name="amount" type="number" placeholder="Amount (₹)"
        onChange={handleChange} style={{display:'block',width:'100%',marginBottom:'12px'}}/>
      {error && <p style={{color:'red'}}>{error}</p>}
      <button onClick={handleSend} style={{width:'100%'}}>
        Send OTP & Continue
      </button>
    </div>
  );
}
export default SendMoneyPage;