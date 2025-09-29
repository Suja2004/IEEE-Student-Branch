import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation(); // Hook to detect route changes

    // We use a state for the user to make the component re-render on login/logout
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    // This effect ensures the header updates when the user navigates or the user logs in/out
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')));
        setIsMenuOpen(false); // Close mobile menu on page change
    }, [location]);
    
    // A simple event listener can also help sync state across tabs, though not strictly necessary here.
    useEffect(() => {
        const handleStorageChange = () => {
            setUser(JSON.parse(localStorage.getItem('user')));
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);


    const onLogout = () => {
        localStorage.removeItem('user');
        setUser(null); // Update state to re-render the header
        navigate('/login');
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // CSS for responsiveness is included directly in the component
    const styles = `
        .header {
            background-color: white;
            padding: 1rem 5%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid var(--border-color);
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
            position: fixed; 
            width:100%;
            z-index:100;
        }
        .logo {
            font-size: 1.5rem;
            font-weight: bold;
            color: var(--ieee-blue);
            text-decoration: none;
            z-index: 101; /* Ensure logo is above mobile nav */
        }
        .desktop-nav {
            display: flex;
            gap: 1.5rem;
        }
        .desktop-nav a {
            text-decoration: none;
            color: var(--text-dark);
            font-weight: 500;
            position: relative;
            padding-bottom: 5px;
        }
        .desktop-nav a::after {
            content: '';
            position: absolute;
            width: 0;
            height: 2px;
            bottom: 0;
            left: 0;
            background-color: var(--ieee-blue);
            transition: width 0.3s ease;
        }
        .desktop-nav a:hover::after {
            width: 100%;
        }

        .hamburger-menu {
            display: none; /* Hidden on desktop */
            flex-direction: column;
            justify-content: space-around;
            width: 2rem;
            height: 2rem;
            background: transparent;
            border: none;
            cursor: pointer;
            padding: 0;
            z-index: 101;
        }
        .hamburger-menu div {
            width: 2rem;
            height: 0.25rem;
            background: var(--ieee-blue);
            border-radius: 10px;
            transition: all 0.3s linear;
            position: relative;
            transform-origin: 1px;
        }

        .mobile-nav {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 2rem;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(5px);
            height: 100vh;
            width: 100%;
            text-align: left;
            padding: 2rem;
            position: fixed;
            top: 0;
            margin-top:50px;
            left: 0;
            transition: transform 0.3s ease-in-out;
            transform: translateX(100%);
            z-index: 100;
        }
        .mobile-nav.open {
            transform: translateX(0);
        }
        .mobile-nav a {
            font-size: 1.5rem;
            text-transform: uppercase;
            font-weight: bold;
            color: var(--ieee-blue);
            text-decoration: none;
        }

        /* Styles for when the mobile menu is open */
        .hamburger-menu.open div:nth-child(1) {
            transform: rotate(45deg);
        }
        .hamburger-menu.open div:nth-child(2) {
            opacity: 0;
            transform: translateX(20px);
        }
        .hamburger-menu.open div:nth-child(3) {
            transform: rotate(-45deg);
        }


        @media (max-width: 768px) {
            .desktop-nav, .header-auth-buttons .btn {
                display: none;
            }
            .hamburger-menu {
                display: flex;
            }
            .header-auth-buttons {
                display: none; /* Hide desktop auth buttons */
            }
        }
    `;

    return (
        <>
            <style>{styles}</style>
            <header className="header">
                <Link to="/" className="logo">IEEE SMVITM</Link>
                
                {/* Desktop Navigation */}
                <nav className="desktop-nav">
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/team">Team</Link>
                    <Link to="/achievements">Achievements</Link>
                    <Link to="/publications">Publications</Link>
                </nav>
                <div className="header-auth-buttons">
                    {user && user.role === 'officer' ? (
                        <>
                            <Link to="/admin" className="btn" style={{ marginRight: '10px' }}>Dashboard</Link>
                            <button onClick={onLogout} className="btn btn-danger">Logout</button>
                        </>
                    ) : (
                        <Link to="/login" className="btn">Officer Login</Link>
                    )}
                </div>

                {/* Hamburger Menu Icon */}
                <button className={`hamburger-menu ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu} aria-label="Toggle menu">
                    <div />
                    <div />
                    <div />
                </button>
            </header>

            {/* Mobile Navigation Menu */}
            <nav className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
                <Link to="/" onClick={toggleMenu}>Home</Link>
                <Link to="/about" onClick={toggleMenu}>About</Link>
                <Link to="/team" onClick={toggleMenu}>Team</Link>
                <Link to="/achievements" onClick={toggleMenu}>Achievements</Link>
                <Link to="/publications" onClick={toggleMenu}>Publications</Link>
                <hr style={{width: '80%', border: '1px solid #ddd'}} />
                {user && user.role === 'officer' ? (
                    <>
                        <Link to="/admin" onClick={toggleMenu}>Dashboard</Link>
                        <button onClick={() => { onLogout(); toggleMenu(); }} className="btn btn-danger">Logout</button>
                    </>
                ) : (
                    <Link to="/login" className="btn" onClick={toggleMenu}>Officer Login</Link>
                )}
            </nav>
        </>
    );
};

export default Header;

