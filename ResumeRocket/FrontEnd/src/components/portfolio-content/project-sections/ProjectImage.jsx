import React from 'react';

const ProjectImage = ({ src, alt }) => {
    return (
        <div className="project-image">
            <img src={src} alt={alt} />
        </div>
    );
};

export default ProjectImage;