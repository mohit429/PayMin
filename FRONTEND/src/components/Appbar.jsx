import { useNavigate } from "react-router-dom";

export const Appbar = () => {
    const navigate = useNavigate();
    const username  = localStorage.getItem("username");
    
    return (
        <div className="font-mono shadow-md h-16 flex justify-between items-center p-4 bg-gradient-to-r from-blue-500 to-teal-400 text-white">
            <div className="flex items-center h-full px-4 rounded-full bg-black text-white">
                PayMin
            </div>
            <div className="flex items-center">
                <span className="mr-4">{username}</span>
                <button 
                    className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-full"
                    onClick={(e) => {
                        localStorage.removeItem("token");
                        navigate("/signin");
                    }}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};
