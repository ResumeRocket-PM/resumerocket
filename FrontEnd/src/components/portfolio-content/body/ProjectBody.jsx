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
import ProjectColumns from '../project-sections/ProjectColumns';

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

    useEffect(() => {
        console.log(project);
    }, [project]);

    const renderSection = (section, index) => {
        switch (section.type) {
            case 'video':
                return <ProjectVideo key={index} project={project} setProject={setProject} content={section.content} sectionIndex={index} />;
            case 'text area':
                return <ProjectTextArea key={index} project={project} setProject={setProject} content={section.content} sectionIndex={index} />;
            case 'image and text':
                return <ProjectImageAndText key={index} project={project} setProject={setProject} content={section.content} sectionIndex={index} />;
            case 'image':
                return <ProjectImage key={index} project={project} setProject={setProject} content={section.content} sectionIndex={index} />;
            case 'gallery':
                return <ProjectGallery key={index} project={project} setProject={setProject} content={section.content} sectionIndex={index} />;
            case 'figma':
                return <ProjectFigma key={index} project={project} setProject={setProject} content={section.content} sectionIndex={index} />;
            case 'jupyter':
                return <ProjectJupyter key={index} project={project} setProject={setProject} content={section.content} sectionIndex={index} />;
            case 'google slides':
                return <ProjectGoogleSlides key={index} project={project} setProject={setProject} content={section.content} sectionIndex={index} />;
            case 'website preview':
                return <ProjectWebsitePreview key={index} project={project} setProject={setProject} content={section.content} sectionIndex={index} />;
            case 'columns':
                return <ProjectColumns key={index} project={project} setProject={setProject} content={section.content} sectionIndex={index} />;
            default:
                return null;
        }
    };


    return (
        <div id="portfolio-project-root">
            {project ? (
                <>
                    <ProjectAbout project={project} setProject={setProject} />
                    {project.sections.map((section, index) => renderSection(section, index))}
                </>

            ) : (
                <div>Error: Project not found</div>
            )}
        </div>
    );
};

export default ProjectBody;