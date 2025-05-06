import React, { useState, useEffect, useCallback } from 'react';
export function QuoteCarousel() {
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
                                <p>--git{quote.text}--</p>
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
