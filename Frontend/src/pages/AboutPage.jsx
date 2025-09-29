import React from "react";

const AboutPage = () => {
  return (
    <>
      <style>{`
        .about-container {
          padding: 2rem;
          max-width: 900px;
          margin: 0 auto;
        }

        .page-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--ieee-blue, #0056a2);
          text-align: center;
          margin-bottom: 2rem;
          position: relative;
        }

        .page-title::after {
          content: "";
          display: block;
          width: 60px;
          height: 4px;
          background: var(--ieee-blue, #0056a2);
          margin: 0.5rem auto 0;
          border-radius: 2px;
        }

        .card {
          background: #fff;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          margin-bottom: 2rem;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.12);
        }

        .card h3 {
          color: var(--ieee-blue, #0056a2);
          margin-bottom: 1rem;
        }

        .card p {
          line-height: 1.6;
          color: #444;
        }

        ul {
          padding-left: 1.2rem;
        }

        li {
          margin-bottom: 0.8rem;
          line-height: 1.5;
          color: #333;
        }

        li strong {
          color: var(--ieee-blue, #0056a2);
        }

        /* Subtle fade-in animation */
        .fade-in {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.8s ease forwards;
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="about-container">
        <h1 className="page-title fade-in">About IEEE SMVITM</h1>

        <div className="card fade-in" style={{ animationDelay: "0.1s" }}>
          <p>
            The IEEE (Institute of Electrical and Electronics Engineers) Student Branch at Shri Madhwa Vadiraja Institute of Technology and Management (SMVITM), Bantakal, is a dynamic community of students dedicated to fostering technological innovation and professional development.
          </p>
          <p style={{ marginTop: "1rem" }}>
            Our mission is to provide students with opportunities to learn beyond the curriculum, engage with industry professionals, and work on impactful projects. We organize a wide range of activities, including workshops, seminars, hackathons, and industrial visits.
          </p>
        </div>

        <div className="card fade-in" style={{ animationDelay: "0.3s" }}>
          <h3>Our Societies</h3>
          <ul>
            <li><strong>Computer Society:</strong> Focuses on the theory and practice of computing.</li>
            <li><strong>Communication Society:</strong> Promotes technological innovation in communications.</li>
            <li><strong>Women in Engineering (WIE):</strong> Dedicated to promoting women engineers and scientists.</li>
            <li><strong>SIGHT:</strong> Using technology for social good.</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
