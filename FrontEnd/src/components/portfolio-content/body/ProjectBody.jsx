import React, { useState, useEffect, useRef } from 'react';
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

const ProjectBody = ({editMode, portfolioContent, setPortfolioContent, projectNum, viewMode=false}) => {

    // either pass in the project name or the project id
    // idk you'll probs have to manage this from both the navbar and the left menu... 

    const [project, setProject] = useState(portfolioContent.pages.projects.projectsData[projectNum]);
    const isUpdating = useRef(false);

    /// idk why this was here but was causing an infinite loop
    // useEffect(() => {
    //     setProject(portfolioContent.pages.projects.projectsData[projectNum]);
    //     console.log('project updated');
    // }, [portfolioContent, projectNum]);

    // whenver the project is updated, update the project in the portfolioContent
    useEffect(() => {
        if (!viewMode && !isUpdating.current) {
            isUpdating.current = true;
            setPortfolioContent(prevContent => ({
                ...prevContent,
                pages: {
                    ...prevContent.pages,
                    projects: {
                        ...prevContent.pages.projects,
                        projectsData: [
                            ...prevContent.pages.projects.projectsData.slice(0, projectNum),
                            project,
                            ...prevContent.pages.projects.projectsData.slice(projectNum + 1)
                        ]
                    }
                }
            }));
            isUpdating.current = false;
        }
        console.log('portfolio updated');
    }, [project, projectNum, setPortfolioContent]);

    // useEffect(() => {
    //     console.log(project);
    // }, [project]);

    const renderSection = (section, index) => {
        const sectionContent = () => {
            switch (section.type) {
                case 'video':
                    return <ProjectVideo project={project} setProject={setProject} content={section.content} sectionIndex={index} styles={section.styles} type={section.type} />;
                case 'text area':
                    return <ProjectTextArea 
                        project={project} 
                        setProject={setProject} 
                        content={section.content} 
                        sectionIndex={index} 
                        styles={section.styles} 
                        type={section.type} 
                        portfolioStyles={portfolioContent.styles}
                    />;
                case 'image and text':
                    return <ProjectImageAndText 
                        project={project} 
                        setProject={setProject} 
                        content={section.content} 
                        sectionIndex={index} 
                        styles={section.styles} 
                        type={section.type} 
                        portfolioStyles={portfolioContent.styles}   
                    />;
                case 'image':
                    return <ProjectImage project={project} setProject={setProject} content={section.content} sectionIndex={index} styles={section.styles} type={section.type} />;
                case 'gallery':
                    return <ProjectGallery project={project} setProject={setProject} content={section.content} sectionIndex={index} styles={section.styles} type={section.type} portfolioStyles={portfolioContent.styles}/>;
                case 'figma':
                    return <ProjectFigma project={project} setProject={setProject} content={section.content} sectionIndex={index} styles={section.styles} type={section.type} />;
                case 'jupyter':
                    return <ProjectJupyter project={project} setProject={setProject} content={section.content} sectionIndex={index} styles={section.styles} type={section.type} />;
                case 'google slides':
                    return <ProjectGoogleSlides project={project} setProject={setProject} content={section.content} sectionIndex={index} styles={section.styles} type={section.type} />;
                case 'website preview':
                    return <ProjectWebsitePreview project={project} setProject={setProject} content={section.content} sectionIndex={index} styles={section.styles} type={section.type} />;
                case 'columns':
                    return <ProjectColumns 
                    project={project} 
                    setProject={setProject} 
                    content={section.content} 
                    sectionIndex={index} 
                    styles={section.styles} 
                    type={section.type} 
                    portfolioStyles={portfolioContent.styles}
                />;
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
    console.log('portfolioContent:', portfolioContent);
    // console.log('projectNum:', projectNum);
    console.log('project:', project);


    return (
        <div id="portfolio-project-root" style={{backgroundColor: portfolioContent?.styles?.backgroundColor}}>
            {project ? (
                <>
                    {/* <ProjectSectionWrapper project={project} setProject={setProject}>
                        <ProjectAbout project={project} setProject={setProject} styles={project.aboutStyles} />
                    </ProjectSectionWrapper> */}
                    {project.sections.map((section, index) => renderSection(section, index))}
                </>

            ) : (
                <div style={{color: 'orange'}}>Error: Project not found</div>
            )}
        </div>
    );
};

export default ProjectBody;