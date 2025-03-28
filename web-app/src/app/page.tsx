"use client";
import { useState, useEffect, useCallback } from "react";

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

export default function Home() {
  const navItems = [
    { color: "#ff6b6b", name: "dynamic language" },
    { color: "#ffa94d", name: "tech stack" },
    { color: "#4dabf7", name: "school and projects" },
    { color: "#9775fa", name: "blogs and archives" },
    { color: "#999999", name: "subscriptions and recommendations" },
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
            <LogoChild />
            <LogoChild />
            <LogoChild />
            <LogoChild />
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
  );
}
