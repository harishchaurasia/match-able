// import React, { useState } from "react";
// import { useRouter } from "next/router";
// import Navbar from "src/components/Navbar";

// const CreateAccountPage: React.FC = () => {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     userType: "Job Seeker", // Default user type
//   });
//   const [error, setError] = useState<string | null>(null);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const { name, email, password, confirmPassword } = formData;

//     // Basic validation
//     if (!name || !email || !password || !confirmPassword) {
//       setError("All fields are required");
//       return;
//     }
//     if (password !== confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     setError(null);

//     // Handle account creation logic (e.g., API call)
//     console.log("Creating account with data:", formData);

//     // Navigate to login or another page upon success
//     router.push("/LoginPage");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
//         <Navbar/>
//       <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
//         <h1 className="text-3xl font-semibold text-center text-blue-800 mb-6">
//           Create Account
//         </h1>
//         {error && (
//           <div className="bg-red-100 text-red-600 p-4 mb-4 rounded">
//             {error}
//           </div>
//         )}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Name Field */}
//           <div>
//             <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//               Full Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Enter your full name"
//             />
//           </div>

//           {/* Email Field */}
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//               Email Address
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Enter your email"
//             />
//           </div>

//           {/* Password Field */}
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Create a password"
//             />
//           </div>

//           {/* Confirm Password Field */}
//           <div>
//             <label
//               htmlFor="confirmPassword"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               id="confirmPassword"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Confirm your password"
//             />
//           </div>

//           {/* User Type Dropdown */}
//           <div>
//             <label htmlFor="userType" className="block text-sm font-medium text-gray-700">
//               I am a...
//             </label>
//             <select
//               id="userType"
//               name="userType"
//               value={formData.userType}
//               onChange={handleChange}
//               className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="Job Seeker">Job Seeker</option>
//               <option value="Employer">Employer</option>
//             </select>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-200"
//           >
//             Sign Up
//           </button>
//         </form>

//         {/* Back to Login */}
//         <p className="text-center text-sm text-gray-600 mt-4">
//           Already have an account?{" "}
//           <button
//             onClick={() => router.push("/LoginPage")}
//             className="text-blue-600 hover:underline"
//           >
//             Log in
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default CreateAccountPage;

import React, { useState } from "react";
import { useRouter } from "next/router";
import Navbar from "src/components/Navbar";

const CreateAccountPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    userType: "Job Seeker", // Default user type
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password, confirmPassword, userType } = formData;

    // Basic validation
    if (!email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError(null);

    try {
      // API call to signup endpoint
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          role: userType,
        }),
      });

      const data = await response.json();

      if (response.status === 201) {
        console.log("Signup Successful:", data);
        // Navigate to login page or dashboard
        router.push("/LoginPage");
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError("An error occurred while signing up. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <Navbar />
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-semibold text-center text-blue-800 mb-6">
          Create Account
        </h1>
        {error && (
          <div className="bg-red-100 text-red-600 p-4 mb-4 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          {/* <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your full name"
            />
          </div> */}

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Create a password"
            />
          </div>

          {/* Confirm Password Field */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Confirm your password"
            />
          </div>

          {/* User Type Dropdown */}
          <div>
            <label htmlFor="userType" className="block text-sm font-medium text-gray-700">
              I am a...
            </label>
            <select
              id="userType"
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Job Seeker">Job Seeker</option>
              <option value="Employer">Employer</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-200"
          >
            Sign Up
          </button>
        </form>

        {/* Back to Login */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <button
            onClick={() => router.push("/LoginPage")}
            className="text-blue-600 hover:underline"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
};

export default CreateAccountPage;

