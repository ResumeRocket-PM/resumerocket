import React from 'react';
import ProjectSectionWrapper from '../ProjectSectionWrapper';



const ProjectVideo = ({ project, setProject, content, sectionIndex }) => {
    return (
        // <ProjectSectionWrapper 
        //     project={project} 
        //     setProject={setProject}
        //     sectionIndex={sectionIndex}
        // >
        <>
            <iframe 
                width="560" 
                height="315" 
                src={content}
                // src='https://www.youtube.com/embed/moN5-_tbkcY?si=3MAWo26eOcP6tyte'
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin"
                allowfullscreen>
            </iframe>        
        </>

        // </ProjectSectionWrapper>
    );
};

export default ProjectVideo;