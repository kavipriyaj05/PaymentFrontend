import {use, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstances';

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
    }
}