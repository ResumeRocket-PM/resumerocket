import React, { useState, useEffect } from 'react';
import '../../../styles/ProjectBodyDefault.css';
import ProjectAbout from '../project-sections/ProjectAbout';
import ProjectVideo from '../project-sections/ProjectVideo';
import ProjectTextArea from '../project-sections/ProjectTextArea';
import ProjectImageAndText from '../project-sections/ProjectImageAndText';
import ProjectImage from '../project-sections/ProjectImage';
import ProjectGallery from '../project-sections/ProjectGallery';
import ProjectFigma from '../project-sections/ProjectFigma';
import ProjectJupyter from '../project-sections/ProjectJupyter';
import ProjectGoogleSlides from '../project-sections/ProjectGoogleSlides';
import ProjectWebsitePreview from '../project-sections/ProjectWebsitePreview';

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

    const renderSection = (section) => {
        switch (section.type) {
            case 'video':
                return <ProjectVideo key={section.type} project={project} setProject={setProject} content={section.content} />;
            case 'text area':
                return <ProjectTextArea key={section.type} project={project} setProject={setProject} content={section.content} />;
            case 'image and text':
                return <ProjectImageAndText key={section.type} project={project} setProject={setProject} content={section.content} />;
            case 'image':
                return <ProjectImage key={section.type} project={project} setProject={setProject} content={section.content} />;
            case 'gallery':
                return <ProjectGallery key={section.type} project={project} setProject={setProject} content={section.content} />;
            case 'figma':
                return <ProjectFigma key={section.type} project={project} setProject={setProject} content={section.content} />;
            case 'jupyter':
                return <ProjectJupyter key={section.type} project={project} setProject={setProject} content={section.content} />;
            case 'google slides':
                return <ProjectGoogleSlides key={section.type} project={project} setProject={setProject} content={section.content} />;
            case 'website preview':
                return <ProjectWebsitePreview key={section.type} project={project} setProject={setProject} content={section.content} />;
            default:
                return null;
        }
    };

    return (
        <div id="portfolio-project-root">
            {project ? (
                <>
                    <ProjectAbout project={project} setProject={setProject} />
                    {project.sections.map(renderSection)}                
                </>

            ) : (
                <div>Error: Project not found</div>
            )}
        </div>
    );
};

export default ProjectBody;