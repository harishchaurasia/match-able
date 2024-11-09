// src/pages/LandingPage.tsx
import React from "react";
import { useRouter } from "next/router";

const LandingPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-green-500 px-6 text-white">
      {/* Catchphrase */}
      <h1 className="text-6xl font-extrabold mb-6 text-center max-w-4xl leading-tight">
        Empowering Inclusive Connections in the Workforce
      </h1>

      {/* Subheading */}
      <p className="text-2xl font-light text-center max-w-2xl mb-10">
        Match-ABLE connects skilled individuals with disabilities to companies
        committed to diversity, equity, and inclusion.
      </p>

      {/* Buttons */}
      <div className="space-x-4">
        <button
          onClick={() => router.push("/ProfilePage")} // Adjust if you have a login page
          className="bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-800 transition duration-300 ease-in-out shadow-lg"
        >
          Login
        </button>
        <button
          onClick={() => router.push("/JobListingPage")}
          className="bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition duration-300 ease-in-out shadow-lg"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
