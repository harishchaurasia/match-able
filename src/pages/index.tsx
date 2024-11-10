// pages/index.tsx
import React from "react";
import CompanyDashboard from "./CompanyDashboard";
import LandingPage from "./LandingPage";
import Navbar from "src/components/Navbar";

const HomePage: React.FC = () => {
  return (
    <>
      {/* <LandingPage /> */}
      {/* <CompanyDashboard /> */}
      <Navbar />
      <LandingPage />
    </>
  );
};
export default HomePage;
