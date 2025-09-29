import React from 'react';

const AboutPage = () => {
    return (
        <div>
            <h1 className="page-title">About IEEE SMVITM</h1>
            <div className="card">
                <p>
                    The IEEE (Institute of Electrical and Electronics Engineers) Student Branch at Shri Madhwa Vadiraja Institute of Technology and Management (SMVITM), Bantakal, is a dynamic community of students dedicated to fostering technological innovation and professional development.
                </p>
                <p style={{ marginTop: '1rem' }}>
                    Our mission is to provide students with opportunities to learn beyond the curriculum, engage with industry professionals, and work on impactful projects. We organize a wide range of activities, including workshops, seminars, hackathons, and industrial visits.
                </p>
            </div>
            <div className="card">
                <h3>Our Societies</h3>
                <ul>
                    <li><strong>Computer Society:</strong> Focuses on the theory and practice of computing.</li>
                    <li><strong>Communication Society:</strong> Promotes technological innovation in communications.</li>
                    <li><strong>Women in Engineering (WIE):</strong> Dedicated to promoting women engineers and scientists.</li>
                    <li><strong>SIGHT (Special Interest Group on Humanitarian Technology):</strong> Using technology for social good.</li>
                </ul>
            </div>
        </div>
    );
};

export default AboutPage;
