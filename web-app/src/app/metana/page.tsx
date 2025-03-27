import React from "react";
import { DappCard } from "@/components/w3/DappCard";

export default function MetanaPage() {
  const projects = [
    {
      title: "my-first-dapp",
      link: "metana/dapp",
      objectives: [
        "Introduction to calling contracts using ethers",
        "Creating a game to make things less dulable, and durable"
      ]
    },
    // Additional projects can be added here
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">App & Projects</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <DappCard
            key={index}
            title={project.title}
            link={project.link}
            objectives={project.objectives}
          />
        ))}
      </div>
    </div>
  );
}
