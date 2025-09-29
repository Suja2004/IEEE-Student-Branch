import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'https://ieee-student-branch-backend.onrender.com/';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '', 
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { name, email, password, password2 } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        // 1. Check if passwords match
        if (password !== password2) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            // 2. Prepare user data to send to the backend
            const userData = {
                name,
                email,
                password,
            };

            // 3. Make the API call to the registration endpoint
            const response = await axios.post(`${API_URL}/api/users/register`, userData);

            // 4. Handle success
            if (response.data) {
                // Store user info and token in localStorage to keep them logged in
                localStorage.setItem('user', JSON.stringify(response.data));
                // Redirect to the homepage after successful registration
                navigate('/');
            }
        } catch (err) {
            // 5. Handle errors from the backend
            const message =
                (err.response && err.response.data && err.response.data.message) ||
                err.message ||
                err.toString();
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <h1 className="page-title">Register Account</h1>
            <p>Create an account to join the community</p>

            {error && <div className="error-banner">{error}</div>}

            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={onChange}
                        required
                        placeholder="Enter your full name"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        required
                        placeholder="Enter your email"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        required
                        minLength="6"
                        placeholder="Enter a password"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password2">Confirm Password</label>
                    <input
                        type="password"
                        id="password2"
                        name="password2"
                        value={password2}
                        onChange={onChange}
                        required
                        placeholder="Confirm your password"
                    />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>

        </div>
    );
};

export default RegisterPage;