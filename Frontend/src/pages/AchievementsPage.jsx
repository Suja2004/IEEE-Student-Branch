import React, { useEffect, useRef } from 'react';

// --- MOCK DATA ---
const MOCK_ACHIEVEMENTS = [
    { _id: 'ach1', description: 'Won "Best Student Branch Award" at the IEEE Bangalore Section AGM.', year: 2024 },
    { _id: 'ach2', description: 'Secured 1st place in the National Level Project Competition hosted by IEEE India Council.', year: 2024 },
    { _id: 'ach3', description: 'Successfully organized a 24-hour national hackathon with over 200 participants.', year: 2023 },
    { _id: 'ach4', description: 'Recipient of the IEEE Regional Exemplary Student Branch Award.', year: 2023 },
    { _id: 'ach5', description: 'Published 5 papers in reputed IEEE conferences in the last academic year.', year: 2022 },
];

// SVG for a trophy icon
const TrophyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#ffc107', marginRight: '1rem', flexShrink: 0 }}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
);


const AchievementsPage = () => {
    return (
        <>
            <style>{`
                .achievement-list { list-style: none; padding: 0; }
                .achievement-item {
                    display: flex;
                    align-items: center;
                    background: #fff;
                    margin-bottom: 1rem;
                    padding: 1.5rem;
                    border-radius: 8px;
                    border-left: 5px solid var(--ieee-blue);
                    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
                    opacity: 0;
                    transform: translateX(-20px);
                    transition: all 0.5s ease-out;
                }
                .achievement-item.is-visible {
                    opacity: 1;
                    transform: translateX(0);
                }
            `}</style>
            <div>
                <h1 className="page-title">Our Achievements</h1>
                <div className="card">
                    <ul className="achievement-list">
                        {MOCK_ACHIEVEMENTS.map((item, index) => <AchievementItem key={item._id} item={item} index={index} />)}
                    </ul>
                </div>
            </div>
        </>
    );
};

const AchievementItem = ({ item, index }) => {
    const itemRef = useRef(null);
    // Intersection Observer to trigger animation on scroll
    const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    }, { threshold: 0.1 });

    useEffect(() => {
        if (itemRef.current) observer.observe(itemRef.current);
        return () => observer.disconnect();
    }, [observer]);

    return (
        <li ref={itemRef} className="achievement-item" style={{ transitionDelay: `${index * 100}ms` }}>
            <TrophyIcon />
            <div>
                <p>{item.description}</p>
                <span style={{color: '#777', fontSize: '0.9rem'}}>Year: {item.year}</span>
            </div>
        </li>
    );
};

export default AchievementsPage;

