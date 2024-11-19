import React, { useState } from "react";
import { useRouter } from "next/router";
import Navbar from "src/components/Navbar";

const deiOptions = [
  "Wheelchair Accessibility (Accessible building entrances, restrooms, workspaces)",
  "Accessible Parking (Reserved parking spaces near the building)",
  "Remote Work Options (Flexible work-from-home opportunities)",
  "Adjustable Workstations (Standing desks, accessible desks, ergonomic chairs)",
  "Assistive Technology (Screen readers, speech-to-text, Braille displays)",
  "American Sign Language (ASL) Support (Availability of interpreters for meetings)",
  "Flexible Work Hours (Ability to modify hours as needed for medical appointments)",
  "Quiet/Low-Stimulation Workspace (Separate or soundproof spaces for focus)",
  "Accessible Public Transportation (Close proximity to accessible transit options)",
  "Sensory-Friendly Environment (Reduced fluorescent lighting, noise-canceling headphones)",
  "Service Animal Accommodation (Permitted presence of support animals)",
  "Accessible Restroom Facilities (Gender-neutral and accessible restrooms)",
  "Closed Captioning/Subtitles for Video Content (Available for meetings and training)",
  "Accessible Documentation (Accessible PDFs, high-contrast documents, plain language)",
  "Mental Health Days (Policy allowing additional days off for mental health)",
  "On-Site Health Support (Therapists, counselors, or on-call medical professionals)",
  "Transportation Assistance (Shuttle services, ridesharing options)",
  "Customized Break Schedules (Flexibility to take breaks as needed)",
  "Height-Adjustable or Ergonomic Tools (Keyboards, monitors, or other devices)",
  "Emergency Evacuation Support (Personalized plans for safe emergency exits)",
];

const ProfilePage: React.FC = () => {
  const [resume, setResume] = useState<File | null>(null);
  const [demographics, setDemographics] = useState({
    name: "",
    gender: "",
    location: "",
  });
  const [selectedDeiNeeds, setSelectedDeiNeeds] = useState<string[]>([]);
  const [status, setStatus] = useState<string>("");
  const router = useRouter();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setResume(e.target.files[0]);
  };

  const handleCheckboxChange = (option: string) => {
    setSelectedDeiNeeds((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const uploadResume = async () => {
    if (!resume) {
      setStatus("Please select a resume file to upload.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setStatus("You need to log in first.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);

    try {
      const response = await fetch("http://localhost:3000/upload-resume", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        setStatus("Resume uploaded successfully!");
      } else {
        const errorText = await response.text();
        setStatus(`Failed to upload resume: ${errorText}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("Error uploading resume.");
    }
  };

  const updateProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setStatus("You need to log in first.");
      return;
    }

    const accessibilityNeeds = selectedDeiNeeds.join(", ");

    try {
      const response = await fetch("http://localhost:3000/update-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: demographics.name,
          accessibility_needs: accessibilityNeeds,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        setStatus(`Failed to update profile: ${errorText}`);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setStatus("Error updating profile.");
    }
  };

  const handleSubmit = async () => {
    await updateProfile(); // Update profile with accessibility needs
    await uploadResume();  // Upload the resume
    router.push("/JobListingPage");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-8 py-6">
      <div className="w-full max-w-2xl">
        <div className="mb-16">
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
              value={demographics.name}
              onChange={(e) =>
                setDemographics({ ...demographics, name: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

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

          {/* DEI Needs Checkboxes */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              DEI Needs
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-96 overflow-y-auto">
              {deiOptions.map((option, index) => (
                <label key={index} className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedDeiNeeds.includes(option)}
                    onChange={() => handleCheckboxChange(option)}
                    className="mt-1"
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">
              Upload Resume
            </label>
            <input type="file" onChange={handleFileUpload} className="mt-2" />
            <p className="text-gray-600 mt-2">{status}</p>
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
