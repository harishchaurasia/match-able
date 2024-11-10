// src/pages/ProfilePage.tsx
import React, { useState } from "react";
import { useRouter } from "next/router";
import Navbar from "src/components/Navbar";

const ProfilePage: React.FC = () => {
  const [resume, setResume] = useState<File | null>(null);
  const [demographics, setDemographics] = useState({
    age: "",
    gender: "",
    location: "",
  });
  const [deiNeeds, setDeiNeeds] = useState("");
  const router = useRouter();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setResume(e.target.files[0]);
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    router.push("/job-listing");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-8 py-6">
      <div className="w-full max-w-2xl">
        <div className="mb-16 ">
          <Navbar />
        </div>
        <h1 className="text-3xl font-semibold text-blue-800 mb-6 text-center">
          Profile Page
        </h1>

        <div className="bg-white p-6 rounded-lg shadow-lg space-y-4 max-w-lg mx-auto">
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={demographics.gender}
              onChange={(e) =>
                setDemographics({ ...demographics, gender: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* <div>
            <label className="block text-lg font-medium text-gray-700">
              Age
            </label>
            <input
              type="number"
              value={demographics.age}
              onChange={(e) =>
                setDemographics({ ...demographics, age: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div> */}

          {/* <div>
            <label className="block text-lg font-medium text-gray-700">
              Gender
            </label>
            <input
              type="text"
              value={demographics.gender}
              onChange={(e) =>
                setDemographics({ ...demographics, gender: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div> */}

          {/* <div>
            <label className="block text-lg font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              value={demographics.location}
              onChange={(e) =>
                setDemographics({ ...demographics, location: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div> */}

          <div>
            <label className="block text-lg font-medium text-gray-700">
              DEI Needs
            </label>
            <textarea
              value={deiNeeds}
              onChange={(e) => setDeiNeeds(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">
              Upload Resume
            </label>
            <input type="file" onChange={handleFileUpload} className="mt-2" />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-green-600 text-white py-3 mt-6 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Save and Submit
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
