import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-gray-300 to-gray-700 h-screen flex items-center justify-center">
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
          <Button
            onClick={async () => {
              try {
                const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
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
              }
            }}
            label="Sign up"
          />
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
