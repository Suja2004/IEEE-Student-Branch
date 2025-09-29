import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'https://ieee-student-branch-backend.onrender.com/api/events/';

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

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onFileChange = (e) => setFile(e.target.files[0]);

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
        if (file) eventData.append('photo', file);

        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const config = {
                headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${user.token}` },
            };

            await axios.post(API_URL, eventData, config);
            setMessage('Event created successfully! Members have been notified.');
            setFormData({ title: '', date: '', venue: '', description: '', society: 'General' });
            setFile(null);
            e.target.reset();
        } catch (err) {
            const errorMsg = (err.response?.data?.message) || 'Failed to create event.';
            setMessage(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <style>{`
        .admin-container {
          max-width: 800px;
          margin: 2rem auto;
          padding: 0 1rem;
        }

        .page-title {
          text-align: center;
          font-size: 2.5rem;
          color: #0056a2;
          font-weight: 700;
          margin-bottom: 2rem;
        }

        .card {
          background: #fff;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.12);
        }

        .card h2 {
          margin-bottom: 1rem;
          color: #0056a2;
        }

        .form-group {
          margin-bottom: 1.5rem;
          display: flex;
          flex-direction: column;
        }

        label {
          margin-bottom: 0.5rem;
          font-weight: 500;
        }

        input, select, textarea {
          padding: 0.75rem 1rem;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 1rem;
          outline: none;
          transition: border 0.2s ease, box-shadow 0.2s ease;
        }

        input:focus, select:focus, textarea:focus {
          border-color: #0056a2;
          box-shadow: 0 0 5px rgba(0, 86, 162, 0.3);
        }

        .btn {
          padding: 0.8rem 1.5rem;
          background-color: #0056a2;
          color: #fff;
          font-size: 1rem;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .btn:hover {
          background-color: #003f7f;
        }

        .message {
          margin-top: 1rem;
          font-weight: 500;
        }
      `}</style>

            <div className="admin-container">
                <h1 className="page-title">Admin Dashboard</h1>
                <div className="card">
                    <h2>Create New Event</h2>
                    <p>This will create a new event and notify all student members via email.</p>
                    <form onSubmit={onSubmit}>
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

                        {message && (
                            <p
                                className="message"
                                style={{ color: message.includes('successfully') ? 'green' : 'red' }}
                            >
                                {message}
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;
