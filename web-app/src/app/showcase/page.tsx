'use client';

import { FaGraduationCap, FaBook, FaLightbulb, FaStar, FaUsers, FaCode, FaBuilding, FaFreeCodeCamp, FaGlobe, FaCubes } from 'react-icons/fa';

// Define education data with institutions, descriptions, and icons
const educationData = [
  {
    institution: "Marlborough College",
    description: "I went to public school. Eh.",
    icon: FaGraduationCap,
  },
  {
    institution: "University of British Columbia",
    description: "nah",
    icon: FaBook,
  },
  {
    institution: "University of Miami",
    description: "ok.",
    icon: FaUsers,
  },
  {
    institution: "LSE online",
    description: "nope.",
    icon: FaLightbulb,
  },
  {
    institution: "Naranjas Naranajs",
    description: "where I found my self.",
    icon: FaStar,
  },
];

// Define programming interests data
const programmingInterestsData = [
  {
    institution: "Le Wagon",
    description: "web2. Hobby horse",
    icon: FaCode,
  },
  {
    institution: "Siemens Gamesa",
    description: "coperate BS.",
    icon: FaBuilding,
  },
  {
    institution: "42 Lisbon, Malaga",
    description: "Who knows where I might go next.",
    icon: FaGlobe,
  },
  {
    institution: "Freelance",
    description: "Clients satisfaction ….",
    icon: FaFreeCodeCamp,
  },
  {
    institution: "Metana",
    description: "web3 init",
    icon: FaCubes,
  },
];

export default function EducationPage() {
  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl mb-4">Education</h1>

      <div className="space-y-3 mb-8">
        {educationData.map((item, index) => (
          <div key={index} className="border-b border-gray-200 pb-2">
            <div className="flex items-center gap-2">
              <item.icon className="w-4 h-4 text-gray-500" />
              <div>
                <h3 className="font-medium text-base">{item.institution}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h1 className="text-2xl mb-4">Programming XP</h1>

      <div className="space-y-3">
        {programmingInterestsData.map((item, index) => (
          <div key={index} className="border-b border-gray-200 pb-2">
            <div className="flex items-center gap-2">
              <item.icon className="w-4 h-4 text-gray-500" />
              <div>
                <h3 className="font-medium text-base">{item.institution}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
