'use client'
import { useRef, useState } from 'react';
import { FaGithub, FaLinkedin, FaPhoneSquare } from 'react-icons/fa';
import { SiGmail, SiX } from 'react-icons/si';

const socialContent = [
  { 
    name: 'GitHub', 
    icon: FaGithub, 
    linkUrl: 'https://www.github.com/vctrubio',
    onClick: () => window.open('https://www.github.com/vctrubio', '_blank')
  },
  { 
    name: 'LinkedIn', 
    icon: FaLinkedin, 
    linkUrl: 'https://www.linkedin.com/in/vctrubio/',
    onClick: () => window.open('https://www.linkedin.com/in/vctrubio/', '_blank')
  },
  { 
    name: 'Email', 
    icon: SiGmail, 
    linkUrl: 'mailto:vctrubioe@vctrubio.com',
    onClick: () => window.open('mailto:vctrubioe@vctrubio.com', '_blank')
  },
  { 
    name: 'Book a Call', 
    icon: FaPhoneSquare, 
    linkUrl: 'tel:+34686516248',
    onClick: () => window.open('tel:+34686516248', '_blank')
  },
  { 
    name: 'X', 
    icon: SiX, 
    linkUrl: 'https://x.com/donkeydrills',
    onClick: () => window.open('https://x.com/donkeydrills', '_blank')
  },
];

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscription email:', email);
    setEmail('');
  };

  return (
    <div
      ref={containerRef}
      className="w-screen min-h-screen flex flex-col items-center justify-center py-16"
    >
      {/* Main heading */}
      <div className="text-center mb-16">
        <h1 className="text-6xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>Get in Touch</h1>
        <p className="text-xl opacity-70" style={{ color: 'var(--foreground)' }}>Connect with me through any of these channels</p>
      </div>

      {/* 2x2 Grid for social items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-5xl px-8 mb-20">
        {socialContent.slice(0, 4).map((item) => (
          <div
            key={item.name}
            className="flex flex-col items-center justify-center h-80 transition-all duration-500 hover:scale-105 cursor-pointer group rounded-3xl shadow-lg hover:shadow-2xl p-12"
            style={{ 
              border: '1px solid var(--foreground)',
              backgroundColor: 'rgba(221, 168, 83, 0.05)'
            }}
            onClick={item.onClick}
          >
            <item.icon 
              className="text-7xl mb-8 transition-colors duration-500" 
              style={{ 
                color: 'var(--foreground)',
              }}
            />
            <h2 className="text-3xl font-bold transition-colors duration-500 text-center leading-tight" style={{ color: 'var(--foreground)' }}>
              {item.name}
            </h2>
          </div>
        ))}
      </div>

      {/* X Twitter section */}
      <div className="mb-16">
        <div 
          className="flex flex-col items-center justify-center cursor-pointer group rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 px-12 py-8"
          style={{ 
            border: '1px solid var(--foreground)',
            backgroundColor: 'rgba(221, 168, 83, 0.05)'
          }}
          onClick={socialContent[4].onClick}
        >
          <SiX 
            className="text-5xl mb-4 transition-colors duration-500" 
            style={{ color: 'var(--foreground)' }}
          />
          <h3 className="text-2xl font-bold transition-colors duration-500" style={{ color: 'var(--foreground)' }}>
            Follow on X
          </h3>
          <p className="mt-2 opacity-70" style={{ color: 'var(--foreground)' }}>@donkeydrills</p>
        </div>
      </div>

      {/* Subscription form */}
      <div className="rounded-3xl shadow-lg p-12 w-full max-w-md" style={{ 
        border: '1px solid var(--foreground)',
        backgroundColor: 'rgba(221, 168, 83, 0.05)'
      }}>
        <h3 className="text-3xl font-bold text-center mb-4" style={{ color: 'var(--foreground)' }}>Stay Updated</h3>
        <p className="text-center mb-8 opacity-70" style={{ color: 'var(--foreground)' }}>Subscribe for the latest updates and insights</p>
        <form onSubmit={handleSubscribe} className="flex flex-col gap-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="px-6 py-4 rounded-xl transition-colors duration-300 text-lg"
            style={{ 
              border: '2px solid var(--foreground)',
              backgroundColor: 'transparent',
              color: 'var(--foreground)'
            }}
            required
          />
          <button
            type="submit"
            className="px-8 py-4 rounded-xl transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            style={{ 
              border: '1px solid var(--foreground)',
              backgroundColor: 'var(--foreground)',
              color: 'var(--background)'
            }}
          >
            Subscribe Now
          </button>
        </form>
      </div>
    </div>
  );
}
