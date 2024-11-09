// CompanyDashboard.tsx
import { useState } from "react";
import { useRouter } from "next/router";

const CompanyDashboard: React.FC = () => {
  const [companyName, setCompanyName] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const router = useRouter();

  const goToJobPostingPage = () => {
    router.push({
      pathname: "/job-posting",
      query: { name: companyName, description: companyDescription },
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6 space-y-8">
      <h1 className="text-3xl font-semibold text-blue-800">
        Company Dashboard
      </h1>
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg space-y-6">
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Company Name
          </label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700">
            Company Description
          </label>
          <textarea
            value={companyDescription}
            onChange={(e) => setCompanyDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            rows={4}
          />
        </div>

        <button
          onClick={goToJobPostingPage}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
        >
          Go to Job Posting Page
        </button>
      </div>
    </div>
  );
};

export default CompanyDashboard;
