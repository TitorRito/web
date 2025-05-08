"use client";
import { useState } from 'react';
import '../../css/wireframe.css';

export default function StackPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeBranch, setActiveBranch] = useState<number | null>(null);

  const seeds = [
    {
      title: "Frontend Mastery",
      content: "Building modern, scalable UIs with React, Next.js, and cutting-edge CSS. Creating responsive designs that work across all devices.",
      position: "top"
    },
    {
      title: "Backend Expertise",
      content: "Developing robust server-side applications with Node.js, Express, and Python. Building scalable APIs and microservices architecture.",
      position: "right-top"
    },
    {
      title: "DevOps Skills",
      content: "Streamlining development workflows with Docker, Kubernetes, and CI/CD pipelines. Ensuring seamless deployment and monitoring.",
      position: "right-bottom"
    },
    {
      title: "UI/UX Design",
      content: "Crafting intuitive user experiences and visually appealing interfaces. Using design principles to enhance usability and engagement.",
      position: "left-bottom"
    },
    {
      title: "Database Management",
      content: "Designing efficient database schemas and optimizing queries. Working with SQL and NoSQL databases to handle data at scale.",
      position: "left-top"
    },
    {
      title: "Docker & Cloud",
      content: "Containerizing applications with Docker and deploying to cloud platforms like AWS, Azure, and GCP. Implementing scalable cloud architecture.",
      position: "bottom"
    }
  ];

  const toggleBranch = (index: number) => {
    setActiveBranch(activeBranch === index ? null : index);
  };

  return (
    <div className="stack-container">
      <div className="master-mind">
        <div className="brain-center">
          <div className="pulse-circle"></div>
          <h1>Full Stack Development</h1>
          <p>The integrated approach to web development</p>
        </div>
        
        <div className="wireframe-container">
          {seeds.map((seed, index) => (
            <div 
              key={index}
              className={`seed-item ${seed.position} ${activeIndex === index ? 'active' : ''} ${activeBranch === index ? 'branch-active' : ''}`}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              onClick={() => toggleBranch(index)}
            >
              <div className="connection-line"></div>
              <div className="branch branch-left"></div>
              <div className="branch branch-right"></div>
              <div className="branch branch-middle"></div>
              <div className="seed-content">
                <h3>{seed.title}</h3>
                <div className="seed-details">
                  <p>{seed.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
