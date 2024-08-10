import { useEffect, useState } from "react";
import axios from "axios";

export const TransactionsSidebar = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            const userId = localStorage.getItem("userId");
            const token = localStorage.getItem("token");

            try {
                const response = await axios.get("https://payminba.onrender.com/api/v1/account/history", {
                    headers: {
                        authorization: 'Bearer ' + token
                    }
                });
                setTransactions(response.data);
            } catch (error) {
                console.error("Error fetching transactions", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    return (
        <div className="w-full md:w-80 bg-white p-6 shadow-lg rounded-lg overflow-y-auto max-h-screen">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-3">Transaction History</h2>
            {loading ? (
                <div className="text-center text-gray-500">Loading...</div>
            ) : transactions.length > 0 ? (
                <ul className="space-y-3">
                    {transactions.map((transaction) => (
                        <li 
                            key={transaction._id} 
                            className="p-4 border border-gray-300 rounded-lg shadow-sm bg-gray-50"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <div className="text-gray-600 text-sm">
                                    {new Date(transaction.date).toLocaleDateString()} 
                                    <span className="text-gray-400 text-xs ml-2">{new Date(transaction.date).toLocaleTimeString()}</span>
                                </div>
                                <div className={`text-sm font-medium ${transaction.from._id === localStorage.getItem("userId") ? "text-red-600" : "text-green-600"}`}>
                                    {transaction.from._id === localStorage.getItem("userId") ? `- Rs. ${transaction.amount}` : `+ Rs. ${transaction.amount}`}
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row justify-between items-start">
                                <div className="flex flex-col mb-2">
                                    <span className="text-gray-700 font-medium">
                                        From: {transaction.from.username}
                                    </span>
                                    <span className="text-gray-700 font-medium mt-1">
                                        To: {transaction.to.username}
                                    </span>
                                    <span className="text-gray-500 text-sm mt-1">
                                        Transaction ID: {transaction._id}
                                    </span>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="text-center text-gray-600">No transactions found.</div>
            )}
        </div>
    );
};
