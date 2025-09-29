import React from "react";

// --- MOCK DATA ---
const MOCK_PUBLICATIONS = [
    {
        _id: "pub1",
        title: "A Novel Approach to Enhance IoT Security using Blockchain",
        authors: "Priya Singh, Rohan Sharma, et al.",
        conference: "IEEE INDICON 2024",
        publicationLink: "#",
    },
    {
        _id: "pub2",
        title: "Machine Learning Models for Predictive Maintenance in Industrial Machinery",
        authors: "Amit Kumar, et al.",
        conference: "IEEE TENCON 2024",
        publicationLink: "#",
    },
    {
        _id: "pub3",
        title: "Advancements in 5G Network Slicing for Critical Communications",
        authors: "Anjali Reddy, Sneha Gupta, et al.",
        conference: "IEEE ANTS 2023",
        publicationLink: "#",
    },
    {
        _id: "pub4",
        title: "Developing Humanitarian Technologies for Rural Education",
        authors: "Sanjay Joshi, Divya Nair, et al.",
        conference: "IEEE GHTC 2023",
        publicationLink: "#",
    },
];

// SVG Icon
const LinkIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path>
    </svg>
);

const PublicationsPage = () => {
    return (
        <div>
            <style>{`
        @import url("https://fonts.cdnfonts.com/css/ica-rubrik-black");
        @import url("https://fonts.cdnfonts.com/css/poppins");

        body { margin: 0; overflow: hidden; }

        .banner {
          width: 100%;
          height: 90vh;
          text-align: center;
          overflow: hidden;
          position: relative;
          background: #f5f7fa;
        }

        .banner .slider {
          position: absolute;
          width: 300px;
          height: 250px;
          top: 15%;
          left: calc(50% - 150px);
          transform-style: preserve-3d;
          transform: perspective(1200px);
          animation: autoRun 20s linear infinite;
          z-index: 2;
        }

        .banner .slider .item {
          position: absolute;
          inset: 0;
          background: #fff;
          padding: 1rem;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          transform: rotateY(calc((var(--position) - 1) * (360 / var(--quantity)) * 1deg)) translateZ(500px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .banner .slider:hover {
            animation-play-state: paused;
        }

        .pub-title {
          font-size: 1rem;
          font-weight: bold;
          color: #00629B;
          margin-bottom: 0.5rem;
        }
        .pub-authors {
          font-size: 0.8rem;
          color: #555;
          font-style: italic;
          margin-bottom: 0.3rem;
        }
        .pub-conference {
          font-size: 0.85rem;
          font-weight: 500;
          margin-bottom: 0.5rem;
        }
        .pub-link {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.8rem;
          color: #00629B;
          text-decoration: none;
        }
        .pub-link:hover { text-decoration: underline; }

        @keyframes autoRun {
          from { transform: perspective(1000px) rotateX(-14deg) rotateY(0deg); }
          to { transform: perspective(1000px) rotateX(-14deg) rotateY(360deg); }
        }

        .banner .content {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: min(1200px, 100vw);
          text-align: center;
        }

        .banner .content h1 {
          font-family: "ICA Rubrik";
          font-size: 6em;
          color: #25283b;
          position: relative;
        }
        .banner .content h1::after {
          position: absolute;
          inset: 0;
          content: attr(data-content);
          -webkit-text-stroke: 2px #d2d2d2;
          color: transparent;
        }
      `}</style>

            <div className="banner">
                <div
                    className="slider"
                    style={{ "--quantity": MOCK_PUBLICATIONS.length }}
                >
                    {MOCK_PUBLICATIONS.map((pub, idx) => (
                        <div
                            key={pub._id}
                            className="item"
                            style={{ "--position": idx + 1 }}
                        >
                            <h3 className="pub-title">{pub.title}</h3>
                            <p className="pub-authors">{pub.authors}</p>
                            <p className="pub-conference">{pub.conference}</p>
                            <a
                                href={pub.publicationLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="pub-link"
                            >
                                <LinkIcon /> View
                            </a>
                        </div>
                    ))}
                </div>

                <div className="content">
                    <h1 data-content="Publications">Publications</h1>
                </div>
            </div>
        </div>
    );
};

export default PublicationsPage;
