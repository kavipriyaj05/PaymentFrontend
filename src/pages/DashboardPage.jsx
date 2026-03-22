import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstances";

function DashboardPage(){
    const navigate=useNavigate();
    const [balance,setBalance]=useState(null);
    const[profile,setprofile]=useState({});

    useEffect(()=>{
        const fetchData=async()=>{
            const b=await axiosInstance.get('/account/balance');
            const p=await axiosInstance.get('/account/profile');
            setBalance(b.data.balance);
            setprofile(p.data);
        };
        fetchData();
    },[]);

    const handleLogout=()=>
    {
        localStorage.clear();
        navigate('/login');
    };
    return(
        <div style={{maxWidth:'480px',margin:'40px auto',padding:'24px'}}>
            <h2>Welcome, {profile.name}</h2>
            <p>Account:{profile.accountNumber}</p>
            <div style={{background:'#1a73e8',color:'#fff',borderRadius:'12px',
                 padding:'24px',margin:'16px 0'}}>
                    <p style={{fontSize:'13px'}}>Available Balance</p>
                    <h1>Rs.{balance}</h1>
                </div>
                <button onClick={()=>navigate('/history')}
                    style={{width:'100%',marginBottom:'12px'}}
                    >Transaction History
                    </button>

            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}
export default DashboardPage;
    
