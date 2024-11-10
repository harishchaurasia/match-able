// import React from "react";
// import CircularProgress from "../components/CircularProgress";
// import Navbar from "src/components/Navbar";

// interface Job {
//   title: string;
//   company: string;
//   location: string;
//   matchPercentage: number;
//   skillsPercentage: number;
// }

// const jobs: Job[] = [
//   {
//     title: "Frontend Developer",
//     company: "Company A",
//     location: "Remote",
//     matchPercentage: 23,
//     skillsPercentage: 80,
//   },
// ];

// const JobListingPage: React.FC = () => {
//   return (
//     <div className="min-h-screen bg-gray-100 px-8 py-6">
//       <div className="mb-16 ">
//         <Navbar />
//       </div>
//       <h1 className="text-3xl font-semibold text-blue-800 mb-6">
//         Job Listings
//       </h1>

//       <div className="space-y-6">
//         {jobs.map((job, index) => (
//           <div
//             key={index}
//             className="bg-white p-6 rounded-lg shadow-lg flex justify-between items-center"
//           >
//             {/* Left Section with Job Details */}
//             <div className="flex-1">
//               <h2 className="text-xl font-bold text-gray-800 mb-1">
//                 {job.title}
//               </h2>
//               <p className="text-gray-600">
//                 {job.company} - {job.location}
//               </p>
//             </div>

//             {/* Right Section with Circular Progress Bars */}
//             <div className="flex space-x-8 items-center">
//               <div className="flex flex-col items-center">
//                 <CircularProgress percentage={job.matchPercentage} />
//                 <p className="text-sm text-gray-600 mt-2">
//                   Accessibility Match
//                 </p>
//               </div>
//               <div className="flex flex-col items-center">
//                 <CircularProgress percentage={job.skillsPercentage} />
//                 <p className="text-sm text-gray-600 mt-2">Tech Skills</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default JobListingPage;

// src/pages/JobListingPage.tsx

// src/pages/JobListingPage.tsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import CircularProgress from "../components/CircularProgress";
import Navbar from "src/components/Navbar";

interface Job {
  title: string;
  company: string;
  location: string;
  matchPercentage: number;
  skillsPercentage: number;
}

const JobListingPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/companies"); // Updated URL
        const jobData = response.data.map((company: any) => ({
          title: company.jobTitle,
          company: company.name,
          location: "Location info here", // Replace with actual location if available
          matchPercentage: 23, // Static for now
          skillsPercentage: 80, // Static for now
        }));
        setJobs(jobData);
      } catch (error) {
        console.error("Error fetching job listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <CircularProgress percentage={0} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-8 py-6">
      <div className="mb-16">
        <Navbar />
      </div>
      <h1 className="text-3xl font-semibold text-blue-800 mb-6">
        Job Listings
      </h1>

      <div className="space-y-6">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg flex justify-between items-center"
          >
            {/* Left Section with Job Details */}
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-800 mb-1">
                {job.title}
              </h2>
              <p className="text-gray-600">
                {job.company} - {job.location}
              </p>
            </div>

            {/* Right Section with Circular Progress Bars */}
            <div className="flex space-x-8 items-center">
              <div className="flex flex-col items-center">
                <CircularProgress percentage={job.matchPercentage} />
                <p className="text-sm text-gray-600 mt-2">
                  Accessibility Match
                </p>
              </div>
              <div className="flex flex-col items-center">
                <CircularProgress percentage={job.skillsPercentage} />
                <p className="text-sm text-gray-600 mt-2">Tech Skills</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobListingPage;
