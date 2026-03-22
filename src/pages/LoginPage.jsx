import {use, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

function LoginPage(){
    const navigate=useNavigate();
    const[form,setForm]=useState({
        email:'',
        password:''
    });
    const[error, setError]=useState('');

    const handleChange=(e)=> setForm({...form,[e.target.name]:e.target.value});

    const handleLogin= async()=>{
        try{
            const res=await axiosInstance.post('/auth/login',form);
            localStorage.setItem('token',res.data.token);
            localStorage.setItem('name',res.data.name);
            localStorage.setItem('balance',res.data.balance);
            navigate('/dashboard');
        }
        catch(err){
            setError('Invalid email or password. Please try again.');
        }
    };
     return (
    <div style={{maxWidth:'400px',margin:'60px auto',padding:'24px'}}>
      <h2>Login</h2>
      <input name="email" placeholder="Email"
        onChange={handleChange} style={{display:'block',width:'100%',marginBottom:'12px'}}/>
      <input name="password" type="password" placeholder="Password"
        onChange={handleChange} style={{display:'block',width:'100%',marginBottom:'12px'}}/>
      {error && <p style={{color:'red'}}>{error}</p>}
      <button onClick={handleLogin}>Login</button>
      <p>New user? <a href="/register">Register</a></p>
    </div>
  );
}
export default LoginPage;
