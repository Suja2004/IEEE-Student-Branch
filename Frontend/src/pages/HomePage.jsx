import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const API_URL = 'https://ieee-student-branch-backend.onrender.com';

const HomePage = () => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [selectedSociety, setSelectedSociety] = useState('All');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const containerRef = useRef(null);
    const [isInView, setIsInView] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const societies = [
        { name: 'General', color: '#007BFF', icon: '🌐' },
        { name: 'Computer Society', color: '#1E90FF', icon: '💻' },
        { name: 'Communication Society', color: '#00BFFF', icon: '📡' },
        { name: 'WIE', color: '#6495ED', icon: '👩‍💻' },
        { name: 'SIGHT', color: '#4682B4', icon: '🌍' }
    ];


    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/events`);
                setEvents(response.data);
                setFilteredEvents(response.data);
            } catch (err) {
                setError('Failed to fetch events. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    setIsInView(entry.isIntersecting);
                });
            },
            { threshold: [0, 0.1, 0.5, 0.9, 1] }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (!isInView || !containerRef.current) return;

            const containerRect = containerRef.current.getBoundingClientRect();
            const containerHeight = containerRef.current.offsetHeight;
            const viewportHeight = window.innerHeight;

            const scrollTop = -containerRect.top;
            const scrollHeight = containerHeight - viewportHeight;

            const scrollProgress = Math.max(0, Math.min(1, scrollTop / scrollHeight));

            animateSocieties(scrollProgress);
        };

        if (isInView) {
            window.addEventListener('scroll', handleScroll);
            handleScroll();
        }

        return () => window.removeEventListener('scroll', handleScroll);
    }, [isInView]);

    const animateSocieties = (progress) => {
        const horizontalScroll = document.getElementById("horizontalScroll");
        if (!horizontalScroll) return;

        const maxTranslateX = -(horizontalScroll.scrollWidth - window.innerWidth);
        const translateX = progress * maxTranslateX;

        horizontalScroll.style.transform = `translateX(${translateX}px)`;
    };


    const handleSocietyClick = (societyName) => {
        setSelectedSociety(societyName);
        if (societyName === 'All') {
            setFilteredEvents(events);
        } else {
            setFilteredEvents(events.filter(event => event.society === societyName));
        }
        setIsModalOpen(true);
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', color: '#333' }}>
            <div style={{
                background: 'linear-gradient(135deg, #00629B 0%, #0071C5 100%)',
                color: 'white',
                textAlign: 'center',
                padding: '5rem 2rem',
                marginBottom: '0',
                width: '100%'
            }}>
                <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>
                    IEEE Student Branch SMVITM
                </h1>
                <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
                    Advancing Technology for Humanity
                </p>
            </div>

            <div style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
                <h2 style={{ fontSize: '2.5rem', color: '#00629B', marginBottom: '2rem', textAlign: 'center' }}>
                    About IEEE
                </h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem',
                    marginBottom: '3rem'
                }}>
                    <div style={{
                        padding: '2rem',
                        borderRadius: '8px',
                        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌍</div>
                        <h3 style={{ color: '#00629B', marginBottom: '1rem' }}>Global Network</h3>
                        <p>IEEE is the world's largest technical professional organization with over 420,000 members in 160+ countries.</p>
                    </div>
                    <div style={{
                        padding: '2rem',
                        borderRadius: '8px',
                        background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📚</div>
                        <h3 style={{ color: '#00629B', marginBottom: '1rem' }}>Knowledge Sharing</h3>
                        <p>Access to cutting-edge research, publications, and industry standards that shape technology worldwide.</p>
                    </div>
                    <div style={{
                        padding: '2rem',
                        borderRadius: '8px',
                        background: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚀</div>
                        <h3 style={{ color: '#00629B', marginBottom: '1rem' }}>Career Growth</h3>
                        <p>Professional development opportunities, networking events, and resources to advance your technical career.</p>
                    </div>
                </div>
            </div>

            {/* IEEE Societies Horizontal Scroll Section */}
            <div ref={containerRef} style={{
                height: '400vh',
                position: 'relative',
                background: '#2c3e50',
                marginBottom:'10px'
            }}>
                <div style={{
                    position: 'sticky',
                    top: 0,
                    height: '100vh',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <div style={{
                        display: 'flex',
                        height: '100vh',
                        minWidth: `${societies.length * 100}vw`,
                        willChange: 'transform',
                        transition: 'transform 0.1s ease-out'
                    }} id="horizontalScroll">
                        {societies.map((society) => (
                            <div
                                key={society.name}
                                className="society-text"
                                onClick={() => handleSocietyClick(society.name)}
                                style={{
                                    minWidth: '100vw',
                                    height: '100vh',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundImage: `linear-gradient(135deg, #3cf 0%, #b9d882ff 100%)`,
                                    color: 'white',
                                    cursor: 'pointer',
                                    userSelect: 'none',
                                    transition: 'transform 0.05s ease-out',
                                    backgroundAttachment: 'fixed'
                                }}
                            >
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>{society.icon}</div>
                                    <div style={{ fontSize: '3rem', fontWeight: 'bold' }}>{society.name}</div>
                                    <div style={{ fontSize: '1.2rem', marginTop: '1rem', opacity: 0.9 }}>Click to view events</div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            {isModalOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        background: 'white',
                        borderRadius: '12px',
                        padding: '2rem',
                        width: '80%',
                        maxHeight: '80%',
                        overflowY: 'auto',
                        position: 'relative'
                    }}>
                        {/* Close button */}
                        <button onClick={() => setIsModalOpen(false)} style={{
                            position: 'absolute',
                            top: '10px',
                            right: '15px',
                            fontSize: '1.5rem',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer'
                        }}>✖</button>

                        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#00629B', textAlign: 'center' }}>
                            {selectedSociety} Events
                        </h2>

                        {loading && <p style={{ textAlign: 'center' }}>Loading events...</p>}
                        {error && <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>}

                        {!loading && !error && (
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                                gap: '1.5rem'
                            }}>
                                {filteredEvents.length > 0 ? filteredEvents.map(event => (
                                    <div key={event._id} style={{
                                        borderRadius: '10px',
                                        overflow: 'hidden',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                        background: '#f9f9f9',
                                        transition: 'transform 0.3s ease',
                                        cursor: 'pointer'
                                    }}
                                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                    >
                                        <img
                                            src={`${API_URL}${event.photo}`}
                                            alt={event.title}
                                            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                        />
                                        <div style={{ padding: '1rem' }}>
                                            <h3 style={{ margin: '0.5rem 0', color: '#00629B' }}>{event.title}</h3>
                                            <p style={{ margin: '0.2rem 0', fontSize: '0.9rem' }}>
                                                <strong>📅</strong> {new Date(event.date).toLocaleDateString()}
                                            </p>
                                            <p style={{ margin: '0.2rem 0', fontSize: '0.9rem' }}>
                                                <strong>📍</strong> {event.venue}
                                            </p>
                                            <p style={{ margin: '0.2rem 0', fontSize: '0.9rem' }}>
                                                <strong>🏛️</strong> {event.society}
                                            </p>
                                        </div>
                                    </div>
                                )) : (
                                    <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#666' }}>
                                        No events for {selectedSociety}.
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}


            {/* Footer */}
            <div style={{
                background: 'linear-gradient(135deg, #7f183b 0%, #f8ebd7 100%)',
                color: 'white',
                padding: '3rem 2rem',
                textAlign: 'center'
            }}>
                <h3 style={{ marginBottom: '1rem' }}>Join IEEE SMVITM</h3>
                <p style={{ marginBottom: '2rem' }}>Be part of the world's largest technical professional organization</p>
            </div>
        </div>
    );
};

export default HomePage;