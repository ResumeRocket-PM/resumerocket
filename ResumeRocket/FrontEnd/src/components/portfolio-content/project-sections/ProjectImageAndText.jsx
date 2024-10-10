import { useContext, useState } from 'react';
import ProjectSectionWrapper from '../ProjectSectionWrapper';
import { PortfolioEditContext } from '../../../context/PortfolioEditProvider';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { VisuallyHiddenInput } from '../../../utils/muiHelpers';
import cameraIcon from '../../../assets/portfolio/camera-solid.svg';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';

const ProjectImageAndText = ({ project, setProject, content, sectionIndex }) => {
    const { editMode } = useContext(PortfolioEditContext);

    const [tempValue, setTempValue] = useState(content);

    const handleTempChange = (e) => {
        setTempValue(e.target.value);
    };

    const handleTextChange = () => {
        setProject(prevProject => {
            const updatedSections = prevProject.sections.map((section, index) => {
                if (section.type === 'text area' && index === sectionIndex) {
                    return { ...section, content: tempValue };
                }
                return section;
            });
            return { ...prevProject, sections: updatedSections };
        });
    };

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
            <TextareaAutosize
                className={`portfolio-textarea h1 ${!editMode ? 'portfolio-textarea-disabled' : ''}`}
                value={tempValue || ""}
                onChange={handleTempChange}
                onBlur={handleTextChange}
                aria-label="minimum height"
                minRows={1}
                placeholder="Enter information about the project here"
            />
        </ProjectSectionWrapper>
    );
};


export default ProjectImageAndText;