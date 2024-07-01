import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const response = await axios.post("https://payminba.onrender.com/api/v1/user/signup", {
        username,
        firstName,
        lastName,
        password,
      });
      if (response.status === 200) {
        navigate("/signin");
      } else {
        alert("Signup failed");
      }
    } catch (error) {
      alert("An error occurred during signup");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-300 to-gray-700 h-screen flex items-center justify-center relative">
      <button
        onClick={() => navigate('/')}
        className="absolute top-4 right-4 p-3 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition flex items-center"
      >
        <FontAwesomeIcon icon={faHome} className="text-lg" />
      </button>
      <div className="flex flex-col justify-center">
        <Heading label="Sign up" />
        <SubHeading label="Enter your information to create an account" />
        <InputBox
          onChange={e => setFirstName(e.target.value)}
          placeholder="First Name"
          label="First Name"
        />
        <InputBox
          onChange={e => setLastName(e.target.value)}
          placeholder="Last Name"
          label="Last Name"
        />
        <InputBox
          onChange={e => setUsername(e.target.value)}
          placeholder="Email"
          label="Email"
        />
        <InputBox
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          label="Password"
        />
        <div className="pt-6">
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-sky-500"></div>
            </div>
          ) : (
            <Button
              onClick={handleSignUp}
              label="Sign up"
            />
          )}
        </div>
        <BottomWarning
          label="Already have an account?"
          buttonText="Sign in"
          to="/signin"
        />
      </div>
    </div>
  );
};
