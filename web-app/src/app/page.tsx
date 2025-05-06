"use client";
import { useState, useEffect } from "react";
import { IconType } from 'react-icons';
import {
  FaGithub, FaLinkedin, FaEthereum,
  FaPython, FaJsSquare, FaReact, FaPhoneSquare,
  FaMapMarkerAlt, FaLaptop, FaEthereum as FaWeb3
} from 'react-icons/fa';
import { SiGmail } from "react-icons/si";

import Image from 'next/image';
import { FiWind } from "react-icons/fi";

// Define LogoItem type with group identity
type LogoGroup = 'social' | 'communication' | 'devtools' | 'tech';

interface LogoItem {
  name: string;
  icon: IconType | string;
  linkUrl: string;
  group: LogoGroup;
}

// All logo items in a single array with group identity
const logoItems: LogoItem[] = [
  // Social
  { name: 'GitHub', icon: FaGithub, linkUrl: 'https://github.com/', group: 'social' },
  { name: 'LinkedIn', icon: FaLinkedin, linkUrl: 'https://linkedin.com/', group: 'social' },
  { name: 'Email', icon: SiGmail, linkUrl: 'mailto:someone@example.com', group: 'social' },
  { name: 'Call', icon: FaPhoneSquare, linkUrl: 'tel:+123456789', group: 'social' },
  // Communication
  { name: 'Postgres', icon: () => <Image src="/postgres.svg" alt="Postgres" width={24} height={24} />, linkUrl: 'https://www.postgresql.org/', group: 'communication' },
  { name: 'HTTP', icon: FiWind, linkUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTTP', group: 'communication' },
  { name: 'API', icon: FiWind, linkUrl: 'https://en.wikipedia.org/wiki/API', group: 'communication' },
  { name: 'Node.js', icon: () => <Image src="/nodejs.svg" alt="Node.js" width={24} height={24} />, linkUrl: 'https://nodejs.org/', group: 'communication' },
  // Devtools
  { name: 'Bash', icon: () => <Image src="/bash.svg" alt="Bash" width={24} height={24} />, linkUrl: 'https://www.gnu.org/software/bash/', group: 'devtools' },
  { name: 'C', icon: () => <Image src="/c.svg" alt="C" width={24} height={24} />, linkUrl: 'https://en.wikipedia.org/wiki/C_(programming_language)', group: 'devtools' },
  { name: 'Docker', icon: () => <Image src="/docker.svg" alt="Docker" width={24} height={24} />, linkUrl: 'https://www.docker.com/', group: 'devtools' },
  { name: 'Vim', icon: () => <Image src="/vim.svg" alt="Vim" width={24} height={24} />, linkUrl: 'https://www.vim.org/', group: 'devtools' },
  // Tech
  { name: 'Python', icon: FaPython, linkUrl: 'https://www.python.org/', group: 'tech' },
  { name: 'JavaScript', icon: FaJsSquare, linkUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', group: 'tech' },
  { name: 'React', icon: FaReact, linkUrl: 'https://react.dev/', group: 'tech' },
  { name: 'Solidity', icon: FaEthereum, linkUrl: 'https://docs.soliditylang.org/', group: 'tech' },
];

// Helper to get items by group
const getLogoItemsByGroup = (group: LogoGroup) => logoItems.filter(item => item.group === group);

// Updated LogoChild to support grid position and tooltip placement
function LogoChild({ items, gridPositions }: { items: LogoItem[], gridPositions?: [number, number][] }) {
  // Tooltip logic removed, only icon and click remain
  return (
    <div className="logo-child">
      {items.map((item, index) => (
        <div key={index} className="logo-item-with-tooltip" style={{ position: 'relative', display: 'inline-block' }}>
          <div onClick={() => window.open(item.linkUrl, '_blank')} title={item.name}>
            {typeof item.icon === 'string' ? (
              <Image src={item.icon} alt={item.name} width={24} height={24} />
            ) : (
              <item.icon />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}


function WelcomeMsg({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    // Show message for 5 seconds before transitioning
    const timer = setTimeout(() => {
      onComplete();
    }, 5000); // Updated from 3500ms to 5000ms

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="welcome-message">
      <p>if anyone can build nowadays.</p>
      <p>i guess it's the mind that counts.</p>
    </div>
  );
}

// Footer component
function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Slight delay for subtle appearance after main content loads
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <footer className={`site-footer ${isVisible ? 'footer-visible' : ''}`}>
      <div className="footer-content">
        <div className="footer-item">
          <FaMapMarkerAlt />
          Based in Tarifa, Spain
        </div>
        <div className="footer-item">
          <FaLaptop />
          Interested in remote work
        </div>
        <div className="footer-item">
          <FaWeb3 />
          Looking for cool projects. duh.
        </div>
        <div className="footer-item">
          I also like to teach kitesurfing, professionally.
        </div>
      </div>
    </footer>
  );
}

// Icon struct for avatar icons
const avatarIcons = [
  {
    key: 'icon-b',
    name: 'Listen to what I listen to',
    state: false,
    msg: 'Listen to what I listen to',
  },
  {
    key: 'icon-c',
    name: 'Am I online?',
    state: false, // Will be set by websocket in the future
    msg: 'Am I online? (WebSocket status)',
  },
  {
    key: 'icon-a',
    name: 'Interested in this webApp?',
    state: false,
    msg: 'Interested in this webApp? Check the documentation.',
  },
];

export default function Home() {
  const navItems = [
    { color: "#ff6b6b", name: "dynamic language" },
    { color: "#4dabf7", name: "school and projects" },
    { color: "#ffa94d", name: "my full stack tech stack" },
    { color: "#999999", name: "subscriptions and recommendations" },
    { color: "#9775fa", name: "blogs, archives, and aspirations" },
    { color: "#38d9a9", name: "contact me" }
  ];

  const [isLoading, setIsLoading] = useState(true);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [showWelcome, setShowWelcome] = useState<boolean>(false); // Default to false now
  const [showTitor, setShowTitor] = useState<boolean>(false);
  const [iconStates, setIconStates] = useState([false, false, false]);
  const [mouseIn, setMouseIn] = useState<number | null>(null);
  const [showMsg, setShowMsg] = useState('');

  // Component initialization with caching logic
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const lastVisit = localStorage.getItem('lastVisitTime');
      const currentTime = new Date().getTime();

      // Show welcome message only if first visit or 90+ seconds since last visit
      if (!lastVisit || (currentTime - parseInt(lastVisit)) > 90000) {
        setShowWelcome(true);
        setShowTitor(false);
      } else {
        // Skip welcome for recent visitors
        setShowWelcome(false);
        setShowTitor(true);
      }

      // Update the last visit timestamp
      localStorage.setItem('lastVisitTime', currentTime.toString());
    }

    // Short delay to prevent loading flash
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  }, []);

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
    setShowTitor(true);
  };

  const handleNavClick = (item: { color: string; name: string }) => {
    console.log(`clicked on ${item.name}`);
  };

  if (isLoading) {
    return <div className="full-container"></div>; // Empty container while loading
  }

  return (
    <>
      <div className="full-container">
        {showWelcome && (
          <div className="titor">
            <WelcomeMsg onComplete={handleWelcomeComplete} />
          </div>
        )}

        {showTitor && (
          <div className="titor fade-in">
            <div className="avatar">
              <div id='icons'>
                {avatarIcons.map((icon, idx) => (
                  <div
                    key={icon.key}
                    className={icon.key}
                    onClick={() => {
                      const newStates = [...iconStates];
                      newStates[idx] = !newStates[idx];
                      setIconStates(newStates);
                      console.log(`${icon.key} clicked`);
                    }}
                    onMouseEnter={() => {
                      setMouseIn(idx);
                      setShowMsg(icon.msg);
                    }}
                    onMouseLeave={() => {
                      setMouseIn(null);
                      setShowMsg('');
                    }}
                  >
                    {mouseIn === idx && (
                      <div className="icon-msg">{showMsg}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="logo">
              <LogoChild items={getLogoItemsByGroup('social')} />
              <LogoChild items={getLogoItemsByGroup('communication')} />
              <LogoChild items={getLogoItemsByGroup('devtools')} />
              <LogoChild items={getLogoItemsByGroup('tech')} />
            </div>
            {/* <QuoteCarousel /> */}
          </div>
        )}

        <div className="rito">
          <div className="nav-container">
            {navItems.map((item, index) => (
              <div
                key={index}
                className={`
                  nav-item 
                  ${hoveredItem === index ? 'nav-item-active' : ''} 
                  nav-item-animate
                  ${index === navItems.length - 1 ? 'nav-item-special' : ''}
                `}
                style={{
                  color: item.color,
                  borderBottomColor: item.color,
                  animationDelay: `${index * 0.2}s`
                }}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => handleNavClick(item)}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
