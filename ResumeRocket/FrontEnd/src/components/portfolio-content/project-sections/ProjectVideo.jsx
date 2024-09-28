import React from 'react';
import ProjectSectionWrapper from './ProjectSectionWrapper';

const ProjectVideo = ({ videoUrl, title }) => {
    return (
        <ProjectSectionWrapper id='project-video-root'>
            <div style={{width: "5rem", height: "5rem", backgroundColor: "lightblue"}} />
            <video width="600" controls>
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </ProjectSectionWrapper>
    );
};

export default ProjectVideo;