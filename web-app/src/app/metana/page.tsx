import React from "react";
import { DappCard } from "@/components/w3/DappCard";
import { TypingAnimationProvider } from "@/components/TypingAnimationContext";

export default function MetanaPage() {
  const projects = [
    {
      title: "My first Dapp",
      link: "metana/dapp",
      objectives: [
        "Interactive blockchain interface with wallet integration",
        "Real-time contract function calls with parameter input",
        "Network switching across Ethereum, Sepolia, and Hardhat networks",
        "Clean component architecture with optimized state management",
        "Send transactions and interact with any smart contract"
      ],
      stack: [
        "Ethers.js v6",
        "Hardhat",
      ]
    },
    {
      title: "Night Time Owl",
      link: "#", // Placeholder link until it's available on the store
      objectives: [
        "This one was about having fun, and creating something I abs needed",
        "Implemented CRUD operations for managing browser sessions",
        "Keyboard shortcuts for quick navigation to websites",
        "Designed intuitive day/night mode toggle",
      ],
      stack: [
        "JavaScript",
        "HTML/CSS",
        "Manifest.json",
      ]
    }
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">My Dev Store</h1>

      <TypingAnimationProvider>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <DappCard
              key={index}
              title={project.title}
              link={project.link}
              objectives={project.objectives}
              stack={project.stack}
              index={index} // Pass index instead of delay
            />
          ))}
        </div>
      </TypingAnimationProvider>
    </div>
  );
}
