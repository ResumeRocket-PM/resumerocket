import React, { useState, useEffect } from 'react';
import '../../../styles/ProjectBodyDefault.css';
import PortfolioNavbar from '../PortfolioNavbar';

const ProjectBody = ({editMode, portfolioContent, setPortfolioContent, projectNum}) => {

    // either pass in the project name or the project id
    // idk you'll probs have to manage this from both the navbar and the left menu... 

    const [project, setProject] = useState(portfolioContent.pages.projects.projectsData[projectNum]);

    useEffect(() => {
        setProject(portfolioContent.pages.projects.projectsData[projectNum]);
    }, [portfolioContent, projectNum]);

    
    return (
        <div id="portfolio-project-root">
            <PortfolioNavbar portfolioContent={portfolioContent}/>
            <h1>Project Title: {project.name}</h1>
            <p>Description {project.description}</p>

            {project.image && <img src={project.image} alt="Project Image" />}
            {project.video && <video src={project.video} controls />}
            {project.projectLink && <a href={project.projectLink}>Project Link</a>}
            {project.githubLink && <a href={project.githubLink}>GitHub Link</a>}

            {project.technologies && project.technologies.length > 0 && (
                <ul>
                    {project.technologies.map((tech, index) => (
                        <li key={index}>{tech}</li>
                    ))}
                </ul>
            )}

            {project.features && project.features.length > 0 && (
                <ul>
                    {project.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                    ))}
                </ul>
            )}

        </div>
    );
};

export default ProjectBody;