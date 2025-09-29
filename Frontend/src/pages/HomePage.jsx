import React, { useState, useEffect } from 'react';
import axios from 'axios';

// IMPORTANT: Replace with your actual backend URL in production
const API_URL = 'https://ieee-student-branch-backend.onrender.com';

const HomePage = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/events`);
                setEvents(response.data);
            } catch (err) {
                setError('Failed to fetch events. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const heroStyle = {
        textAlign: 'center',
        padding: '4rem 1rem',
        backgroundColor: 'var(--ieee-grey)',
        borderRadius: '8px',
        marginBottom: '2rem',
    };

    const eventsGrid = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem',
    };

    const eventImage = {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
    };

    if (loading) return <p>Loading events...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <div style={heroStyle}>
                <h1 style={{ fontSize: '3rem', color: 'var(--ieee-blue)' }}>Welcome to IEEE SMVITM</h1>
                <p>Advancing Technology for Humanity at SMVITM.</p>
            </div>

            <h2 className="page-title">Our Events</h2>
            <div style={eventsGrid}>
                {events.length > 0 ? events.map(event => (
                    <div key={event._id} className="card" style={{ padding: 0 }}>
                        <img src={`${API_URL}${event.photo}`} alt={event.title} style={eventImage} />
                        <div style={{ padding: '1rem' }}>
                            <h3>{event.title}</h3>
                            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                            <p><strong>Venue:</strong> {event.venue}</p>
                            <p><strong>Society:</strong> {event.society}</p>
                            <p style={{ marginTop: '0.5rem' }}>{event.description}</p>
                        </div>
                    </div>
                )) : <p>No events scheduled at the moment. Check back soon!</p>}
            </div>
        </div>
    );
};

export default HomePage;
