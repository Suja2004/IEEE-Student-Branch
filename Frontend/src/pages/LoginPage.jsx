import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api/users/';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { email, password } = formData;
    const navigate = useNavigate();

    // Redirect if already logged in
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.token) {
            navigate('/admin');
        }
    }, [navigate]);


    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post(API_URL + 'login', formData);

            if (response.data && response.data.role === 'officer') {
                localStorage.setItem('user', JSON.stringify(response.data));
                navigate('/admin');
            } else {
                setError('Access denied. Only branch officers can log in.');
            }
        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1 className="page-title">Officer Login</h1>
            <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" value={email} onChange={onChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" value={password} onChange={onChange} required />
                    </div>
                    {error && <p style={{ color: 'var(--error-red)', marginBottom: '1rem' }}>{error}</p>}
                    <button type="submit" className="btn" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
