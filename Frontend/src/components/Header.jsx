import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    // In a real app, you'd use a state management library (like Redux or Context)
    // to check auth state globally. For now, we'll check localStorage.
    const user = JSON.parse(localStorage.getItem('user'));

    const onLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    const headerStyle = {
        backgroundColor: 'white',
        padding: '1rem 5%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid var(--border-color)',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    };

    const logoStyle = {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: 'var(--ieee-blue)',
        textDecoration: 'none',
    };

    const navStyle = {
        display: 'flex',
        gap: '1.5rem',
    };

    const navLinkStyle = {
        textDecoration: 'none',
        color: 'var(--text-dark)',
        fontWeight: '500',
    };

    return (
        <header style={headerStyle}>
            <Link to="/" style={logoStyle}>IEEE SMVITM</Link>
            <nav style={navStyle}>
                <Link to="/" style={navLinkStyle}>Home</Link>
                <Link to="/about" style={navLinkStyle}>About</Link>
                <Link to="/team" style={navLinkStyle}>Team</Link>
                <Link to="/achievements" style={navLinkStyle}>Achievements</Link>
                <Link to="/publications" style={navLinkStyle}>Publications</Link>
            </nav>
            <div>
                {user && user.role === 'officer' ? (
                    <>
                        <Link to="/admin" className="btn" style={{ marginRight: '10px' }}>Dashboard</Link>
                        <button onClick={onLogout} className="btn btn-danger">Logout</button>
                    </>
                ) : (
                    <Link to="/login" className="btn">Officer Login</Link>
                )}
            </div>
        </header>
    );
};

export default Header;
