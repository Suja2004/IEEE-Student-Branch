import React, { useEffect, useRef } from 'react';

// --- MOCK DATA ---
const MOCK_PUBLICATIONS = [
    { _id: 'pub1', title: 'A Novel Approach to Enhance IoT Security using Blockchain', authors: 'Priya Singh, Rohan Sharma, et al.', conference: 'IEEE INDICON 2024', publicationLink: '#' },
    { _id: 'pub2', title: 'Machine Learning Models for Predictive Maintenance in Industrial Machinery', authors: 'Amit Kumar, et al.', conference: 'IEEE TENCON 2024', publicationLink: '#' },
    { _id: 'pub3', title: 'Advancements in 5G Network Slicing for Critical Communications', authors: 'Anjali Reddy, Sneha Gupta, et al.', conference: 'IEEE ANTS 2023', publicationLink: '#' },
    { _id: 'pub4', title: 'Developing Humanitarian Technologies for Rural Education', authors: 'Sanjay Joshi, Divya Nair, et al.', conference: 'IEEE GHTC 2023', publicationLink: '#' },
];

// SVG Icon for an external link
const LinkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path></svg>
);

const PublicationsPage = () => {
    return (
        <>
            <style>{`
                .publication-card {
                    background: #fff;
                    margin-bottom: 1.5rem;
                    padding: 1.5rem;
                    border-radius: 8px;
                    border: 1px solid #eee;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
                    opacity: 0;
                    transform: scale(0.95);
                    transition: all 0.5s ease-out;
                }
                .publication-card.is-visible {
                    opacity: 1;
                    transform: scale(1);
                }
                .pub-title { font-size: 1.4rem; color: var(--ieee-blue); margin-bottom: 0.5rem; }
                .pub-authors { font-style: italic; color: #555; margin-bottom: 1rem; }
                .pub-conference { font-weight: 500; }
                .pub-link { display: inline-flex; align-items: center; gap: 0.5rem; color: var(--ieee-blue); text-decoration: none; margin-top: 1rem; }
                .pub-link:hover { text-decoration: underline; }
            `}</style>
            <div>
                <h1 className="page-title">Member Publications</h1>
                <div>
                    {MOCK_PUBLICATIONS.map((pub, index) => <PublicationCard key={pub._id} pub={pub} index={index} />)}
                </div>
            </div>
        </>
    );
};

const PublicationCard = ({ pub, index }) => {
    const cardRef = useRef(null);
    // Intersection Observer to trigger animation on scroll
    const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    }, { threshold: 0.1 });

    useEffect(() => {
        if (cardRef.current) {
            observer.observe(cardRef.current);
        }
        // Cleanup observer on component unmount
        return () => observer.disconnect();
    }, [observer]);

    return (
        <div ref={cardRef} className="publication-card" style={{ transitionDelay: `${index * 100}ms` }}>
            <h3 className="pub-title">{pub.title}</h3>
            <p className="pub-authors">{pub.authors}</p>
            <p className="pub-conference">Published in: {pub.conference}</p>
            {pub.publicationLink && (
                <a href={pub.publicationLink} target="_blank" rel="noopener noreferrer" className="pub-link">
                    <LinkIcon /> View Publication
                </a>
            )}
        </div>
    );
};

export default PublicationsPage;

