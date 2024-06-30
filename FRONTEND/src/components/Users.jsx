import { useEffect, useState } from "react"
import { Button } from "./Button"
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const userId = localStorage.getItem("userId");
    useEffect(() => {
        axios.get("https://payminba.onrender.com/api/v1/user/bulk?filter=" + filter,
        { params: { userId }} )
            .then(response => {
                setUsers(response.data.user)
            })
    }, [filter])

    return <>
        <div className="m-4 ">
            <input onChange={(e) => {setFilter(e.target.value)}} type="text" placeholder="Search users..." className=" w-full px-2 py-1 bg-slate-200 rounded-full hover:shadow-xl"></input>
        </div>
        <div className="font-bold mt-6 text-lg m-4">Contacts</div>
        <div>
            {users.map(user => <User user={user} />)}
        </div>
    </>
}

function User({user}) {
    const navigate = useNavigate();

    return <div className="flex justify-between shadow-md pb-2 m-4">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button onClick={(e) => {
                navigate("/send?id=" + user._id + "&name=" + user.firstName);
            }} label={"Send Money"} />
        </div>
    </div>
}