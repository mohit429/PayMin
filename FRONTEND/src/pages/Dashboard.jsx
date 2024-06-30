import { useEffect, useState } from "react"
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import { useNavigate } from "react-router-dom";
import axios from "axios";


export const Dashboard = () => {

    const [balance , setbalance]= useState(0);

    const navigate = useNavigate();
    
    useEffect(()=>{

    if(!localStorage.getItem("token")){
        navigate('/signin')
        return;
    }

    const username =localStorage.getItem("username");

    axios.get("https://payminba.onrender.com/api/v1/user/onendonly",{
        params: { username }
    })

    .then(response => {
        localStorage.setItem("userId", response.data);
    })
    .catch(error => {
        if (error.response) {
          console.log('Response status:', error.response.status);
          console.log('Response data:', error.response.data);
        } else if (error.request) {
          console.log('Request made but no response received:', error.request);
        } else {
          console.log('Error setting up request:', error.message);
        }
      });


      const userId = localStorage.getItem("userId");
      const token=localStorage.getItem("token");
        axios.get("https://payminba.onrender.com/api/v1/account/balance", {
            params: { userId },
            headers:{
                authorization : 'Bearer '+token
            }
        })
        .then(response => {
            setbalance(response.data);
        })
        .catch(error => {
            if (error.response) {
              console.log('Response status:', error.response.status);
              console.log('Response data:', error.response.data);
            } else if (error.request) {
              console.log('Request made but no response received:', error.request);
            } else {
              console.log('Error setting up request:', error.message);
            }
        });
    })

    return <div className="bg-sky-200">
        <Appbar/>
        <div>
            <Balance value={balance}/>
            <Users/>
        </div>
    </div>
}