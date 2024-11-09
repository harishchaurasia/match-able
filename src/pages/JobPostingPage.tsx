// src/components/JobPostingPage.tsx
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import JobPostingForm from "../components/JobPostingForm";

interface Job {
  title: string;
  description: string;
}

const JobPostingPage: React.FC = () => {
  const [jobPostings, setJobPostings] = useState<Job[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");

  const router = useRouter();
  const { name, description } = router.query;

  useEffect(() => {
    // Prefill form fields if `name` and `description` query parameters are available
    if (name && description) {
      setCompanyName(name as string);
      setCompanyDescription(description as string);
    }
  }, [name, description]);

  const addJobPosting = (newJob: Job) => {
    setJobPostings((prev) => [...prev, newJob]);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-16 py-16 space-y-8">
      {/* <h1 className="text-2xl font-semibold text-blue-800">Job Posted</h1> */}

      <nav className="bg-gradient-to-r text-black py-4 px-6">
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col">
            <h1 className="text-3xl mb-2 font-bold">{companyName}</h1>
            <p className="text-lg">{companyDescription}</p>
          </div>
          <img src="your-logo.png" alt="Logo" className="h-8 ml-8" />
        </div>
      </nav>

      {/* Add Job Posting Button */}
      <div className="flex justify-center">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-600 text-white py-2 px-4 rounded-lg font-bold hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <span className="text-2xl">+</span>
        </button>
      </div>

      {/* Job Posting Form */}
      {showForm && (
        <JobPostingForm
          onSubmit={addJobPosting}
          initialCompanyName={companyName}
          initialCompanyDescription={companyDescription}
        />
      )}

      {/* Job Postings List */}
      <div className="space-y-4">
        {jobPostings.map((job, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
          >
            <h2 className="font-semibold text-lg">{job.title}</h2>
            <p className="text-gray-600">{job.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobPostingPage;
