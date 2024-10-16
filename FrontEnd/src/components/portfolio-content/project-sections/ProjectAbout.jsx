import { useState, useContext, useEffect, useRef, forwardRef} from 'react';
import { PortfolioEditContext } from '../../../context/PortfolioEditProvider';
import PortfolioItemWithPopupWrapper from '../PortfolioItemWithPopupWrapper';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import TextSizeOptionsMenu from '../TextSizeOptionsMenu';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';

const ProjectAbout = ({project, setProject, styles}) => {
    const { editMode, autoResizeTextArea, updateTextAreaSizes } = useContext(PortfolioEditContext);
    const [tempName, setTempName] = useState(project.name);
    const [tempDescription, setTempDescription] = useState(project.description);    // const [fontSelected, setFontSelected] = useState(styles.font || 'p');
    const [namePopoverOpen, setNamePopoverOpen] = useState(false);
    const [ descriptionPopoverOpen, setDescriptionPopoverOpen ] = useState(false);

    const nameTextAreaRef = useRef(null);
    const descriptionTextAreaRef = useRef(null);
    const namePopoverRef = useRef(null);
    const descriptionPopoverRef = useRef(null);


    const handleNameChange = () => {
        setProject(prevProject => {
            return { ...prevProject, name: tempName };
        });
    };

    const handleDescriptionChange = () => {
        setProject(prevProject => {
            return { ...prevProject, description: tempDescription };
        });
    };


    const changeNameFontSize = (size) => {
        size = size.toLowerCase();
        setProject(prevProject => {
            return { 
                ...prevProject, 
                aboutStyles: { 
                    ...prevProject.aboutStyles, 
                    name: { 
                        ...prevProject.aboutStyles.name, 
                        font: size 
                    } 
                } 
            };
        });
    };

    const changeDescriptionFontSize = (size) => {
        size = size.toLowerCase();
        setProject(prevProject => {
            return { 
                ...prevProject, 
                aboutStyles: { 
                    ...prevProject.aboutStyles, 
                    description: { 
                        ...prevProject.aboutStyles.description, 
                        font: size 
                    } 
                } 
            };
        });
    };


    const changeNameTextAlign = (align) => {
        if(project){
            setProject(prevProject => {
                return { 
                    ...prevProject, 
                    aboutStyles: { 
                        ...prevProject.aboutStyles, 
                        name: { 
                            ...prevProject.aboutStyles.name, 
                            textAlign: align 
                        } 
                    } 
                };
            });
        }

    };

    const changeDescriptionTextAlign = (align) => {
        setProject(prevProject => {
            return { 
                ...prevProject, 
                aboutStyles: { 
                    ...prevProject.aboutStyles, 
                    description: { 
                        ...prevProject.aboutStyles.description, 
                        textAlign: align 
                    } 
                } 
            };
        });
    };

    const handleNameTextAreaClickAway = (event) => {
        if (nameTextAreaRef.current && namePopoverRef.current.contains(event.target)) {
            focusNameTextArea();
            return;
        } else if (namePopoverOpen) {
            setNamePopoverOpen(false);
        }
    };

    const handleDescriptionTextAreaClickAway = (event) => {
        if (descriptionTextAreaRef.current) {
            // if(descriptionPopoverRef.current) {
                if(descriptionPopoverRef.current.contains(event.target)) {
                    return;
                }
            // }

        } else if (descriptionPopoverOpen) {
            setDescriptionPopoverOpen(false);
        }
    }

    const focusNameTextArea = () => {
        if (nameTextAreaRef.current) {
            nameTextAreaRef.current.focus();
        }
    };

    const focusDescriptionTextArea = () => {
        if (descriptionTextAreaRef.current) {
            descriptionTextAreaRef.current.focus();
        }
    };

    return (
        // <ProjectSectionWrapper project={project} setProject={setProject}>
            <div className='v-center-center'>
            
                <PortfolioItemWithPopupWrapper
                    popoverOpen={namePopoverOpen}
                    setPopoverOpen={setNamePopoverOpen}
                    popupLocation="top"
                    useContentClick={true}
                    popoverContent={
                        <div ref={namePopoverRef} className='portfolio-textarea-popup-content hz-center'>
                            <TextSizeOptionsMenu
                                changeFontSize={changeNameFontSize}
                                changeTextAlign={changeNameTextAlign}
                                setPopoverOpen={setNamePopoverOpen}
                                fontSelected={styles?.name?.font || 'h1'}
                            />
                        </div>
                    }
                >
                    <ClickAwayListener mouseEvent="onMouseDown" onClickAway={handleNameTextAreaClickAway}>
                        
                        <TextareaAutosize
                            ref={nameTextAreaRef}
                            className={[
                                'portfolio-textarea',
                                styles?.name?.font || '',
                                styles?.name?.textAlign || '',
                                !editMode ? 'disabled-textarea' : ''
                            ].join(' ')}
                            sx={{
                                // fontSize: `${styles?.fontSize || '1em'}`,
                                // fontWeight: `${styles?.fontWeight || 'normal'}`,
                                // fontSize: "24px",
                                // fontWeight: "normal",
                            }}
                            value={tempName || ""}
                            onChange={() => setTempName(event.target.value)}
                            onBlur={handleNameChange}
                            aria-label="minimum height"
                            minRows={1}
                            placeholder="Enter project name here"
                        /> 
                        
                    </ClickAwayListener>
                </PortfolioItemWithPopupWrapper> 

                <PortfolioItemWithPopupWrapper
                    popoverOpen={descriptionPopoverOpen}
                    setPopoverOpen={setDescriptionPopoverOpen}
                    popupLocation="top"
                    useContentClick={true}
                    popoverContent={
                        <div ref={descriptionPopoverRef} className='portfolio-textarea-popup-content hz-center'>
                            <TextSizeOptionsMenu 
                                changeFontSize={changeDescriptionFontSize}
                                changeTextAlign={changeDescriptionTextAlign}
                                setPopoverOpen={setNamePopoverOpen}
                                fontSelected={styles?.description?.font || 'h1'}
                            />
                        </div>
                    }
                >
                    <ClickAwayListener mouseEvent="onMouseDown" onClickAway={handleDescriptionTextAreaClickAway}>
                        <TextareaAutosize
                            ref={descriptionTextAreaRef}
                            className={[
                                'portfolio-textarea',
                                styles?.description?.font || '',
                                styles?.description?.textAlign || '',
                                !editMode ? 'disabled-textarea' : ''
                            ].join(' ')}
                            sx={{
                                // fontSize: `${styles?.fontSize || '1em'}`,
                                // fontWeight: `${styles?.fontWeight || 'normal'}`,
                                // fontSize: "24px",
                                // fontWeight: "normal",
                            }}
                            value={tempDescription || ""}
                            onChange={() => setTempDescription(event.target.value)}
                            onBlur={handleDescriptionChange}
                            aria-label="minimum height"
                            minRows={1}
                            placeholder="Enter a short description of the project here"
                        />  
                    </ClickAwayListener>
                </PortfolioItemWithPopupWrapper> 

            </div>
        // </ProjectSectionWrapper>
    );
};

export default ProjectAbout;