"use client";
import { useState, useEffect } from "react";
import { IconType } from 'react-icons';
import {
  FaGithub, FaLinkedin, FaEthereum,
  FaPython, FaJsSquare, FaReact, FaPhoneSquare,
  FaMapMarkerAlt, FaLaptop, FaEthereum as FaWeb3,
  FaDatabase, FaServer, FaCode, FaTerminal,
  FaGitAlt, FaVimeo, FaDocker, FaLinux, FaNodeJs,
  FaHammer, FaPlus
} from 'react-icons/fa';
import { SiGmail, SiPostgresql, SiGnubash, SiVim, SiTypescript, SiTailwindcss, SiCplusplus } from "react-icons/si";
import { FiWind } from "react-icons/fi";
import Link from 'next/link';

// Define LogoItem type with group identity
type LogoGroup = 'social' | 'devtools' | 'languages' | 'frameworks' | 'tools';

interface LogoItem {
  name: string;
  icon: IconType;
  linkUrl: string;
  group: LogoGroup;
}

// All logo items in a single array with group identity
const logoItems: LogoItem[] = [
  // Social - github, linkedin, email, call stay
  { name: 'GitHub', icon: FaGithub, linkUrl: 'https://www.github.com/vctrubio', group: 'social' },
  { name: 'LinkedIn', icon: FaLinkedin, linkUrl: 'https://www.linkedin.com/in/vctrubio/', group: 'social' },
  { name: 'Email', icon: SiGmail, linkUrl: 'mailto:vctrubioe@vctrubio.com', group: 'social' },
  { name: 'Call', icon: FaPhoneSquare, linkUrl: 'tel:++34686516248', group: 'social' },


  // Devtools - git vim bash linux
  { name: 'Git', icon: FaGitAlt, linkUrl: 'https://git-scm.com/', group: 'devtools' },
  { name: 'Vim', icon: SiVim, linkUrl: 'https://www.vim.org/', group: 'devtools' },
  { name: 'Bash', icon: SiGnubash, linkUrl: 'https://www.gnu.org/software/bash/', group: 'devtools' },
  { name: 'Linux', icon: FaLinux, linkUrl: 'https://www.linux.org/', group: 'devtools' },
  // Languages - c c++ typescript javascript
  { name: 'C', icon: SiCplusplus, linkUrl: 'https://en.wikipedia.org/wiki/C_(programming_language)', group: 'languages' },
  { name: 'C++', icon: SiCplusplus, linkUrl: 'https://en.wikipedia.org/wiki/C%2B%2B', group: 'languages' },
  { name: 'TypeScript', icon: SiTypescript, linkUrl: 'https://www.typescriptlang.org/', group: 'languages' },
  { name: 'JavaScript', icon: FaJsSquare, linkUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', group: 'languages' },
  // Frameworks - react tailwind docker postgres  
  { name: 'React', icon: FaReact, linkUrl: 'https://react.dev/', group: 'frameworks' },
  { name: 'Postgres', icon: SiPostgresql, linkUrl: 'https://www.postgresql.org/', group: 'frameworks' },
  { name: 'Tailwind', icon: SiTailwindcss, linkUrl: 'https://tailwindcss.com/', group: 'frameworks' },
  { name: 'Docker', icon: FaDocker, linkUrl: 'https://www.docker.com/', group: 'frameworks' },
  // Tools - solidity hardhat python node
  { name: 'Solidity', icon: FaEthereum, linkUrl: 'https://docs.soliditylang.org/', group: 'tools' },
  { name: 'Hardhat', icon: FaHammer, linkUrl: 'https://hardhat.org/', group: 'tools' },
  { name: 'Python', icon: FaPython, linkUrl: 'https://www.python.org/', group: 'tools' },
  { name: 'Node.js', icon: FaNodeJs, linkUrl: 'https://nodejs.org/', group: 'tools' },
];

// Helper to get items by group
const getLogoItemsByGroup = (group: LogoGroup) => logoItems.filter(item => item.group === group);

// Handle item click function
const handleItemClick = (item: LogoItem) => {
  console.log('click bait');
  // Comment out the default link behavior
  // window.open(item.linkUrl, '_blank');
};

// Updated LogoChild to support grid position and tooltip placement
function LogoChild({ items, gridPositions }: { items: LogoItem[], gridPositions?: [number, number][] }) {
  // Tooltip logic removed, only icon and click remain
  return (
    <div className="logo-child">
      {items.map((item, index) => (
        <div key={index} className="logo-item-with-tooltip" style={{ position: 'relative', display: 'inline-block' }}>
          <div onClick={() => handleItemClick(item)} title={item.name}>
            <item.icon />
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
      <p>i guess its the mind that counts.</p>
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
    { href: "/", color: "#ff6b6b", name: "dynamic language" },
    { href: "/", color: "#4dabf7", name: "school and projects" },
    { href: "/", color: "#ffa94d", name: "my full stack tech stack" },
    { href: "/", color: "#999999", name: "subscriptions and recommendations" },
    { href: "/", color: "#9775fa", name: "blogs, archives, and aspirations" },
    { href: "/", color: "#38d9a9", name: "about" }
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

            {/* <div className="logo">
              <LogoChild items={getLogoItemsByGroup('social')} />
              <LogoChild items={getLogoItemsByGroup('devtools')} />
              <LogoChild items={getLogoItemsByGroup('languages')} />
              <LogoChild items={getLogoItemsByGroup('frameworks')} />
              <LogoChild items={getLogoItemsByGroup('tools')} />
            </div> */}

            {/* <QuoteCarousel /> */}
          </div>
        )}

        <div className="rito">
          <div className="nav-container">
            {navItems.map((item, index) => (
              <Link href={item.href || "#"} key={index}>
                <div
                  className={`
                    nav-item 
                    ${hoveredItem === index ? 'nav-item-active' : ''} 
                    nav-item-animate
                    ${index === navItems.length - 1 ? 'nav-item-special' : ''}
                  `}
                  style={{
                    color: item.color,
                    borderBottomColor: item.color,
                    animationDelay: `${index * 0.8}s`
                  }}
                  onMouseEnter={() => setHoveredItem(index)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {item.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
