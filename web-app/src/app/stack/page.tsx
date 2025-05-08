"use client";
import { useState, useEffect } from 'react';
import '../../css/wireframe.css';

export default function StackPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeBranch, setActiveBranch] = useState<number | null>(null);
  const [connectionsVisible, setConnectionsVisible] = useState(false);

  // Show connections after a short delay for a nice entrance effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setConnectionsVisible(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const seeds = [
    {
      title: "Backend",
      description: ["Data processing", "Data manipulation"],
      tools: [
        { name: "Python", icon: "🐍" },
        { name: "TypeScript", icon: "⚡" },
        { name: "C", icon: "🔍" }
      ],
      position: "top"
    },
    {
      title: "Linux Terminal",
      description: ["grep, mv, catting & wpm -> play my game", "git, vim, bash"],
      tools: [
        { name: "Terminal", icon: "💻" },
        { name: "Git", icon: "🔄" },
        { name: "Bash", icon: "📜" }
      ],
      position: "right-top"
    },
    {
      title: "Deploying",
      description: ["host it. somewhere"],
      tools: [
        { name: "Docker", icon: "🐳" },
        { name: "Vercel", icon: "▲" },
        { name: "Convex", icon: "🔄" },
        { name: "Shopify", icon: "🛒" }
      ],
      position: "right-bottom"
    },
    {
      title: "Documentation",
      description: [
        "we live in an age of prompting", 
        "and understanding", 
        "writing for neatness and clarity"
      ],
      tools: [
        { name: "README", icon: "📝" },
        { name: "Copilot", icon: "🤖" }
      ],
      position: "left-bottom"
    },
    {
      title: "Databases",
      description: ["rows and columns", "dict and json"],
      tools: [
        { name: "SQL", icon: "🗃️" },
        { name: "Prisma", icon: "🔺" },
        { name: "Rails", icon: "🚄" }
      ],
      position: "left-top"
    },
    {
      title: "Front End",
      description: ["visual design", "user experience"],
      tools: [
        { name: "React", icon: "⚛️" },
        { name: "CSS", icon: "🎨" },
        { name: "Next.js", icon: "△" }
      ],
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
          <h1 className="developer-title">Full Stack Developer</h1>
          <div className="catchphrase">
            <div className="catchphrase-line">the right tool</div>
            <div className="catchphrase-line">for the right job</div>
          </div>
        </div>
        
        <div className={`wireframe-container ${connectionsVisible ? 'connections-visible' : ''}`}>
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
                  <div className="description">
                    {seed.description.map((line, i) => (
                      <div key={i} className="description-line">{line}</div>
                    ))}
                  </div>
                  {seed.tools.length > 0 && (
                    <div className="tools-section">
                      <div className="tools-header">Tools</div>
                      <div className="tools-grid">
                        {seed.tools.map((tool, i) => (
                          <div key={i} className="tool-item">
                            <span className="tool-icon">{tool.icon}</span>
                            <span className="tool-name">{tool.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
