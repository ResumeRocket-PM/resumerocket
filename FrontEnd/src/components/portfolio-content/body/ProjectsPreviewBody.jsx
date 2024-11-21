import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import '../../../styles/ProjectsPreviewBodyDefault.css';
import DialogButton from '../../DialogButton';  
import { TextField } from '@mui/material';
import { projectDefault, projectsPreviewDefault } from '../../../example_responses/portfolioContent';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import { useNavigate, useParams } from 'react-router-dom';



const ProjectsPreviewBody = ({
    editMode, 
    portfolioContent, 
    setPortfolioContent, 
    setSelectedPage=null, 
    projectsRef,
    viewMode=false,
    scrollIntoView,
}) => {

    const navigate = useNavigate();


    const [projects, setProjects] = useState(portfolioContent.pages.projects.projectsData);
    const [projectToAdd, setProjectToAdd] = useState({ ...projectDefault });
    const [addProjectOpen, setAddProjectOpen] = useState(false);    
    const [validationErrors, setValidationErrors] = useState({});
    const { portfolioId } = useParams();
    // const [projectNumFromUrl, setProjectNumFromUrl] = useState(null);

    // useEffect(() => {
    //     // get the current url 
    //     const url = window.location.href;
    //     // get the project number from the url
    //     const projectNum = url.split('/').pop();
    //     // set the project number from the url
    //     setProjectNumFromUrl(projectNum);
    // }, []);

    useEffect(() => {
        if (scrollIntoView && projectsRef && projectsRef.current) {
            projectsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, []);

    useEffect(() => {
        setProjects(portfolioContent.pages.projects.projectsData);
    }, [portfolioContent]);


    const handleInputChange = (key) => (event) => {
        setProjectToAdd({
            ...projectToAdd,
            [key]: event.target.value,
        });
        setValidationErrors({
            ...validationErrors,
            [key]: false,
        });
    };

    const handleAddProject = () => {
        const errors = {};
        if (!projectToAdd.name) errors.name = 'Name is required';
        if (!projectToAdd.description) errors.description = 'Description is required';
    
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }
    
        // Update the sections with the project name and description
        const updatedSections = projectToAdd.sections.map((section, index) => {
            if (index === 0) {
                return {
                    ...section,
                    content: section.content.map((contentItem, contentIndex) => {
                        if (contentIndex === 0) {
                            return { ...contentItem, text: projectToAdd.name };
                        } else if (contentIndex === 1) {
                            return { ...contentItem, text: projectToAdd.description };
                        }
                        return contentItem;
                    }),
                };
            }
            return section;
        });
    
        const updatedProjectToAdd = {
            ...projectToAdd,
            sections: updatedSections,
        };
    
        const updatedProjects = [...portfolioContent.pages.projects.projectsData, updatedProjectToAdd];
        setPortfolioContent({
            ...portfolioContent,
            pages: {
                ...portfolioContent.pages,
                projects: {
                    ...portfolioContent.pages.projects,
                    projectsData: updatedProjects,
                },
            },
        });
        setProjectToAdd({ ...projectDefault }); 
        setAddProjectOpen(false);
    };

    const handleGoToProject = (project, index) => {
        if (viewMode) {
            // navigate(`/portfolio/preview/project/${index}`);
            // navigate(`/${portfolioId}/portfolio/project/${projectNumFromUrl}`);
            const projectNumYea = project.match(/\d+/)[0]; // Extract the number from the project name
            navigate(`/${portfolioId}/portfolio/project/${projectNumYea}`);
        }
        setSelectedPage(project);
    };

    return (
        <div id='portfolio-projects-preview-root' ref={projectsRef} style={{backgroundColor: portfolioContent.styles.backgroundColor}}>
            <h1 id='portfolio-pp-header' style={{color: portfolioContent.styles.color}} >Projects</h1>
            <div id='portfolio-pp-projects-container'>
                {projects && projects.map((project, index) => (
                    <div 
                        className='portfolio-pp-project' 
                        key={index}
                        onClick={() => handleGoToProject(`project${index}`, index)}
                    >
                        <div className='v-center' style={{gap: '1rem'}}>
                            <div className='hz-center h1' style={{color: portfolioContent.styles.color, textAlign: 'center'}}>
                                {project.name}
                            </div>                            
                            <p className='hz-center' style={{color: portfolioContent.styles.color}}>{project.description}</p>
                            {/* <a href={project.projectLink}>Link</a> */}
                        </div>
                    </div>
                ))}
                {editMode && (
                    <DialogButton 
                        id='portfolio-pp-add-project-button'
                        text='Add Project'
                        title='Project Details'
                        startIcon={<AddIcon />}
                        isOpen={addProjectOpen}
                        setIsOpen={setAddProjectOpen}
                        buttonStyles={{width: '12rem',
                            height: '12rem',
                            // padding:'1rem',
                            margin: '1rem',
                        }}
                        content={
                            <>
                            <div className='pp-add-project-dialog-body'>
                                <p>* indicates required field</p>
                                <FormControl sx={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
                                    {Object.keys(projectDefault).filter(key => key !== 'styles' && key !== 'sections' && key !== 'aboutStyles').map((key, index) => (
                                            <TextField 
                                                key={index}
                                                label={key}
                                                variant='outlined'
                                                required={key === 'name' || key === 'description'}
                                                value={projectToAdd[key] || ''}
                                                onChange={handleInputChange(key)}
                                                error={!!validationErrors[key]}
                                                helperText={validationErrors[key]}
                                            />
                                        ))}
                                </FormControl>

                            </div>

                            {editMode &&
                                <Button 
                                    variant='contained' 
                                    color='primary' 
                                    onClick={handleAddProject}
                                    sx={{marginTop: '1rem'}}
                                >
                                    Add
                                </Button>       
                            }
                          
                            </>
                        }
                    />
                )}
            </div>
        </div>
    );
};

export default ProjectsPreviewBody;