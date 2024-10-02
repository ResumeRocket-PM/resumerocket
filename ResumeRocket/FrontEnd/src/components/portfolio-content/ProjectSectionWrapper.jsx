import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
// import './ProjectSectionWrapper.css'; // Assuming you have some CSS for this component
import { PortfolioEditContext } from '../../context/PortfolioEditProvider';
import PortfolioItemWithPopupWrapper from './PortfolioItemWithPopupWrapper';  
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


const SectionIcons = [ 
    { icon: TextAreaIcon, name: "Text Area" },
    { icon: ImageAndTextIcon, name: "Image and Text" },
    { icon: VideoIcon, name: "Video" },
    { icon: ImageIcon, name: "Image" },
    { icon: GalleryIcon, name: "Gallery" },
    { icon: FigmaIcon, name: "Figma" },
    { icon: JupyterIcon, name: "Jupyter" },
    { icon: GoogleSlidesIcon, name: "Google Slides" },
    { icon: WebsitePreview, name: "Website Preview" },
];

const AddSectionDialog = ({ addSectionDialogOpen, setAddSectionDialogOpen, setProject }) => {
    const [showAddSectionDetails, setShowAddSectionDetails] = useState(false);
    const [sectionSelected, setSectionSelected] = useState(null);
    const [videoUrl, setVideoUrl] = useState('');
    const [imageFile, setImageFile] = useState(null);

    const handleSectionClick = (section) => {
        setSectionSelected(section);
        setShowAddSectionDetails(true);
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
        const sectionName = sectionSelected.name.toLowerCase();
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
                        {sectionSelected.name === "Video" && (
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
                        {sectionSelected.name === "Image" && (
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

const ProjectSectionWrapper = ({ children, id, setProject }) => {

    // const { handleMouseEnterPI, handleMouseLeavePI } = useContext(PortfolioEditContext);
    const [addSectionDialogOpen, setAddSectionDialogOpen] = useState(false);

    return (
        <div 
            id={id} 
            className="project-section"
        >
            <PortfolioItemWithPopupWrapper onButtonClick={() => setAddSectionDialogOpen(true)} type="add" popupLocation="bottom">
                {children}
            </PortfolioItemWithPopupWrapper>
            <AddSectionDialog 
                addSectionDialogOpen={addSectionDialogOpen}
                setAddSectionDialogOpen={setAddSectionDialogOpen}
                setProject={setProject}
            />
        </div>
    );
};

ProjectSectionWrapper.propTypes = {
    children: PropTypes.node.isRequired,
    id: PropTypes.string.isRequired,
};

export default ProjectSectionWrapper;