import React from 'react';

const Footer = () => {
    const footerStyle = {
        backgroundColor: '#3163bfff',
        color: 'white',
        textAlign: 'center',
        padding: '2rem 1rem',
        marginTop: 'auto',
    };

    return (
        <footer style={footerStyle}>
            <p>&copy; {new Date().getFullYear()} IEEE Student Branch SMVITM. All Rights Reserved.</p>
        </footer>
    );
};

export default Footer;
