import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import { TransactionsSidebar } from "../components/TransactionsSidebar";  // Import the new component
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TailSpin } from 'react-loader-spinner';

export const Dashboard = () => {
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(true);
    const [showTransactions, setShowTransactions] = useState(false);  // State to toggle sidebar
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
                setLoading(false);
            })
            .catch(error => {
                handleAxiosError(error);
                setLoading(false);
            });
        })
        .catch(error => {
            handleAxiosError(error);
            setLoading(false);
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
            <button 
                className="p-2 bg-blue-500 text-white rounded-full mt-4 mx-auto"
                onClick={() => setShowTransactions(!showTransactions)}  // Toggle sidebar
            >
                {showTransactions ? 'Hide Transactions' : 'Show Transactions'}
            </button>
            {loading ? (
                <div className="flex flex-grow justify-center items-center">
                    <TailSpin height="50" width="50" color="gray" ariaLabel="loading" />
                </div>
            ) : (
                <div className="flex">
                    <div className="flex-1">
                        <Balance value={balance} />
                        <Users />
                    </div>
                    {showTransactions && <TransactionsSidebar />}  {/* Conditionally render sidebar */}
                </div>
            )}
        </div>
    );
}
