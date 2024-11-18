import React, { useState, useEffect } from "react";
import axios from "axios";
import CircularProgress from "../components/CircularProgress";
import Navbar from "src/components/Navbar";
import { useRouter } from "next/router";

interface Job {
  title: string;
  company: string;
  location: string;
  matchPercentage: number;
  skillsPercentage: number;
  companyId: string;
  description?: string;
  accessibilityServices?: string;
}

const JobListingPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchJobsAndScores = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve the token

        const companiesResponse = await axios.get(
          "http://localhost:3000/api/companies",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const scoresResponse = await axios.get(
          "http://localhost:3000/calculate-similarity",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const jobData = companiesResponse.data.map((company: any) => ({
          title: company.jobTitle || "Position Available",
          company: company.name,
          location: company.location || "Remote",
          matchPercentage: Math.round(scoresResponse.data[company._id] || 0),
          skillsPercentage: Math.floor(Math.random() * 51) + 50, // Random percentage between 50 and 100
          companyId: company._id,
          description: company.description,
          accessibilityServices: company.accessibilityServices,
        }));

        const sortedJobs = jobData.sort(
          (a, b) => b.matchPercentage - a.matchPercentage
        );
        setJobs(sortedJobs);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load job listings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobsAndScores();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <CircularProgress percentage={0} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-red-500 text-xl mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-12 py-6">
      <Navbar />

      <div className="px-12 mt-16">
        <h1 className="text-3xl font-semibold text-blue-800 mb-6">
          Job Listings ({jobs.length})
        </h1>

        <div className="space-y-6">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="bg-white px-8 py-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-800 mb-2">
                    {job.title}
                  </h2>
                  <p className="text-gray-600 mb-2">
                    {job.company} • {job.location}
                  </p>
                  {job.description && (
                    <p className="text-gray-700 mb-2 line-clamp-2">
                      {job.description}
                    </p>
                  )}
                  {job.accessibilityServices && (
                    <div className="mt-2">
                      <h3 className="text-sm font-semibold text-gray-700">
                        Accessibility Services:
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {job.accessibilityServices}
                      </p>
                    </div>
                  )}
                </div>
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
            </div>
          ))}
        </div>

        {jobs.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-600 text-lg">
              No job listings available at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobListingPage;
