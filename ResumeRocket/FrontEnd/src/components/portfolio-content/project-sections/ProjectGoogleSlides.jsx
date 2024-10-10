import { useContext, useState } from 'react';
import ProjectSectionWrapper from '../ProjectSectionWrapper';
import { PortfolioEditContext } from '../../../context/PortfolioEditProvider';


const ProjectGoogleSlides = ({project, setProject, content, sectionIndex}) => {
    const { editMode } = useContext(PortfolioEditContext);


    return (
        <ProjectSectionWrapper project={project} setProject={setProject} sectionIndex={sectionIndex}>
            {editMode && (
                <iframe 
                    src="https://docs.google.com/presentation/d/e/2PACX-1vTUjlNdDeM7_GrCrByUsboznGDntTN1xyiuA1YhLndg2COOeb7yVX0dZyQAEheqrq4Why4BshpF2tWr/embed?start=false&loop=false&delayms=3000" 
                    frameBorder="0" 
                    width="960" 
                    height="569" 
                    allowFullScreen={true} 
                    mozallowfullscreen="true" 
                    webkitallowfullscreen="true"
                ></iframe>
            )}
        </ProjectSectionWrapper>
    );
};

export default ProjectGoogleSlides;