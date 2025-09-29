import React, { useEffect, useRef } from 'react';

// --- MOCK DATA ---
const MOCK_TEAM = {
    branchOfficers: [
        { _id: 't1', name: 'Rohan Sharma', position: 'Chairperson', imageUrl: 'https://placehold.co/280x280/00629b/ffffff?text=RS', linkedinUrl: '#' },
        { _id: 't2', name: 'Priya Singh', position: 'Vice Chairperson', imageUrl: 'https://placehold.co/280x280/00629b/ffffff?text=PS', linkedinUrl: '#' },
        { _id: 't3', name: 'Amit Kumar', position: 'Secretary', imageUrl: 'https://placehold.co/280x280/00629b/ffffff?text=AK', linkedinUrl: '#' },
        { _id: 't4', name: 'Sneha Gupta', position: 'Treasurer', imageUrl: 'https://placehold.co/280x280/00629b/ffffff?text=SG', linkedinUrl: '#' },
    ],
    societyHeads: [
        { _id: 't5', name: 'Vikram Mehta', position: 'Computer Society Head', imageUrl: 'https://placehold.co/280x280/333/ffffff?text=VM', linkedinUrl: '#' },
        { _id: 't6', name: 'Anjali Reddy', position: 'Communication Society Head', imageUrl: 'https://placehold.co/280x280/333/ffffff?text=AR', linkedinUrl: '#' },
        { _id: 't7', name: 'Divya Nair', position: 'WIE Affinity Group Head', imageUrl: 'https://placehold.co/280x280/333/ffffff?text=DN', linkedinUrl: '#' },
        { _id: 't8', name: 'Sanjay Joshi', position: 'SIGHT Group Head', imageUrl: 'https://placehold.co/280x280/333/ffffff?text=SJ', linkedinUrl: '#' },
    ]
};


// A simple LinkedIn SVG icon component
const LinkedInIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
);

const TeamPage = () => {
    return (
        <>
            <style>{`
                .team-section { margin-bottom: 3rem; }
                .team-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 2rem;
                }
                .member-card {
                    text-align: center;
                    padding: 2rem 1rem;
                    border-radius: 12px;
                    background: #fff;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
                    border: 1px solid #eee;
                    transition: all 0.3s ease;
                    opacity: 0;
                    transform: translateY(20px);
                }
                .member-card.is-visible {
                    opacity: 1;
                    transform: translateY(0);
                }
                .member-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 10px 25px rgba(0, 98, 155, 0.1);
                }
                .member-img {
                    width: 140px;
                    height: 140px;
                    border-radius: 50%;
                    object-fit: cover;
                    margin-bottom: 1rem;
                    border: 4px solid var(--ieee-blue);
                    box-shadow: 0 0 10px rgba(0,0,0,0.1);
                }
                .member-name { font-size: 1.25rem; font-weight: 600; margin-bottom: 0.25rem; }
                .member-position { color: #555; margin-bottom: 1rem; }
                .member-linkedin a { color: #0077b5; transition: color 0.3s ease; }
                .member-linkedin a:hover { color: var(--ieee-blue); }
            `}</style>
            <div>
                <h1 className="page-title">Meet Our Team</h1>

                <TeamSection title="Branch Officers" members={MOCK_TEAM.branchOfficers} />
                <TeamSection title="Society & Affinity Group Heads" members={MOCK_TEAM.societyHeads} />
            </div>
        </>
    );
};

const TeamSection = ({ title, members }) => (
    <section className="team-section">
        <h2 className="section-title">{title}</h2>
        <div className="team-grid">
            {members.map((member, index) => <MemberCard key={member._id} member={member} index={index} />)}
        </div>
    </section>
);

const MemberCard = ({ member, index }) => {
    const cardRef = useRef(null);
    const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });

    useEffect(() => {
        if (cardRef.current) {
            observer.observe(cardRef.current);
        }
        return () => observer.disconnect();
    }, [observer]);

    return (
        <div ref={cardRef} className="member-card" style={{ transitionDelay: `${index * 100}ms` }}>
            <img src={member.imageUrl} alt={member.name} className="member-img" />
            <h3 className="member-name">{member.name}</h3>
            <p className="member-position">{member.position}</p>
            {member.linkedinUrl && (
                <div className="member-linkedin">
                    <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer">
                        <LinkedInIcon />
                    </a>
                </div>
            )}
        </div>
    );
};

export default TeamPage;

