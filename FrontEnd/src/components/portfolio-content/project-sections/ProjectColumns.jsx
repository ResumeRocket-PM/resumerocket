import { useContext, useState } from 'react';
import { PortfolioEditContext } from '../../../context/PortfolioEditProvider';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import TextAreaAutoSizeCustom from '../TextAreaAutoSizeCustom';
import PortfolioItemWithPopupWrapper from '../PortfolioItemWithPopupWrapper';

const ProjectColumn = ({ 
    column, 
    editMode, 
    handleTextChange, 
    handleTextAreaStylesChange, 
    index, 
    addColumn, 
    removeColumn, 
    portfolioStyles
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
                popupLocation='top-right-over'
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
                    <TextAreaAutoSizeCustom
                        sections={column.content}
                        setSections={(newSections) => handleTextChange(index, newSections)}
                        textAreaStyles={column.styles}
                        setTextAreaStyles={(newStyles) => handleTextAreaStylesChange(index, newStyles)}
                        editMode={editMode}
                        portfolioStyles={portfolioStyles}
                    />
                </div>
            </PortfolioItemWithPopupWrapper>

            {editMode && (
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
            )}
        </div>
    )
};

const ProjectColumns = ({ project, setProject, content, sectionIndex, portfolioStyles }) => {
    const { editMode } = useContext(PortfolioEditContext);

    // Update the project content with the values from the state object
    const handleTextChange = (index, newSections) => {
        setProject(prevProject => {
            const updatedSections = prevProject.sections.map((section, idx) => {
                if (section.type === 'columns' && idx === sectionIndex) {
                    const newContent = [...section.content];
                    newContent[index] = {
                        ...newContent[index],
                        content: newSections
                    };
                    return { ...section, content: newContent };
                }
                return section;
            });
            return { ...prevProject, sections: updatedSections };
        });
    };

    // Update the text area styles
    const handleTextAreaStylesChange = (index, newStyles) => {
        setProject(prevProject => {
            const updatedSections = prevProject.sections.map((section, idx) => {
                if (section.type === 'columns' && idx === sectionIndex) {
                    const newContent = [...section.content];
                    newContent[index] = {
                        ...newContent[index],
                        styles: newStyles
                    };
                    return { ...section, content: newContent };
                }
                return section;
            });
            return { ...prevProject, sections: updatedSections };
        });
    };

    // Remove a column
    const removeColumn = (index) => {
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
            content: [
                {
                    text: '',
                    styles: {
                        tagType: 'h1',
                        textAlign: 'left'
                    }
                },
                {
                    text: '',
                    styles: {
                        tagType: 'p',
                        textAlign: 'left'
                    }
                }
            ],
            styles: {
                textAlign: 'text-align-center'
            }
        };
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
            <div 
                className='portfolio-project-columns hz-center-top' 
                // style={{gap: !editMode ? '28px' : '0px'}}
            >
                {content.map((column, index) => (
                    <div key={index} className='portfolio-column-container' style={{paddingRight: !editMode ? '28px' : '0px'}}>
                        <ProjectColumn
                            column={column}
                            editMode={editMode}
                            handleTextChange={handleTextChange}
                            handleTextAreaStylesChange={handleTextAreaStylesChange}
                            index={index}
                            addColumn={addColumn}
                            removeColumn={removeColumn}
                            portfolioStyles={portfolioStyles}
                        />
                    </div>
                ))}
            </div>
        </>
    );
};

export default ProjectColumns;