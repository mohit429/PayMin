import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faWallet } from '@fortawesome/free-solid-svg-icons';

export const Signin = () => {
  const[username,setusername]=useState('');
  const[password,setpassword]=useState('');
  const navigate = useNavigate();

    return <div className="bg-gradient-to-r from-gray-300 to-gray-600   h-screen flex justify-center">
    <button
                onClick={() => navigate('/')}
                className="absolute top-4 right-4 p-3 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition flex items-center"
            >
                <FontAwesomeIcon icon={faHome} className="text-lg" /> 
    </button>
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg- w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox placeholder="mohitgurbani123@gmail.com" label={"Email"}  onChange={(e)=>{
          setusername(e.target.value)
        }}/>
        <InputBox type={"password"} placeholder="123456" label={"Password"} 
        onChange={(e)=>{
          setpassword(e.target.value)
        }}/>
        <div className="pt-4">
          <Button label={"Sign in"} onClick={async(e)=>{
              const request = await axios.post("https://payminba.onrender.com/api/v1/user/signin",{
                username,
                password
              })

              if (request.status===200){
                localStorage.setItem("token", request.data.token)
                localStorage.setItem("username",username)
                navigate("/dashboard")
              }
              else{
                alert("wrong credentials")
              }
          }}
        />
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}