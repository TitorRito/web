"use client";
import { useState, useEffect, useCallback } from "react";
import { IconType } from 'react-icons';
import { 
  FaGithub, FaLinkedin, FaInstagram, FaFileAlt, 
  FaCalendar, FaWhatsapp, FaEnvelope, FaTwitter,
  FaCode, FaTerminal, FaEdit, FaEthereum,
  FaDatabase, FaPython, FaJsSquare, FaReact,
  FaMapMarkerAlt, FaLaptop, FaEthereum as FaWeb3, FaWind
} from 'react-icons/fa';

// Define LogoItem type (renamed from MenuItem)
interface LogoItem {
  name: string;
  icon: IconType;
  onClick: () => void;
}

// Updated LogoChild component to accept logo items
function LogoChild({ items }: { items: LogoItem[] }) {
  return (
    <div className="logo-child">
      {items.map((item, index) => (
        <div key={index} onClick={item.onClick} title={item.name}>
          <item.icon />
        </div>
      ))}
    </div>
  );
}

function QuoteCarousel() {
  const initialQuotes = [
    {
      text: "Everything has a library nowadays"
    },
    {
      text: "Prompts are powerful tools that accelerate thinking"
    },
    {
      text: "Documennt for your later self, ... and peers"
    },
    {
      text: "Don't doubt, make the mistake"
    },
    {
      text: "Everything dwells, depending which way you look at it"
    },
    {
      text: "The rich is not happier than the poor"
    },
    {
      text: "I wish I knew this sooner, but jolly did I enjoy learning that"
    },
    {
      text: "Anyone can build something now, I guess it's the mind that counts"
    },
    {
      text: "I like to fix and create problems"
    }
  ];

  // Fisher-Yates shuffle algorithm
  const shuffleArray = (array: Array<{ text: string }>) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const [quotes, setQuotes] = useState(initialQuotes);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const quotesLength = quotes.length;

  // Shuffle quotes on initial render
  useEffect(() => {
    setQuotes(shuffleArray(initialQuotes));
  }, []);

  const nextQuote = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % quotesLength);
  }, [quotesLength]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlaying) {
      interval = setInterval(() => {
        nextQuote();
      }, 5000);
    }

    return () => clearInterval(interval);
  }, [nextQuote, isPlaying]);

  const togglePlay = () => {
    setIsPlaying(prev => !prev);
  };

  return (
    <div className="quotes-carousel">
      <div className="carousel-container">
        <div
          className="carousel-content"
          style={{ "--current-index": currentIndex } as React.CSSProperties}
        >
          {quotes.map((quote, index) => (
            <div
              className={`carousel-item ${isHovering ? 'hover-blur' : ''}`}
              key={index}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <blockquote>
                <p>"{quote.text}"</p>
              </blockquote>
              {isHovering && (
                <button
                  className="carousel-toggle-btn"
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pause quotes" : "Play quotes"}
                >
                  {isPlaying ? "❚❚" : "▶"}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="carousel-controls">
        <div className="carousel-dots">
          {quotes.map((_, index) => (
            <span
              key={index}
              className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
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
          looking for cool projects. duh.
        </div>
        <div className="footer-item">
          I also teach kitesrufing, professionally. 
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  // Group 1: Social
  const group1: LogoItem[] = [
    { name: 'GitHub', icon: FaGithub, onClick: () => console.log('GitHub clicked') },
    { name: 'LinkedIn', icon: FaLinkedin, onClick: () => console.log('LinkedIn clicked') },
    { name: 'Instagram', icon: FaInstagram, onClick: () => console.log('Instagram clicked') },
    { name: 'CV', icon: FaFileAlt, onClick: () => console.log('CV clicked') },
  ];

  // Group 2: Communication
  const group2: LogoItem[] = [
    { name: 'Calendly', icon: FaCalendar, onClick: () => console.log('Calendly clicked') },
    { name: 'WhatsApp', icon: FaWhatsapp, onClick: () => console.log('WhatsApp clicked') },
    { name: 'Email', icon: FaEnvelope, onClick: () => console.log('Email clicked') },
    { name: 'X', icon: FaTwitter, onClick: () => console.log('X clicked') },
  ];

  // Group 3: Development Tools
  const group3: LogoItem[] = [
    { name: 'C', icon: FaCode, onClick: () => console.log('C clicked') },
    { name: 'Bash', icon: FaTerminal, onClick: () => console.log('Bash clicked') },
    { name: 'Vim', icon: FaEdit, onClick: () => console.log('Vim clicked') },
    { name: 'Solidity', icon: FaEthereum, onClick: () => console.log('Solidity clicked') },
  ];

  // Group 4: Additional Tech
  const group4: LogoItem[] = [
    { name: 'Database', icon: FaDatabase, onClick: () => console.log('Database clicked') },
    { name: 'Python', icon: FaPython, onClick: () => console.log('Python clicked') },
    { name: 'JavaScript', icon: FaJsSquare, onClick: () => console.log('JavaScript clicked') },
    { name: 'React', icon: FaReact, onClick: () => console.log('React clicked') },
  ];

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
              <div className="icon-a"></div>
              <div className="icon-b"></div>
            </div>
            <div className="logo">
              <LogoChild items={group1} />
              <LogoChild items={group2} />
              <LogoChild items={group3} />
              <LogoChild items={group4} />
            </div>
            <QuoteCarousel />
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
