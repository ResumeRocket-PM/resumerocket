import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import '../../../styles/ProjectsPreviewBodyDefault.css';
import DialogButton from '../../DialogButton';  
import { TextField } from '@mui/material';
import { projectDefault, projectsPreviewDefault } from '../../../example_responses/portfolioContent';
import AddIcon from '@mui/icons-material/Add';



const ProjectsPreviewBody = ({editMode, portfolioContent, setPortfolioContent}) => {

    const [projectsPreview, setProjectsPreview] = useState(portfolioContent.pages.projectsPreview);

    return (
        <div id='portfolio-projects-preview-root'>
            <h1 id='portfolio-pp-header' style={projectsPreview.styles} >Projects</h1>
            <div id='portfolio-pp-projects-container'>
                {projectsPreview.projects.map((project, index) => (
                    <Card className='portfolio-pp-project' key={index}>
                        <CardContent>
                            <h1>{project.name}</h1>
                            <p>{project.description}</p>
                            <img src={project.image} alt="project" />
                            <a href={project.link}>Link</a>
                        </CardContent>
                    </Card>
                ))}
                {editMode && (
                    <DialogButton 
                        text='Add Project'
                        title='Project Details'
                        startIcon={<AddIcon />}
                        content={
                            Object.keys(projectDefault).map((key, index) => (
                                <TextField 
                                    key={index}
                                    label={key}
                                    variant='outlined'
                                />
                            ))
                        }
                    />

                )}
            </div>

        </div>
    );
};

export default ProjectsPreviewBody;