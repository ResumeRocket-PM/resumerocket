import { useContext, useState } from 'react';
import ProjectSectionWrapper from '../ProjectSectionWrapper';
import { PortfolioEditContext } from '../../../context/PortfolioEditProvider';

const ProjectFigma = ({project, setProject, content, sectionIndex}) => {
    const { editMode } = useContext(PortfolioEditContext);


    return (
        <ProjectSectionWrapper project={project} setProject={setProject} sectionIndex={sectionIndex}>
            {editMode && (
                <iframe 
                    style={{ border: '1px solid rgba(0, 0, 0, 0.1)' }} 
                    width="800" 
                    height="450" 
                    src="https://embed.figma.com/proto/KHWoSzj5DmHxWzlI4g4m7K/RR_mockup?node-id=6-78&node-type=frame&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=6%3A78&embed-host=share" 
                    allowFullScreen
                ></iframe>
            )}
        </ProjectSectionWrapper>
    );
};

export default ProjectFigma;