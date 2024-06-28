// src/pages/RegisterPage.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input } from "rsuite";
import "rsuite/dist/rsuite.min.css"; // Import RSuite CSS

const RegisterPage = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/members/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          memberName: username,
          password: password,
          name: fullName,
        }),
      });

      if (response.ok) {
        console.log("Registration successful!");
        // Handle success (redirect, show message, etc.)
      } else {
        const errorData = await response.json();
        console.error("Registration failed:", errorData.error);
        // Handle error (show message, etc.)
      }
    } catch (error) {
      console.error("Error registering:", error.message);
      // Handle error (show message, etc.)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl flex">
        {/* Left side */}
        <div className="w-1/2 bg-blue-500 text-white p-8 rounded-l-lg">
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
        {/* Right side */}
        <div className="w-1/2 p-4">
          <div className="mb-4 text-center">
            <h1 className="text-2xl font-bold">Create your Account</h1>
            <p className="text-gray-600">
              Welcome! Fill in the details to create an account:
            </p>
          </div>
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <Input
                placeholder="Full Name"
                type="text"
                className="w-full"
                value={fullName}
                onChange={(value) => setFullName(value)}
              />
            </div>
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

            <Button appearance="primary" className="w-full" type="submit">
              Register
            </Button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to={"/login"} className="text-blue-500">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
