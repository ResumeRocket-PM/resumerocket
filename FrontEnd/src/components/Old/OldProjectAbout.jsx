import { useState, useContext, useEffect } from 'react';
import { PortfolioEditContext } from '../../../context/PortfolioEditProvider';
import ProjectSectionWrapper from '../ProjectSectionWrapper';

const ProjectAbout = ({project, setProject}) => {
    const { editMode, autoResizeTextArea, updateTextAreaSizes } = useContext(PortfolioEditContext);
    const [tempValue, setTempValue] = useState({ name: project.name, description: project.description });

    const handleTempChange = (e) => {
        const { name, value } = e.target;
        setTempValue(prevTempValue => ({...prevTempValue, [name]: value}));
    };

    const handleTextChange = (e) => {
        const { name, value } = e.target;
        setProject(prevProject => ({...prevProject, [name]: value}));
    };

    useEffect(() => {
        updateTextAreaSizes();
    }, [project.name, project.description]);


    return (
        // <ProjectSectionWrapper project={project} setProject={setProject}>
            <div className='v-center-center'>
            
                <textarea
                    name="name" // *this MUST match name of the field in portfolioContent!
                    className={`portfolio-textarea h1 ${!editMode ? 'disabled-textarea' : ''}`}
                    rows="2"
                    cols="20"
                    value={tempValue.name || ""}
                    onChange={handleTempChange}
                    onBlur={handleTextChange}
                    onInput={autoResizeTextArea}    
                    placeholder="Project Name" /* Placeholder text shown when about.name is empty */
                />
                <textarea
                    name="description" // *this MUST match name of the field in portfolioContent!
                    className={`portfolio-textarea h1 ${!editMode ? 'disabled-textarea' : ''}`}
                    rows="2"
                    cols="30"
                    value={tempValue.description || ""}
                    onChange={handleTempChange}
                    onBlur={handleTextChange}                
                    onInput={autoResizeTextArea}    
                    placeholder="Project Description" /* Placeholder text shown when about.name is empty */
                />

            </div>
        // </ProjectSectionWrapper>
    );
};

export default ProjectAbout;