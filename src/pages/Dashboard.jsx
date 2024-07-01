import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TailSpin } from 'react-loader-spinner';

export const Dashboard = () => {
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(true); // Loading state
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate('/signin');
            return;
        }

        const username = localStorage.getItem("username");

        axios.get("https://payminba.onrender.com/api/v1/user/onendonly", {
            params: { username }
        })
        .then(response => {
            localStorage.setItem("userId", response.data);
            const userId = localStorage.getItem("userId");
            const token = localStorage.getItem("token");
            
            axios.get("https://payminba.onrender.com/api/v1/account/balance", {
                params: { userId },
                headers: {
                    authorization: 'Bearer ' + token
                }
            })
            .then(response => {
                setBalance(response.data);
                setLoading(false); // Set loading to false after data is fetched
            })
            .catch(error => {
                handleAxiosError(error);
                setLoading(false); // Set loading to false if an error occurs
            });
        })
        .catch(error => {
            handleAxiosError(error);
            setLoading(false); // Set loading to false if an error occurs
        });
    }, [navigate]);

    const handleAxiosError = (error) => {
        if (error.response) {
            console.log('Response status:', error.response.status);
            console.log('Response data:', error.response.data);
        } else if (error.request) {
            console.log('Request made but no response received:', error.request);
        } else {
            console.log('Error setting up request:', error.message);
        }
    };

    return (
        <div className="bg-sky-200 min-h-screen flex flex-col">
            <Appbar />
            {loading ? (
                <div className="flex flex-grow justify-center items-center">
                    <TailSpin height="50" width="50" color="gray" ariaLabel="loading" />
                </div>
            ) : (
                <div>
                    <Balance value={balance} />
                    <Users />
                </div>
            )}
        </div>
    );
}
