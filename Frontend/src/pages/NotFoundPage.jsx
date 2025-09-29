import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    const style = {
        textAlign: 'center',
        padding: '50px 20px'
    };
    return (
        <div style={style}>
            <h1 className="page-title">404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <Link to="/" className="btn" style={{marginTop: '20px'}}>Go to Homepage</Link>
        </div>
    );
};

export default NotFoundPage;
