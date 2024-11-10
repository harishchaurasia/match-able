import React, { useState } from "react";
import { useRouter } from "next/router";
import Navbar from "src/components/Navbar";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const data = { email, password };

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        setStatus(result.message);

        // Store the JWT token in localStorage
        localStorage.setItem("token", result.token);

        // Redirect to profile page after login
        router.push("/ProfilePage");
      } else {
        const errorText = await response.text();
        setStatus(`Login failed: ${errorText}`);
        console.error("Error response:", errorText); // Log error details
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("Error during login.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="mb-6">
        <Navbar />
      </div>
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-blue-800 mb-6">
          Login
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          className="space-y-4"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-lg font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-lg font-medium text-gray-700"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Continue
          </button>
        </form>
        <p id="status" className="text-red-500 mt-4 text-center">
          {status}
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
