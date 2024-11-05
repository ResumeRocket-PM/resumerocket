import { useContext, useState } from 'react';
import ProjectSectionWrapper from '../ProjectSectionWrapper';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import TextAreaAutoSizeCustom from '../TextAreaAutoSizeCustom';
import { PortfolioEditContext } from '../../../context/PortfolioEditProvider';
import PortfolioItemWithPopupWrapper from '../PortfolioItemWithPopupWrapper';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import TextSizeOptionsMenu from '../TextSizeOptionsMenu'; 
import { createTheme } from '@mui/material/styles';


const ProjectTextArea = ({ project, setProject, content, sectionIndex, styles, portfolioStyles }) => {
    const { editMode } = useContext(PortfolioEditContext);

    // const [tempValue, setTempValue] = useState(content);
    // const [fontSelected, setFontSelected] = useState(styles.textarea.font || 'p');
    // const [popoverOpen, setPopoverOpen] = useState(false);

    /////////// new stuff //////////////

    const updateSectionsInProject = (newSections) => {
        setProject(prevProject => {
            const updatedSections = prevProject.sections.map((section, index) => {
                if (section.type === 'text area' && index === sectionIndex) {
                    return { 
                        ...section,
                        content: newSections
                    };
                }
                return section;
            });
            return { ...prevProject, sections: updatedSections };
        });
    };

    const updateTextAreaStyles = (newStyles) => {
        setProject(prevProject => {
            const updatedSections = prevProject.sections.map((section, index) => {
                if (section.type === 'text area' && index === sectionIndex) {
                    return { 
                        ...section,
                        styles: newStyles
                    };
                }
                return section;
            });
            return { ...prevProject, sections: updatedSections };
        });
    };

    /////////////////////////////////// OLD STUFF //////////////////////////////////////



    // const handleTempChange = (e) => {
    //     setTempValue(e.target.value);
    // };

    // const handleTextChange = () => {
    //     setProject(prevProject => {
    //         const updatedSections = prevProject.sections.map((section, index) => {
    //             if (section.type === 'text area' && index === sectionIndex) {
    //                 return { ...section, content: tempValue };
    //             }
    //             return section;
    //         });
    //         return { ...prevProject, sections: updatedSections };
    //     });
    // };

    // const changeFontSize = (size) => {
    //     // Convert size to lowercase
    //     size = size.toLowerCase();
    //     setFontSelected(size);
    
    //     // let newStyles = {};
    //     // if (size === 'h1') {
    //     //     newStyles = { font: 'h1' };
    //     // } else if (size === 'h2') {
    //     //     newStyles = { font: 'h2' };
    //     // } else if (size === 'h3') {
    //     //     newStyles = { font: 'h3' };
    //     // } else if (size === 'h4') {
    //     //     newStyles = { font: 'h4' };
    //     // } else if (size === 'p') {
    //     //     newStyles = { font: 'p' };
    //     // }
    
    //     setProject(prevProject => {
    //         const updatedSections = prevProject.sections.map((section, index) => {
    //             if (section.type === 'text area' && index === sectionIndex) {
    //                 // Add new styles to only the specific class
    //                 return { 
    //                     ...section, 
    //                     styles: {
    //                         ...section.styles, 
    //                         'textarea': {
    //                             ...section.styles.textarea,
    //                             font: size
    //                         }
    //                     }
    //                 };
    //             }
    //             return section;
    //         });
    //         return { ...prevProject, sections: updatedSections };
    //     });
    // };

    // const changeTextAlign = (align) => {
        
    //     // let newStyles = {};
    //     // if (align === 'left') {
    //     //     newStyles = { textAlign: 'left' };
    //     // } else if (align === 'center') {
    //     //     newStyles = { textAlign: 'center' };
    //     // } else if (align === 'right') {
    //     //     newStyles = { textAlign: 'right' };
    //     // }

    //     setProject(prevProject => {
    //         const updatedSections = prevProject.sections.map((section, index) => {
    //             if (section.type === 'text area' && index === sectionIndex) {
    //                 // Add new styles to only the specific class
    //                 return {
    //                     ...section,
    //                     styles: {
    //                         ...section.styles,
    //                         'textarea': { 
    //                             ...section.styles.textarea,
    //                             textAlign: align
    //                         }
    //                     }
    //                 };
    //             }
    //             return section;
    //         });
    //         return { ...prevProject, sections: updatedSections };
    //     });
    // };

    // console.log('styles', styles);

    // console.log('content', content);    
    // console.log('styles', styles);

    return (
        // <ProjectSectionWrapper project={project} setProject={setProject} sectionIndex={sectionIndex}>
        <div className='project-text-area-root' style={{width: '50%'}}>

            <TextAreaAutoSizeCustom
                sections={content}
                setSections={updateSectionsInProject}
                textAreaStyles={styles}
                setTextAreaStyles={updateTextAreaStyles}
                editMode={editMode}
                portfolioStyles={portfolioStyles}
            />
            {/* <PortfolioItemWithPopupWrapper
                popoverOpen={popoverOpen}
                setPopoverOpen={setPopoverOpen}
                popupLocation="top"
                useContentClick={true}
                wrapperStyles={{width: '100%'}}
                childrenContainerClasses='hz-center'
                childrenContainerStyles={{width: '100%'}}
                popoverContent={
                    <div className='portfolio-textarea-popup-content hz-center'>
                        <TextSizeOptionsMenu 
                            changeFontSize={changeFontSize}
                            setPopoverOpen={setPopoverOpen}
                            fontSelected={fontSelected}
                            changeTextAlign={changeTextAlign}
                        />
                    </div>
                }
            >
                <TextareaAutosize
                    className={[
                        'portfolio-textarea',
                        styles?.textarea?.font || '',
                        styles?.textarea?.textAlign || '',
                        !editMode ? 'disabled-textarea' : ''
                    ].join(' ')}
                    style={{
                        // fontSize: `${styles?.fontSize || '1em'}`,
                        // fontWeight: `${styles?.fontWeight || 'normal'}`,
                        // fontSize: "24px",
                        // fontWeight: "normal",
                        width: '70%'
                    }}
                    value={tempValue || ""}
                    onChange={handleTempChange}
                    onBlur={handleTextChange}
                    aria-label="minimum height"
                    minRows={1}
                    placeholder="Enter information about the project here"
                />  
            </PortfolioItemWithPopupWrapper>  */}
        </div>    

        // </ProjectSectionWrapper>
    );
};

export default ProjectTextArea;