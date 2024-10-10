import { useContext, useState } from 'react';
import ProjectSectionWrapper from '../ProjectSectionWrapper';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { PortfolioEditContext } from '../../../context/PortfolioEditProvider';

const ProjectTextArea = ({ project, setProject, content, sectionIndex }) => {
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

export default ProjectTextArea;