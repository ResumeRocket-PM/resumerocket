import { useContext, useState } from 'react';
import ProjectSectionWrapper from '../ProjectSectionWrapper';
import { PortfolioEditContext } from '../../../context/PortfolioEditProvider';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import PortfolioItemWithPopupWrapper from '../PortfolioItemWithPopupWrapper';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import TextSizeOptionsMenu from '../TextSizeOptionsMenu';
import ClearIcon from '@mui/icons-material/Clear';

const ProjectColumn = ({ 
    column, 
    editMode, 
    handleTempChange, 
    handleTextChange, 
    index, 
    changeFontSize, 
    changeTextAlign, 
    addColumn, 
    removeColumn 
}) => {
    const [hovered, setHovered] = useState(false);

    const handleMouseEnter = () => {
        setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    return (
        <div className='hz-center' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <PortfolioItemWithPopupWrapper
                popoverContent={
                    <div className='portfolio-textarea-popup-content hz-center'>
                        <TextSizeOptionsMenu
                            changeFontSize={(size) => changeFontSize(index, 'title', size)}
                            changeTextAlign={(align) => changeTextAlign(index, 'title', align)}
                            fontSelected={column.title.styles.font}
                        />
                        <TextSizeOptionsMenu
                            changeFontSize={(size) => changeFontSize(index, 'description', size)}
                            changeTextAlign={(align) => changeTextAlign(index, 'description', align)}
                            fontSelected={column.description.styles.font}
                        />
                    </div>
                }
                useContentClick={true}
            >
                <PortfolioItemWithPopupWrapper 
                    popupLocation= 'top-right-over'
                    popupContentClasses='no-padding'
                    popoverContent={
                        <IconButton
                            sx={{backgroundColor: 'red', padding: '0', margin: 0, borderRadius: '5px'}}
                            onClick={() => removeColumn(index)}
                        >
                            <ClearIcon />
                        </IconButton>
                    }
                >
                    <div className="column">
                        <TextareaAutosize
                            className={`portfolio-textarea ${column.title.styles.font} ${column.title.styles.textAlign} ${!editMode ? 'disabled-textarea' : ''}`}
                            value={column.title.text}
                            onChange={(e) => handleTempChange(e, index, 'title')}
                            onBlur={() => handleTextChange(index, 'title')}
                            aria-label="minimum height"
                            minRows={1}
                            style={{ width: "fit-content" }}
                            placeholder="Enter title here"
                        />
                        <TextareaAutosize
                            className={`portfolio-textarea ${column.description.styles.font} ${column.description.styles.textAlign} ${!editMode ? 'disabled-textarea' : ''}`}
                            value={column.description.text}
                            onChange={(e) => handleTempChange(e, index, 'description')}
                            onBlur={() => handleTextChange(index, 'description')}
                            aria-label="minimum height"
                            minRows={1}
                            style={{ width: "100%" }}
                            placeholder="Enter information about the project here"
                        />
                    </div>                         
                </PortfolioItemWithPopupWrapper>                    
            </PortfolioItemWithPopupWrapper>            
            <div className='portfolio-column-divider-add-button'>
                <IconButton 
                    className={'divider-add-button ' + (hovered ? '' : 'not-visible')}
                    variant='contained'
                    sx={{
                        backgroundColor: 'lightgrey', 
                        '&&:hover': { backgroundColor: 'lightgreen' },
                        borderRadius: '5px', 
                        padding: '0'
                    }}
                    onClick={() => addColumn(index + 1)}
                >
                    <AddIcon />
                </IconButton>
            </div>         
        </div>
    )
};

const ProjectColumns = ({ project, setProject, content, sectionIndex }) => {
    const { editMode } = useContext(PortfolioEditContext);
    const [sectionHovered, setSectionHovered] = useState(false);

    // Initialize state with the content array
    const [tempValues, setTempValues] = useState(content);

    // Update the corresponding value in the state object
    const handleTempChange = (e, index, field) => {
        const { value } = e.target;
        setTempValues(prevTempValues => {
            const newTempValues = [...prevTempValues];
            newTempValues[index] = {
                ...newTempValues[index],
                [field]: {
                    ...newTempValues[index][field],
                    text: value
                }
            };
            return newTempValues;
        });
    };

    // Update the project content with the values from the state object
    const handleTextChange = (index, field) => {
        setProject(prevProject => {
            const updatedSections = prevProject.sections.map((section, idx) => {
                if (section.type === 'columns' && idx === sectionIndex) {
                    const newContent = [...section.content];
                    newContent[index] = {
                        ...newContent[index],
                        [field]: {
                            ...newContent[index][field],
                            text: tempValues[index][field].text
                        }
                    };
                    return { ...section, content: newContent };
                }
                return section;
            });
            return { ...prevProject, sections: updatedSections };
        });
    };

    // Change font size
    const changeFontSize = (index, field, size) => {
        setTempValues(prevTempValues => {
            const newTempValues = [...prevTempValues];
            newTempValues[index] = {
                ...newTempValues[index],
                [field]: {
                    ...newTempValues[index][field],
                    styles: {
                        ...newTempValues[index][field].styles,
                        font: size.toLowerCase()
                    }
                }
            };
            return newTempValues;
        });
    };

    // Change text alignment
    const changeTextAlign = (index, field, align) => {
        setTempValues(prevTempValues => {
            const newTempValues = [...prevTempValues];
            newTempValues[index] = {
                ...newTempValues[index],
                [field]: {
                    ...newTempValues[index][field],
                    styles: {
                        ...newTempValues[index][field].styles,
                        textAlign: align
                    }
                }
            };
            return newTempValues;
        });
    };

    // Remove a column
    const removeColumn = (index) => {
        setTempValues(prevTempValues => {
            const newTempValues = prevTempValues.filter((_, i) => i !== index);
            return newTempValues;
        });
        setProject(prevProject => {
            const updatedSections = prevProject.sections.map((section, idx) => {
                if (section.type === 'columns' && idx === sectionIndex) {
                    const newContent = section.content.filter((_, i) => i !== index);
                    return { ...section, content: newContent };
                }
                return section;
            });
            return { ...prevProject, sections: updatedSections };
        });
    };

    // Add a column
    const addColumn = (index) => {
        const newColumn = {
            title: {
                text: '',
                styles: {
                    font: 'h1',
                    textAlign: 'left'
                }
            },
            description: {
                text: '',
                styles: {
                    font: 'p',
                    textAlign: 'left'
                }
            }
        };
        setTempValues(prevTempValues => {
            const newTempValues = [...prevTempValues];
            newTempValues.splice(index, 0, newColumn);
            return newTempValues;
        });
        setProject(prevProject => {
            const updatedSections = prevProject.sections.map((section, idx) => {
                if (section.type === 'columns' && idx === sectionIndex) {
                    const newContent = [...section.content];
                    newContent.splice(index, 0, newColumn);
                    return { ...section, content: newContent };
                }
                return section;
            });
            return { ...prevProject, sections: updatedSections };
        });
    };

    return (
        <>
            {editMode && (
                <div className='portfolio-project-columns hz-center'>
                    {tempValues.map((column, index) => (
                        <div key={index}>
                            <ProjectColumn
                                column={column}
                                editMode={editMode}
                                handleTempChange={handleTempChange}
                                handleTextChange={handleTextChange}
                                index={index}
                                changeFontSize={changeFontSize}
                                changeTextAlign={changeTextAlign}
                                addColumn={addColumn}
                                removeColumn={removeColumn}
                            />
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default ProjectColumns;