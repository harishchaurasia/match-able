// src/pages/JobListingPage.tsx
import React from "react";
import CircularProgress from "../components/CircularProgress";

interface Job {
  title: string;
  company: string;
  location: string;
  matchPercentage: number;
  skillsPercentage: number;
}

const jobs: Job[] = [
  {
    title: "Frontend Developer",
    company: "Company A",
    location: "Remote",
    matchPercentage: 75,
    skillsPercentage: 80,
  },
  // Add more jobs as needed
];

const JobListingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 px-8 py-6">
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
                <p className="text-sm text-gray-600 mt-2">Match</p>
              </div>
              <div className="flex flex-col items-center">
                <CircularProgress percentage={job.skillsPercentage} />
                <p className="text-sm text-gray-600 mt-2">Skills</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobListingPage;
