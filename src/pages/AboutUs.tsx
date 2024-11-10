// src/pages/about-us.tsx
import React from "react";
import Navbar from "src/components/Navbar";

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12 flex flex-col items-center">
      <div className="mb-6">
        <Navbar />
      </div>

      <h1 className="text-4xl font-bold text-blue-800 mb-10">About Us</h1>

      <div className="bg-white shadow-xl rounded-lg p-8 max-w-4xl space-y-6 text-center">
        <p className="text-lg text-gray-700 leading-relaxed text-justify">
          Welcome to <strong>Match-ABLE</strong> – a platform dedicated to
          connecting talented individuals from diverse backgrounds with
          companies committed to fostering inclusivity. Our mission is to bridge
          the gap between inclusive hiring goals and skilled candidates,
          focusing on those with disabilities and unique needs.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed text-justify">
          We understand that diversity and inclusion go beyond policies; it’s
          about creating real, meaningful opportunities. With Match-ABLE, we
          empower companies to meet their Diversity, Equity, and Inclusion (DEI)
          targets while providing job seekers with an accessible, transparent
          job search experience tailored to their unique strengths.
        </p>

        <div className="text-lg text-gray-700 leading-relaxed text-justify space-y-4">
          <p>Our platform provides:</p>
          <ul className="list-disc list-inside text-left ml-4">
            <li>
              Personalized match scores for candidates, highlighting roles that
              align with their skills, experiences, and specific needs.
            </li>
            <li>
              An intuitive interface that allows companies to easily identify
              candidates who help them meet their DEI objectives.
            </li>
            <li>
              A transparent and accessible job search experience for candidates
              with disabilities, ensuring they feel empowered in their career
              journey.
            </li>
            <li>
              A unique approach to job matching, prioritizing inclusivity and
              diversity at every level.
            </li>
          </ul>
        </div>

        <p className="text-lg text-gray-700 leading-relaxed text-justify">
          At Match-ABLE, we believe that everyone deserves equal access to job
          opportunities. We’re excited to help build a future where companies
          and candidates can grow together, fostering a workplace environment
          that values diversity and promotes inclusion at every level.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
