import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/events/';

const AdminDashboard = () => {
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        venue: '',
        description: '',
        society: 'General',
    });
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const { title, date, venue, description, society } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);

        const eventData = new FormData();
        eventData.append('title', title);
        eventData.append('date', date);
        eventData.append('venue', venue);
        eventData.append('description', description);
        eventData.append('society', society);
        if (file) {
            eventData.append('photo', file);
        }

        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${user.token}`,
                },
            };

            await axios.post(API_URL, eventData, config);
            setMessage('Event created successfully! Members have been notified.');
            // Reset form
            setFormData({ title: '', date: '', venue: '', description: '', society: 'General' });
            setFile(null);
            e.target.reset();

        } catch (err) {
            const errorMsg = (err.response && err.response.data && err.response.data.message) || 'Failed to create event.';
            setMessage(errorMsg);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div>
            <h1 className="page-title">Admin Dashboard</h1>
            <div className="card">
                <h2>Create New Event</h2>
                <p>This will create a new event and notify all student members via email.</p>
                <form onSubmit={onSubmit} style={{ marginTop: '1rem' }}>
                    <div className="form-group">
                        <label>Title</label>
                        <input type="text" name="title" value={title} onChange={onChange} required />
                    </div>
                    <div className="form-group">
                        <label>Date</label>
                        <input type="date" name="date" value={date} onChange={onChange} required />
                    </div>
                    <div className="form-group">
                        <label>Venue</label>
                        <input type="text" name="venue" value={venue} onChange={onChange} required />
                    </div>
                    <div className="form-group">
                        <label>Society</label>
                        <select name="society" value={society} onChange={onChange} required>
                            <option value="General">General</option>
                            <option value="Computer Society">Computer Society</option>
                            <option value="Communication Society">Communication Society</option>
                            <option value="WIE">WIE</option>
                            <option value="SIGHT">SIGHT</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea name="description" value={description} onChange={onChange} rows="4" required></textarea>
                    </div>
                    <div className="form-group">
                        <label>Event Photograph</label>
                        <input type="file" name="photo" onChange={onFileChange} accept="image/*" />
                    </div>
                    <button type="submit" className="btn" disabled={loading}>
                        {loading ? 'Creating...' : 'Create Event & Notify'}
                    </button>
                    {message && <p style={{ marginTop: '1rem', color: message.includes('successfully') ? 'green' : 'red' }}>{message}</p>}
                </form>
            </div>
        </div>
    );
};

export default AdminDashboard;
