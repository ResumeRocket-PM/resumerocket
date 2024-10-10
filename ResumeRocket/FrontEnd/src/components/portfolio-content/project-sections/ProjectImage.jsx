import { useContext, useState } from 'react';
import ProjectSectionWrapper from '../ProjectSectionWrapper';
import { PortfolioEditContext } from '../../../context/PortfolioEditProvider';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { VisuallyHiddenInput } from '../../../utils/muiHelpers';
import cameraIcon from '../../../assets/portfolio/camera-solid.svg';

const ProjectImage = ({ project, setProject, content, sectionIndex }) => {
    const { editMode } = useContext(PortfolioEditContext);

    return (
        <ProjectSectionWrapper project={project} setProject={setProject} sectionIndex={sectionIndex}>
            {editMode && (
            <Button 
                component='label'
                role={undefined}
                tabIndex={-1}
                variant='outlined' 
                startIcon={<AddIcon/>} 
                sx={{"&:hover": {backgroundColor:'lightblue'}, marginTop: '1rem', height: '15rem', width: '15rem', borderRadius: '5px'}}
            >
                Add Picture
                <VisuallyHiddenInput 
                    type='file' 
                    accept='image/*' 
                    onChange={(event) => console.log(event.target.files)}
                />
            </Button>                     
            )}
        </ProjectSectionWrapper>
    );
};

export default ProjectImage;