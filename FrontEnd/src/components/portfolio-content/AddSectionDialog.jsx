import { useState, useContext, useRef, useEffect } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import Button from '@mui/material/Button';

import BackIcon from '../../assets/left-long-solid.svg';
import TextAreaIcon from "../../assets/portfolio/project sections/text-area.png";
import ImageAndTextIcon from "../../assets/portfolio/project sections/image-and-text.png";
import VideoIcon from "../../assets/portfolio/project sections/film-solid.svg";
import ImageIcon from "../../assets/portfolio/project sections/image-regular.svg";
import GalleryIcon from "../../assets/portfolio/project sections/gallery.png";
import FigmaIcon from "../../assets/portfolio/project sections/figma.png";
import JupyterIcon from "../../assets/portfolio/project sections/jupyter.png";
import GoogleSlidesIcon from "../../assets/portfolio/project sections/google-slides.png";
import WebsitePreview from "../../assets/portfolio/project sections/website-preview.png";
import ColumnsIcon from "../../assets/portfolio/project sections/columns.png";

import { 
    projectColumnsContentDefault,
    projectTextAreaStylesDefault,
    projectImageContentDefault, 
    projectImageAndTextContentDefault,
    // projectTextAreaContentDefault,
    textareaContentDefaultNew,
    textareaStylesDefaultNew,
    projectGalleryContentDefault,
    projectJupyterContentDefault,
    projectGoogleSlidesContentDefault,
} from '../../example_responses/portfolioContent';

const SectionIcons = [ 
    { icon: TextAreaIcon, name: "text area" },
    { icon: ImageAndTextIcon, name: "image and text" },
    { icon: VideoIcon, name: "video" },
    { icon: ImageIcon, name: "image" },
    { icon: GalleryIcon, name: "gallery" },
    { icon: FigmaIcon, name: "figma" },
    { icon: JupyterIcon, name: "jupyter" },
    { icon: GoogleSlidesIcon, name: "google slides" },
    // { icon: WebsitePreview, name: "website preview" },
    { icon: ColumnsIcon, name: "columns" },
];

// const defaultContent = {
//     "columns": projectColumnsContentDefault,
//     "image": projectImageContentDefault,

// }

const AddSectionDialog = ({ addSectionDialogOpen, setAddSectionDialogOpen, setProject, sectionIndex }) => {
    const [showAddSectionDetails, setShowAddSectionDetails] = useState(false);
    const [sectionSelected, setSectionSelected] = useState(null);
    const [videoUrl, setVideoUrl] = useState('');
    const [imageFile, setImageFile] = useState(null);

    const handleSectionClick = (section) => {
        setAddSectionDialogOpen(false);
    
        setProject(prevProject => {
            const newSections = [...prevProject.sections];
            let newSection = {
                type: section.name,
                content: "",
                styles: {},
            };
    
            if (section.name === 'text area') {
                newSection.content = textareaContentDefaultNew;
                newSection.styles = textareaStylesDefaultNew;
            }

            if (section.name === 'image and text') {
                newSection.content = projectImageAndTextContentDefault;
            }
    
            if (section.name === 'columns') {
                newSection.content = projectColumnsContentDefault;
            }

            if (section.name === 'image') {
                newSection.content = projectImageContentDefault;
            }

            if (section.name === 'gallery') {
                newSection.content = projectGalleryContentDefault;
            }

            if (section.name === 'jupyter') {
                newSection.content = projectJupyterContentDefault;
            }

            if (section.name === 'google slides') {
                newSection.content = projectGoogleSlidesContentDefault;
            }
    
            newSections.splice(sectionIndex + 1, 0, newSection);
            return {
                ...prevProject,
                sections: newSections,
            };
        });
    };

    const handleVideoUrlChange = (e) => {
        setVideoUrl(e.target.value);
    };

    const handleImageFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleBackButtonClick = () => {
        setShowAddSectionDetails(false);
        setSectionSelected(null);
    };

    const handleModifyProjectSectionContent = () => {
        const sectionName = sectionSelected.name
        let content = null
        if (sectionName === "video") {
            content = videoUrl;
        }

        const newSection = {
            type: sectionName,
            content: content,
        };
        setProject(prevProject => ({
            ...prevProject,
            sections: [...prevProject.sections, newSection],
        }));
        setAddSectionDialogOpen(false);
    }

    return (
        <Dialog
            open={addSectionDialogOpen}
            onClose={() => setAddSectionDialogOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            {showAddSectionDetails && (
                <img id='dialog-add-project-section-details-back-button' src={BackIcon} alt="back button" onClick={handleBackButtonClick} />
            )}
            <DialogTitle id="add-project-section-dialog-title" sx={{paddingTop: "0px"}}>
                {!addSectionDialogOpen ? "Add Section" : `Add ${sectionSelected ? sectionSelected.name : "Section"}`}
            </DialogTitle>
            <DialogContent>
                {!showAddSectionDetails ? (
                    <div id='dialog-add-project-sections-container'>
                        {SectionIcons.map((section, index) => (
                            <div
                                key={index}
                                className='dialog-add-project-section'
                                onClick={() => handleSectionClick(section)}
                            >
                                <img src={section.icon} alt={section.name} />
                                <p>{section.name}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div id='dialog-add-project-section-details'>
                        {sectionSelected.name === "video" && (
                            <>
                                <input
                                    type="text"
                                    placeholder="Enter video URL"
                                    value={videoUrl}
                                    onChange={handleVideoUrlChange}
                                />
                                <div className='hz-right'>
                                    <Button
                                        variant="contained"
                                        onClick={handleModifyProjectSectionContent}
                                        sx={{backgroundColor: 'green', marginTop: '1rem'}}
                                    >
                                        Add
                                    </Button>  
                                </div>                          
                            </>
                        )}
                        {sectionSelected.name === "image" && (
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageFileChange}
                            />
                        )}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default AddSectionDialog;