// src/components/Navbar.tsx
import React from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    // <nav className="bg-green-700 text-white py-4 px-6 shadow-md">
    // <nav className="bg-[#548cff] text-white py-4 px-6 shadow-md">
    <nav className="bg-gradient-to-r from-[#00bf63] to-[#548cff] text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Product Name */}
        <h1 className="text-2xl font-bold">
          <Link href="/">MatchAble</Link>
        </h1>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          {/* <Link href="/what-we-do">What We Do</Link> */}
          <Link href="/who-we-are">Who We Are</Link>
          <Link href="/contact-us">Contact Us</Link>
          <Link href="/about-us">About Us</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
