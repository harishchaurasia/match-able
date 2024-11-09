// JobPostingPage.tsx
import React, { useState } from "react";
import JobPostingForm from "../../src/components/JobPostingForm";

interface Job {
  title: string;
  description: string;
}

const JobPostingPage: React.FC = () => {
  const [jobPostings, setJobPostings] = useState<Job[]>([]);
  const [showForm, setShowForm] = useState(false);

  const addJobPosting = (newJob: Job) => {
    setJobPostings((prev) => [...prev, newJob]); // Use prev state for better immutability
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-8">
      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors"
      >
        {showForm ? "Close Form" : "Add Job Posting"}
      </button>

      {showForm && <JobPostingForm onSubmit={addJobPosting} />}

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
