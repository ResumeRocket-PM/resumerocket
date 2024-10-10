import { useContext, useState } from 'react';
import ProjectSectionWrapper from '../ProjectSectionWrapper';
import { PortfolioEditContext } from '../../../context/PortfolioEditProvider';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';

const ProjectColumns = ({ project, setProject, content, sectionIndex }) => {
    const { editMode } = useContext(PortfolioEditContext);

    // Initialize state with the content array
    const [tempValues, setTempValues] = useState(content);

    // Update the corresponding value in the state object
    const handleTempChange = (e, index, field) => {
        const { value } = e.target;
        setTempValues(prevTempValues => {
            const newTempValues = [...prevTempValues];
            newTempValues[index][field] = value;
            return newTempValues;
        });
    };

    // Update the project content with the values from the state object
    const handleTextChange = (index, field) => {
        setProject(prevProject => {
            const updatedSections = prevProject.sections.map((section, idx) => {
                if (section.type === 'columns' && idx === sectionIndex) {
                    const newContent = [...section.content];
                    newContent[index][field] = tempValues[index][field];
                    return { ...section, content: newContent };
                }
                return section;
            });
            return { ...prevProject, sections: updatedSections };
        });
    };

    return (
        <ProjectSectionWrapper project={project} setProject={setProject} sectionIndex={sectionIndex}>
            {editMode && (
                <div className='portfolio-project-columns'>
                    {tempValues.map((column, index) => (
                        <div className="column" key={index}>
                            <TextareaAutosize
                                className={`portfolio-textarea h1 ${!editMode ? 'portfolio-textarea-disabled' : ''}`}
                                value={column.title}
                                onChange={(e) => handleTempChange(e, index, 'title')}
                                onBlur={() => handleTextChange(index, 'title')}
                                aria-label="minimum height"
                                minRows={1}
                                // style={{ width: "80%" }}
                                placeholder="Enter title here"
                            />
                            <TextareaAutosize
                                className={`portfolio-textarea p ${!editMode ? 'portfolio-textarea-disabled' : ''}`}
                                value={column.text}
                                onChange={(e) => handleTempChange(e, index, 'text')}
                                onBlur={() => handleTextChange(index, 'text')}
                                aria-label="minimum height"
                                minRows={1}
                                placeholder="Enter information about the project here"
                            />
                        </div>
                    ))}
                </div>
            )}
        </ProjectSectionWrapper>
    );
};

export default ProjectColumns;