import React, { useState, useEffect } from 'react';
import '../../../styles/ProjectBodyDefault.css';
import ProjectAbout from '../project-sections/ProjectAbout';

const ProjectBody = ({editMode, portfolioContent, setPortfolioContent, projectNum}) => {

    // either pass in the project name or the project id
    // idk you'll probs have to manage this from both the navbar and the left menu... 

    const [project, setProject] = useState(portfolioContent.pages.projects.projectsData[projectNum]);

    useEffect(() => {
        setProject(portfolioContent.pages.projects.projectsData[projectNum]);
    }, [portfolioContent, projectNum]);

    // whenver the project is updated, update the project in the portfolioContent
    useEffect(() => {
        setPortfolioContent({
            ...portfolioContent,
            pages: {
                ...portfolioContent.pages,
                projects: {
                    ...portfolioContent.pages.projects,
                    projectsData: [
                        ...portfolioContent.pages.projects.projectsData.slice(0, projectNum),
                        project,
                        ...portfolioContent.pages.projects.projectsData.slice(projectNum + 1)
                    ]
                }
            }
        });
    }, [project]);

    
    return (
        <div id="portfolio-project-root">
            {project ? (
                <ProjectAbout project={project} setProject={setProject} />
            ) : (
                <div>Error: Project not found</div>
            )}
        </div>
    );
};

export default ProjectBody;