import { useSearchParams } from 'react-router-dom';
import axios from "axios";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faWallet } from '@fortawesome/free-solid-svg-icons';

export const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);
    const navigate = useNavigate();
    const [balance , setbalance]= useState(0);

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

    const handleBalanceCheck = () => {
        alert(`Your current balance is: Rs. ${balance}`);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-sky-400 to-sky-200 relative">
            <button
                onClick={handleBalanceCheck}
                className="absolute top-4 left-4 p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition flex items-center"
            >
                <FontAwesomeIcon icon={faWallet} className="text-lg" />
                <span className="ml-2">Avl Balance</span>
            </button>
            <button
                onClick={() => navigate('/dashboard')}
                className="absolute top-4 right-4 p-3 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition flex items-center"
            >
                <FontAwesomeIcon icon={faHome} className="text-lg" />
                <span className="ml-2">Dashboard</span>
            </button>
            <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Send Money</h2>
                <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-gray-500 flex items-center justify-center">
                        <span className="text-2xl text-white">{name[0].toUpperCase()}</span>
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-700">{name}</h3>
                </div>
                <div className="mb-6">
                    <label
                        className="block text-sm font-medium mb-2 text-gray-700"
                        htmlFor="amount"
                    >
                        Amount (in Rs)
                    </label>
                    <input
                        onChange={(e) => {
                            if (e.target.value >= 1 && e.target.value <= 25000) {
                                setAmount(e.target.value);
                            } else {
                                alert("Min Val: 1 Max Val: 25000");
                                window.location.reload();
                            }
                        }}
                        type="number"
                        className="w-full p-3 border rounded-md"
                        id="amount"
                        placeholder="Enter amount"
                    />
                </div>
                <button 
                    onClick={async () => {
                        try {
                            const response = await axios.post("https://payminba.onrender.com/api/v1/account/transfer", 
                            {
                                to: id,
                                amount
                            }, 
                            {
                                headers: {
                                    Authorization: "Bearer " + localStorage.getItem("token")
                                }
                            });
                            if (response.status === 200) {
                                alert("Money Transferred Successfully");
                                navigate('/dashboard');
                            }
                        } catch {
                            alert("Insufficient balance");
                            window.location.reload();
                        }
                    }} 
                    className="w-full p-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition mb-4"
                >
                    Initiate Transfer
                </button>
            </div>
        </div>
    );
}
