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
                const response = await axios.get("https://payminba.onrender.com/api/v1//account/history", {
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
        <div className="w-1/3 bg-white p-4 shadow-lg overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
            {loading ? (
                <div>Loading...</div>
            ) : transactions.length > 0 ? (
                <ul>
                    {transactions.map((transaction) => (
                        <li key={transaction._id} className="mb-2 p-2 border rounded">
                            <div><strong>Date:</strong> {new Date(transaction.date).toLocaleString()}</div>
                            <div><strong>From:</strong> {transaction.from.username}</div>
                            <div><strong>To:</strong> {transaction.to.username}</div>
                            <div><strong>Amount:</strong> Rs. {transaction.amount}</div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div>No transactions found.</div>
            )}
        </div>
    );
}
