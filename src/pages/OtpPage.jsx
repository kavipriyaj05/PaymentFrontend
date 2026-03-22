import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

function OtpPage() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleVerify = async () => {
    const otpReference = localStorage.getItem('otpReference');
    try {
      const res = await axiosInstance.post('/otp/verify', { otp, otpReference });
      if (res.data.verified) {
        navigate('/tpin');
      } else {
        setError('Wrong OTP. Try again.');
      }
    } catch { setError('Error verifying OTP.'); }
  };

  return (
    <div style={{maxWidth:'400px',margin:'60px auto',padding:'24px'}}>
      <h2>Enter OTP</h2>
      <p>A 6-digit OTP has been sent to your email</p>
      <input maxLength="6" placeholder="Enter 6-digit OTP"
        onChange={(e) => setOtp(e.target.value)}
        style={{display:'block',width:'100%',marginBottom:'12px',
          fontSize:'24px',letterSpacing:'8px',textAlign:'center'}}/>
      {error && <p style={{color:'red'}}>{error}</p>}
      <button onClick={handleVerify} style={{width:'100%'}}>Verify OTP</button>
    </div>
  );
}
export default OtpPage;