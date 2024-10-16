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
import ProjectSectionWrapper from '../ProjectSectionWrapper';

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
        // //convert section.styles to json
        // if (section.styles === undefined) {
        //     section.styles = {};
        // }
        // if (typeof section.styles === 'string') {
        //     section.styles = JSON.parse(section.styles);
        // }

        const sectionContent = () => {
            switch (section.type) {
                case 'video':
                    return <ProjectVideo project={project} setProject={setProject} content={section.content} sectionIndex={index} styles={section.styles} />;
                case 'text area':
                    return <ProjectTextArea project={project} setProject={setProject} content={section.content} sectionIndex={index} styles={section.styles} />;
                case 'image and text':
                    return <ProjectImageAndText project={project} setProject={setProject} content={section.content} sectionIndex={index} styles={section.styles} />;
                case 'image':
                    return <ProjectImage project={project} setProject={setProject} content={section.content} sectionIndex={index} styles={section.styles} />;
                case 'gallery':
                    return <ProjectGallery project={project} setProject={setProject} content={section.content} sectionIndex={index} styles={section.styles} />;
                case 'figma':
                    return <ProjectFigma project={project} setProject={setProject} content={section.content} sectionIndex={index} styles={section.styles} />;
                case 'jupyter':
                    return <ProjectJupyter project={project} setProject={setProject} content={section.content} sectionIndex={index} styles={section.styles} />;
                case 'google slides':
                    return <ProjectGoogleSlides project={project} setProject={setProject} content={section.content} sectionIndex={index} styles={section.styles} />;
                case 'website preview':
                    return <ProjectWebsitePreview project={project} setProject={setProject} content={section.content} sectionIndex={index} styles={section.styles} />;
                case 'columns':
                    return <ProjectColumns project={project} setProject={setProject} content={section.content} sectionIndex={index} styles={section.styles} />;
                default:
                    return null;
            }
        };
    
        return (
            <ProjectSectionWrapper key={index} project={project} setProject={setProject} sectionIndex={index} type={section.type}>
                {sectionContent()}
            </ProjectSectionWrapper>
        );
    };


    return (
        <div id="portfolio-project-root">
            {project ? (
                <>
                    <ProjectSectionWrapper project={project} setProject={setProject}>
                        <ProjectAbout project={project} setProject={setProject} styles={project.aboutStyles} />
                    </ProjectSectionWrapper>
                    {project.sections.map((section, index) => renderSection(section, index))}
                </>

            ) : (
                <div>Error: Project not found</div>
            )}
        </div>
    );
};

export default ProjectBody;