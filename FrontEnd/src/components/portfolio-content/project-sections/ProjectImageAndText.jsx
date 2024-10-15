import { useContext, useState } from 'react';
import ProjectSectionWrapper from '../ProjectSectionWrapper';
import { PortfolioEditContext } from '../../../context/PortfolioEditProvider';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { VisuallyHiddenInput } from '../../../utils/muiHelpers';
import cameraIcon from '../../../assets/portfolio/camera-solid.svg';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import PortfolioItemWithPopupWrapper from '../PortfolioItemWithPopupWrapper';
import ItemWithDialogWrapper from '../ItemWithDialogWrapper';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import TextField from '@mui/material/TextField';
import TextSizeOptionsMenu from '../TextSizeOptionsMenu';


const defaultImageUrl = 'https://64.media.tumblr.com/0e7cf00818a80d639465cfa74e5f8282/5f4ab7b2d961f3d7-e9/s400x600/d56fb2bb9fee3e8b0ad9212119769972fcf67564.jpg'

const ProjectImageAndText = ({ project, setProject, content, sectionIndex, styles }) => {
    const { editMode } = useContext(PortfolioEditContext);

    const [tempValue, setTempValue] = useState(content);
    const [imageURL, setImageURL] = useState(defaultImageUrl);
    const [addImageDialogOpen, setAddImageDialogOpen] = useState(false);
    const [imagePopoverOpen, setImagePopoverOpen] = useState(false);
    const [textPopoverOpen, setTextPopoverOpen] = useState(false);
    const [fontSelected, setFontSelected] = useState(styles.textarea.font || 'p');


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

    const changeFontSize = (size) => {
        // Convert size to lowercase
        size = size.toLowerCase();
        setFontSelected(size);
    
        // let newStyles = {};
        // if (size === 'h1') {
        //     newStyles = { font: 'h1' };
        // } else if (size === 'h2') {
        //     newStyles = { font: 'h2' };
        // } else if (size === 'h3') {
        //     newStyles = { font: 'h3' };
        // } else if (size === 'h4') {
        //     newStyles = { font: 'h4' };
        // } else if (size === 'p') {
        //     newStyles = { font: 'p' };
        // }
    
        setProject(prevProject => {
            const updatedSections = prevProject.sections.map((section, index) => {
                if (section.type === 'image and text' && index === sectionIndex) {
                    // Add new styles to only the specific class
                    return { 
                        ...section, 
                        styles: {
                            ...section.styles, 
                            'textarea': {
                                ...section.styles.textarea,
                                font: size
                            }
                        }
                    };
                }
                return section;
            });
            return { ...prevProject, sections: updatedSections };
        });
    };

    const changeVerticalAlign = (align) => {
        setProject(prevProject => {
            const updatedSections = prevProject.sections.map((section, index) => {
                if (section.type === 'image and text' && index === sectionIndex) {
                    return {
                        ...section,
                        styles: {
                            ...section.styles,
                            'textarea': {
                                ...section.styles.textarea,
                                verticalAlign: align
                            }
                        }
                    };
                }
                return section;
            });
            return { ...prevProject, sections: updatedSections };
        });
    };

    const changeTextAlign = (align) => {
        
        // let newStyles = {};
        // if (align === 'left') {
        //     newStyles = { textAlign: 'left' };
        // } else if (align === 'center') {
        //     newStyles = { textAlign: 'center' };
        // } else if (align === 'right') {
        //     newStyles = { textAlign: 'right' };
        // }

        setProject(prevProject => {
            const updatedSections = prevProject.sections.map((section, index) => {
                if (section.type === 'image and text' && index === sectionIndex) {
                    // Add new styles to only the specific class
                    return {
                        ...section,
                        styles: {
                            ...section.styles,
                            'textarea': { 
                                ...section.styles.textarea,
                                textAlign: align
                            }
                        }
                    };
                }
                return section;
            });
            return { ...prevProject, sections: updatedSections };
        });
    };

    console.log('styles', styles);

    return (
        <div className='project-image-and-text'>
            <PortfolioItemWithPopupWrapper 
                popoverOpen={imagePopoverOpen}
                setPopoverOpen={setImagePopoverOpen}
                popupLocation="top-right-over"
                popupContentClasses="project-edit-image-popup-content"
                popoverContent={
                    <ItemWithDialogWrapper
                        isOpen={addImageDialogOpen}
                        setIsOpen={setAddImageDialogOpen}
                        onClose={() => setImagePopoverOpen(false)}
                        dialogContent={
                            <TextField
                                id="outlined-basic"
                                label="Image URL"
                                variant="outlined"
                                value={imageURL}
                                onChange={(e) => setImageURL(e.target.value)}
                            />
                        }
                    >
                        <div className='hz-center'>
                            <EditOutlinedIcon/>
                            <div>Edit Image</div>
                        </div>
                    </ItemWithDialogWrapper>
                } 
            >


                <img 
                    className='portfolio-image'
                    src={imageURL} 
                    alt="portfolio image" 
                    style={{ height: '15rem', width: '15rem', borderRadius: '5px'}}
                />
            </PortfolioItemWithPopupWrapper>

            <PortfolioItemWithPopupWrapper
                popoverOpen={textPopoverOpen}
                setPopoverOpen={setTextPopoverOpen}
                popupLocation='top'
                useContentClick={true}
                wrapperClasses={styles?.textarea?.verticalAlign || ''}
                popoverContent={
                    <div className='portfolio-image-and-textarea-popup-content hz-center'>
                        <TextSizeOptionsMenu
                            setPopoverOpen={setTextPopoverOpen}
                            fontSelected={fontSelected}
                            changeFontSize={changeFontSize} 
                            changeTextAlign={changeTextAlign}
                            changeVerticalAlign={changeVerticalAlign}
                        />
                    </div>
                }
            >
                {/* <div> */}
                    <TextareaAutosize
                        className={[
                            'portfolio-textarea',
                            styles?.textarea?.font || '',
                            styles?.textarea?.textAlign || '',
                            !editMode ? 'disabled-textarea' : ''
                        ].join(' ')}
                        value={tempValue || ""}
                        onChange={handleTempChange}
                        onBlur={handleTextChange}
                        aria-label="minimum height"
                        minRows={1}
                        placeholder="Enter information about the project here"
                    />  
                {/* </div> */}

            </PortfolioItemWithPopupWrapper>

        </div>      
    );
};


export default ProjectImageAndText;