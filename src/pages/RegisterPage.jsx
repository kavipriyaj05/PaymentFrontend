import { use, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

function RegisterPage() {
    const navigate=useNavigate();
    const [form,setForm]=useState({
        name:'',
        email:'',
        password:'',
        tpin:''
    });
    const [error,setError]=useState('');

    const handleChange=(e)=>
        setForm({...form,[e.target.name]:e.target.value});
    
    const handleSubmit=async()=>{
        try{
            await axiosInstance.post('/auth/register',form);
            navigate('/login');
        }
        catch(err){
            setError('Registration failed. Please try again.');
        }
    };
    return(
        <div style={{maxWidth:'400px',margin:'60px auto',padding:'24px'}}>
            <h2>Create Account</h2>
            <input name="name" placeholder="Full Name" onChange={handleChange} 
            style={{display:'block',width:'100%',marginBottom:'12px'}}/>
            <input name="email" placeholder="Email" onChange={handleChange}
            style={{display:'block',width:'100%',marginBottom:'12px'}}/>
            <input name="password" type="password" placeholder="Password" onChange={handleChange}
            style={{display:'block',width:'100%',marginBottom:'12px'}}/>
            <input name="tpin" type="password" placeholder="Set 4-Digit Transaction PIN"
             maxLength="4" onChange={handleChange} style={{display:'block',width:'100%',marginBottom:'12px'}}/>

             {error && <p style={{color:'red'}}>{error}</p>}
             <button onClick={handleSubmit}>Register</button>
             <p>Already have an account? <a href="/login">Login</a></p>
             

        </div>
    );
}
export default RegisterPage;