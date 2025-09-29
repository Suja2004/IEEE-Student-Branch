import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    setError('');

    if (password !== password2) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const userData = { name, email, password };
      const response = await axios.post(`${API_URL}/api/users/register`, userData);
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
        navigate('/');
      }
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const containerStyle = {
    maxWidth: '450px',
    margin: '10px auto',
    padding: '2rem',
    background: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    overflowY: 'auto',
    maxHeight: '100vh',
    fontFamily: 'Poppins, sans-serif',
  };

  const titleStyle = {
    fontSize: '2rem',
    color: '#0071C5',
    marginBottom: '0.5rem',
    textAlign: 'center',
  };

  const pStyle = {
    textAlign: 'center',
    color: '#555',
    marginBottom: '2rem',
  };

  const formGroup = {
    marginBottom: '1.5rem',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: '500',
    color: '#333',
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border 0.2s',
  };

  const inputFocus = {
    borderColor: '#0071C5',
  };

  const buttonStyle = {
    width: '100%',
    padding: '0.75rem',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: loading ? '#7aaedc' : '#0071C5',
    color: 'white',
    fontSize: '1rem',
    cursor: loading ? 'not-allowed' : 'pointer',
    transition: 'background 0.3s',
  };

  const errorStyle = {
    background: '#ffe6e6',
    color: '#cc0000',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    marginBottom: '1rem',
    textAlign: 'center',
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Register Account</h1>
      <p style={pStyle}>Create an account to join the community</p>

      {error && <div style={errorStyle}>{error}</div>}

      <form onSubmit={onSubmit}>
        <div style={formGroup}>
          <label htmlFor="name" style={labelStyle}>Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={onChange}
            required
            placeholder="Enter your full name"
            style={inputStyle}
          />
        </div>

        <div style={formGroup}>
          <label htmlFor="email" style={labelStyle}>Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            required
            placeholder="Enter your email"
            style={inputStyle}
          />
        </div>

        <div style={formGroup}>
          <label htmlFor="password" style={labelStyle}>Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            minLength="6"
            placeholder="Enter a password"
            style={inputStyle}
          />
        </div>

        <div style={formGroup}>
          <label htmlFor="password2" style={labelStyle}>Confirm Password</label>
          <input
            type="password"
            id="password2"
            name="password2"
            value={password2}
            onChange={onChange}
            required
            placeholder="Confirm your password"
            style={inputStyle}
          />
        </div>

        <button type="submit" style={buttonStyle} disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
