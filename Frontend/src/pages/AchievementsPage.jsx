import React, { useEffect, useRef } from 'react';

// --- MOCK DATA ---
const MOCK_ACHIEVEMENTS = [
    { _id: 'ach1', description: 'Won "Best Student Branch Award" at the IEEE Bangalore Section AGM.', year: 2024 },
    { _id: 'ach2', description: 'Secured 1st place in the National Level Project Competition hosted by IEEE India Council.', year: 2024 },
    { _id: 'ach3', description: 'Successfully organized a 24-hour national hackathon with over 200 participants.', year: 2023 },
];

const MOCK_ACHIEVEMENTS2 = [
    { _id: 'ach3', description: 'Successfully organized a 24-hour national hackathon with over 200 participants.', year: 2023 },
    { _id: 'ach4', description: 'Recipient of the IEEE Regional Exemplary Student Branch Award.', year: 2023 },
    { _id: 'ach5', description: 'Published 5 papers in reputed IEEE conferences in the last academic year.', year: 2022 },
];
// Trophy icon
const TrophyIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ color: '#ffc107', marginRight: '1rem', flexShrink: 0 }}
    >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
);

const Carousel = ({ achievements, direction = 'ltr' }) => {
    const scrollRef = useRef(null);

    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        const scrollStep = 1; // px per tick
        const delay = 20; // ms per tick

        const interval = setInterval(() => {
            if (!container) return;

            if (direction === 'ltr') {
                container.scrollLeft += scrollStep;
                if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
                    container.scrollLeft = 0;
                }
            } else {
                container.scrollLeft -= scrollStep;
                if (container.scrollLeft <= 0) {
                    container.scrollLeft = container.scrollWidth - container.clientWidth;
                }
            }
        }, delay);

        return () => clearInterval(interval);
    }, [direction]);

    return (
        <div className="carousel-container" ref={scrollRef}>
            <div className="carousel-track">
                {achievements.concat(achievements).map((item, index) => (
                    <div key={item._id + index} className="achievement-item">
                        <TrophyIcon />
                        <div>
                            <p>{item.description}</p>
                            <span style={{ color: '#777', fontSize: '0.9rem' }}>Year: {item.year}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const AchievementsPage = () => {
    return (
        <>
            <style>{`
        .carousel-container {
          overflow: hidden;
          white-space: nowrap;
          width: 100%;
          padding: 1rem 0;
          background: #f9f9f9;
          margin-bottom: 1rem;
  mask-image: linear-gradient(to right, transparent, #000 10% 90%, transparent);
        }
        .carousel-track {
          display: flex;
          gap: 1rem;
        }
        .achievement-item {
          flex: 0 0 auto;
          min-width: 300px;
          max-width: 350px;
          height:200px;
          text-wrap:wrap;
          background: #fff;
          padding: 1.5rem;
          border-radius: 8px;
          border-left: 5px solid var(--ieee-blue, #00629B);
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          display: flex;
          align-items: center;
        }
        .achievement-item p {
          margin: 0 0 0.5rem;
        }
      `}</style>

            <div>
                <h1 className="page-title">Our Achievements</h1>
                <Carousel achievements={MOCK_ACHIEVEMENTS} direction="ltr" />
                <Carousel achievements={MOCK_ACHIEVEMENTS2} direction="rtl" />
            </div>
        </>
    );
};

export default AchievementsPage;
