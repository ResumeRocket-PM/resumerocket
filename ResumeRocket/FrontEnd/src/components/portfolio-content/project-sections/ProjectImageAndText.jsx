import React from 'react';
import PropTypes from 'prop-types';
// import './ProjectImageAndText.css'; // Assuming you have a CSS file for styling

const ProjectImageAndText = ({ imageSrc, title, description }) => {
    return (
        <div className="project-image-and-text">
            <img src={imageSrc} alt={title} className="project-image" />
            <div className="project-text">
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
        </div>
    );
};

ProjectImageAndText.propTypes = {
    imageSrc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export default ProjectImageAndText;