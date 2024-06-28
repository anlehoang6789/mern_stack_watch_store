// src/pages/LoginPage.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Checkbox, Notification, toaster } from "rsuite";
import "rsuite/dist/rsuite.min.css"; // Import RSuite CSS
import Cookies from "js-cookie";
import { useAuth } from "../components/AuthContext";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/members/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          memberName: username,
          password: password,
        }),
        credentials: "include", // Send cookies
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);
        // Handle successful login (redirect, set tokens, etc.)
        const token = data.token; // Assuming your API response returns the token
        Cookies.set("token", token, {
          // Set token in cookies
          expires: 1, // Expires in 1 day
          secure: true, // HTTPS only
          sameSite: "lax", // Adjust as necessary
        });
        console.log("Token set in cookies:", token);
        login(token);
        toaster.push(
          <Notification type="success" header="Success">
            Login Successful
          </Notification>,
          { placement: "topEnd" }
        );
        navigate("/"); // Redirect to home page
      } else {
        const errorData = await response.json();
        console.error("Login failed:", errorData.message);
        // Handle login failure (show message, etc.)
      }
    } catch (error) {
      console.error("Error logging in:", error.message);
      // Handle network or other errors
      if (error.response && error.response.data) {
        toaster.push(
          <Notification type="error" header="Error">
            Login Failed: {error.response.data.message}
          </Notification>,
          { placement: "topEnd" }
        );
      }
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl flex">
        {/* Left side */}
        <div className="w-1/2 p-4">
          <div className="mb-4 text-center">
            <h1 className="text-2xl font-bold">Log in to your Account</h1>
            <p className="text-gray-600">
              Welcome back! Select method to log in:
            </p>
          </div>
          <div className="mb-4 flex justify-center space-x-4">
            <Button appearance="primary" className="flex-1">
              Google
            </Button>
            <Button appearance="primary" className="flex-1">
              Facebook
            </Button>
          </div>
          <div className="mb-4 text-center">
            <p className="text-gray-600">or continue with username</p>
          </div>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <Input
                placeholder="Username"
                type="text"
                className="w-full"
                value={username}
                onChange={(value) => setUsername(value)}
              />
            </div>
            <div className="mb-4">
              <Input
                placeholder="Password"
                type="password"
                className="w-full"
                value={password}
                onChange={(value) => setPassword(value)}
              />
            </div>
            <div className="mb-4 flex justify-between items-center">
              <Checkbox>Remember me</Checkbox>
              <a href="#" className="text-blue-500">
                Forgot Password?
              </a>
            </div>
            <Button appearance="primary" className="w-full" type="submit">
              Log in
            </Button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Do not have an account?
              <Link to={"/register"} className="text-blue-500">
                Create an account
              </Link>
            </p>
          </div>
        </div>
        {/* Right side */}
        <div className="w-1/2 bg-blue-500 text-white p-8 rounded-r-lg">
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1539874754764-5a96559165b0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHdhdGNofGVufDB8fDB8fHww"
                alt="Connect with every application"
                className="mb-4"
              />
              <h2 className="text-2xl font-bold">Hoàng An Watch Store</h2>
              <p className="text-gray-200">
                Everything you need in an easily find in here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
