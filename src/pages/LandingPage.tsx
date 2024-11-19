// import React from "react";
// import { useRouter } from "next/router";
// import Navbar from "src/components/Navbar";
// import Image from "next/image";
// import logo from "../assets/matchable_logo.png";

// const LandingPage: React.FC = () => {
//   const router = useRouter();

//   return (
//     <div className="min-h-screen overflow-x-hidden flex items-center justify-center text-white  px-6">
//       {/* Left Container with Text and Centered Buttons */}
//       <div className="flex flex-col items-start max-w-lg mr-16 space-y-6">
//         {/* Catchphrase */}
//         <h1 className="text-6xl text-black font-extrabold leading-tight">
//           Empowering Inclusive Connections in the Workforce
//         </h1>

//         {/* Subheading */}
//         <p className="text-2xl text-black font-light">
//           Match-ABLE connects skilled individuals with disabilities to companies
//           committed to diversity, equity, and inclusion.
//         </p>

//         {/* Centered Buttons */}
//         <div className="flex justify-center space-x-4 mt-6">
//           <button
//             onClick={() => router.push("/LoginPage")}
//             className="bg-black text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-500 transition duration-200 ease-in-out shadow-lg"
//           >
//             Login
//           </button>
//           <button
//             onClick={() => router.push("/JobListingPage")}
//             className="bg-gray-200 text-black py-3 px-6 border rounded-lg font-semibold hover:bg-gray-600 transition duration-200 ease-in-out shadow-lg"
//           >
//             Sign Up
//           </button>
//         </div>
//       </div>

//       {/* Right Container with Logo Image */}
//       <div className="ml-16 border-full shadow-sm">
//         <Image
//           src={logo}
//           alt="Logo"
//           width={450} // Width in pixels for `w-96`
//           height={450} // Height in pixels for `h-96`
//           // className=""
//         />
//       </div>
//     </div>
//   );
// };

// export default LandingPage;


import React from "react";
import { useRouter } from "next/router";
import Navbar from "src/components/Navbar";
import Image from "next/image";
import logo from "../assets/matchable_logo.png";

const LandingPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen overflow-x-hidden flex items-center justify-center text-white px-6">
      {/* Left Container with Text and Centered Buttons */}
      <div className="flex flex-col items-start max-w-lg mr-16 space-y-6">
        {/* Catchphrase */}
        <h1 className="text-6xl text-black font-extrabold leading-tight">
          Empowering Inclusive Connections in the Workforce
        </h1>

        {/* Subheading */}
        <p className="text-2xl text-black font-light">
          Match-ABLE connects skilled individuals with disabilities to companies
          committed to diversity, equity, and inclusion.
        </p>

        {/* Centered Buttons */}
        <div className="flex justify-center space-x-4 mt-6">
          <button
            onClick={() => router.push("/LoginPage")}
            className="bg-black text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-500 transition duration-200 ease-in-out shadow-lg"
          >
            Login
          </button>
          <button
            onClick={() => router.push("/CreateAccountPage")} // Navigate to create account page
            className="bg-gray-200 text-black py-3 px-6 border rounded-lg font-semibold hover:bg-gray-600 hover:text-white transition duration-200 ease-in-out shadow-lg"
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* Right Container with Logo Image */}
      <div className="ml-16 border-full shadow-sm">
        <Image
          src={logo}
          alt="Logo"
          width={450} // Width in pixels for `w-96`
          height={450} // Height in pixels for `h-96`
        />
      </div>
    </div>
  );
};

export default LandingPage;
