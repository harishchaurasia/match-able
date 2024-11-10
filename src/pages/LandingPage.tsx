// src/pages/LandingPage.tsx
import React from "react";
import { useRouter } from "next/router";
import Navbar from "src/components/Navbar";

const LandingPage: React.FC = () => {
  const router = useRouter();

  return (
    // <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-green-500 px-6 text-white">
    <div className="min-h-screen overflow-x-hidden flex flex-col items-center justify-center text-white">
      {/* Catchphrase */}

      {/* <h1 className="text-6xl font-extrabold mb-6 text-center max-w-4xl leading-tight"> */}
      <h1 className="text-6xl text-black font-extrabold mb-6 text-center max-w-4xl leading-tight">
        Empowering Inclusive Connections in the Workforce
      </h1>

      {/* Subheading */}
      {/* <p className="text-2xl font-light text-center max-w-2xl mb-10"> */}
      <p className="text-2xl text-black font-light text-center max-w-2xl mb-10">
        Match-ABLE connects skilled individuals with disabilities to companies
        committed to diversity, equity, and inclusion.
      </p>

      {/* Buttons */}
      <div className="space-x-4">
        <button
          onClick={() => router.push("/ProfilePage")} // Adjust if you have a login page
          className="bg-black text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-500 hover:text-white transition duration-10 ease-in-out shadow-3xl"
        >
          Login
        </button>
        <button
          onClick={() => router.push("/JobListingPage")}
          className="bg-gray-200 text-black py-3 px-6 border rounded-lg font-semibold hover:bg-gray-600 hover:text-white transition duration-10 ease-in-out shadow-lg "
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
