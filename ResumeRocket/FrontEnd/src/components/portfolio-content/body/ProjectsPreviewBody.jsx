import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import '../../../styles/ProjectsPreviewBodyDefault.css';

const ProjectsPreviewBody = ({userProjectsPreview, editMode}) => {
    const [projectsPreview, setProjectsPreview] = useState(userProjectsPreview);



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
            </div>

        </div>
    );
};

export default ProjectsPreviewBody;