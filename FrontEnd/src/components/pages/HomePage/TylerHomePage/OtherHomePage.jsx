import React, { useState, useEffect, useRef } from 'react';
import OfficeImage from '../../../assets/About/aboutus1.png';

// Import team member images
import TylerImage from '../../../assets/About/tyler.png';
import AustinImage from '../../../assets/About/austin.png';
import YinghuaImage from '../../../assets/About/yinghua.png';
import NathanImage from '../../../assets/About/nathan.png';

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true); // Element is visible
          observer.disconnect(); // Stop observing after fading in
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect(); // Cleanup
    };
  }, []);

  return (
    <div style={styles.container}>
      <div
        ref={containerRef}
        style={{
          ...styles.imageContainer,
          ...(isVisible ? styles.imageVisible : {}),
        }}
      >
        <img src={OfficeImage} alt="Office" style={styles.image} />
        <div
          style={{
            ...styles.textBox,
            ...(isVisible ? styles.textBoxVisible : {}),
          }}
        >
          <h1 style={styles.heading}>About Us</h1>
          <div style={styles.blueBar}></div>
          <p style={styles.text}>
            Empowering job seekers with tools to craft tailored resumes, build standout portfolios, and expand professional networks!
          </p>
        </div>

        {/* The Team Section */}
        <div
          style={{
            ...styles.textCard,
            ...(isVisible ? styles.textCardVisible : {}),
          }}
        >
          <h2 style={styles.teamHeading}>The Team</h2>
          <div style={styles.teamGrid}>
            {teamMembers.map((member, index) => (
              <div key={index} style={styles.teamCard}>
                <img
                  src={member.image}
                  alt={member.name}
                  style={styles.teamImage}
                />
                <h3 style={styles.teamMemberName}>{member.name}</h3>
                <p style={styles.teamBio}>{member.bio}</p>
                <a href={member.linkedin} style={styles.teamLinkedIn}>
                  LinkedIn
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const teamMembers = [
  {
    name: 'Tyler DeBruin',
    image: TylerImage,
    bio: 'Tyler is a software engineer with a passion for creating intuitive user experiences and innovative solutions.',
    linkedin: 'https://www.linkedin.com/in/tyler-debruin/',
    contactEmail: ''
  },
  {
    name: 'Austin Godfrey',
    image: AustinImage,
    bio: 'Austin is a full-stack developer who enjoys solving complex technical challenges and working on cutting-edge projects.',
    linkedin: 'https://www.linkedin.com/in/austin-godfrey/',
    contactEmail: ''
  },
  {
    name: 'Yinghua Yin',
    image: YinghuaImage,
    bio: 'Yinghua is a data scientist with expertise in machine learning and AI, helping businesses make data-driven decisions.',
    linkedin: 'https://www.linkedin.com/in/yinghua-yin/',
    contactEmail: ''
  },
  {
    name: 'Nathan Weston',
    image: NathanImage,
    bio: 'Nathan is a UX/UI designer who focuses on creating seamless and user-friendly interfaces that elevate the user experience.',
    linkedin: 'https://www.linkedin.com/in/nathan-weston/',
    contactEmail: ''
  },
];

const styles = {
  container: {
    width: '100%',
    height: '100vh',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center', // Center content horizontally
  },
  imageContainer: {
    position: 'relative',
    width: '70%',
    height: '40%',
    opacity: 0, // Start hidden
    transform: 'translateY(20px)', // Start with a slight downward offset
    transition: 'opacity 1s ease, transform 1s ease', // Smooth animation
  },
  imageVisible: {
    opacity: 1, // Fade in
    transform: 'translateY(0)', // Reset position
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'relative',
    margin: '0 auto',
    display: 'block',
  },
  textBox: {
    position: 'absolute',
    top: '10%',
    left: '20%',
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    maxWidth: '400px',
    opacity: 0, // Start hidden
    transform: 'translateY(20px)', // Downward offset
    transition: 'opacity 1s ease, transform 1s ease', // Smooth animation
  },
  textBoxVisible: {
    opacity: 1, // Fade in
    transform: 'translateY(0)', // Reset position
  },
  blueBar: {
    width: '60px',
    height: '2px',
    backgroundColor: 'blue',
    margin: '10px 10px',
  },
  textCard: {
    marginTop: '50px', // Space from the top section
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    opacity: 0, // Start hidden
    transform: 'translateY(20px)', // Downward offset
    transition: 'opacity 1s ease, transform 1s ease', // Smooth animation
    textAlign: 'center',
  },
  textCardVisible: {
    opacity: 1, // Fade in
    transform: 'translateY(0)', // Reset position
  },
  tutorialHeading: {
    fontSize: '1.5rem',
    marginBottom: '10px',
    fontFamily: 'Arial, sans-serif',
  },
  tutorialContent: {
    fontSize: '1rem',
    lineHeight: '1.6',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
  },
  teamHeading: {
    fontSize: '1.8rem',
    marginBottom: '10px',
    fontFamily: 'Arial, sans-serif',
  },
  teamGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
    marginTop: '20px',
  },
  teamCard: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  teamImage: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    marginBottom: '10px',
  },
  teamMemberName: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  teamBio: {
    fontSize: '1rem',
    lineHeight: '1.6',
    color: '#333',
    marginBottom: '10px',
  },
  teamLinkedIn: {
    fontSize: '1rem',
    color: '#0077b5',
    textDecoration: 'none',
  },
};

export default HomePage;