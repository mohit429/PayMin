import { useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faWallet } from '@fortawesome/free-solid-svg-icons';
import { TailSpin } from 'react-loader-spinner';

export const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(true); // For balance fetching
    const [transferLoading, setTransferLoading] = useState(false); // For transfer initiation
    const navigate = useNavigate();

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    useEffect(() => {
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
            console.error("Error fetching balance", error);
            setLoading(false);
        });
    }, [userId, token]);

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
            {loading ? (
                <div className="flex justify-center items-center">
                    <TailSpin
                        height="80"
                        width="80"
                        color="gray"
                        ariaLabel="loading"
                    />
                </div>
            ) : (
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
                            setTransferLoading(true);
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
                            } finally {
                                setTransferLoading(false);
                            }
                        }} 
                        className="w-full p-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition mb-4"
                        disabled={transferLoading}
                    >
                        {transferLoading ? (
                            <TailSpin
                                height="24"
                                width="24"
                                color="white"
                                ariaLabel="loading"
                            />
                        ) : (
                            "Initiate Transfer"
                        )}
                    </button>
                </div>
            )}
        </div>
    );
}
