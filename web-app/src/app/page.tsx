"use client";
import { useState } from "react";

function LogoChild() {
  return (
    <div className="logo-child">
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
    </div>
  );
}

export default function Home() {
  const navItems = [
    { id: 1, name: "dynamic language" },
    { id: 2, name: "tech stack" },
    { id: 3, name: "school and projects" },
    { id: 4, name: "blogs and archives" },
    { id: 5, name: "contact me" },
    { id: 6, name: "subscriptions and recommendations" }
  ];

  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const handleNavClick = (item: { id: number; name: string }) => {
    console.log(`clicked on ${item.name}`);
  };

  return (
    <div className="full-container">
      <div className="titor">
        <div className="avatar">
          <div className="icon-a"></div>
          <div className="icon-b"></div>
        </div>
        <div className="logo">
          <LogoChild />
          <LogoChild />
          <LogoChild />
          <LogoChild />
        </div>
        <div>quotes</div>
      </div>
      <div className="rito">
        <div className="nav-container">
          {navItems.map((item) => (
            <div
              key={item.id}
              className={`nav-item ${hoveredItem === item.id ? 'nav-item-active' : ''}`}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => handleNavClick(item)}
            >
              {item.name}
            </div>
          ))}
        </div>
 
      </div>
    </div>
  );
}
