import { useState, useContext, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
// import './ProjectSectionWrapper.css'; // Assuming you have some CSS for this component
import { PortfolioEditContext } from '../../context/PortfolioEditProvider';
import PortfolioItemWithPopupWrapper from './PortfolioItemWithPopupWrapper';  
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TrashIcon from "../../assets/trash-solid.svg";
import UpDownArrows from "../../assets/up-down.png";
import AddSectionDialog from './AddSectionDialog';
import RearrangeSectionsDialog from './RearrangeSectionsDialog';


const ProjectSectionWrapper = ({ children, project, setProject, sectionIndex }) => {

    // const { handleMouseEnterPI, handleMouseLeavePI } = useContext(PortfolioEditContext);
    const [addSectionDialogOpen, setAddSectionDialogOpen] = useState(false);
    const [rearrangeDialogOpen, setRearrangeDialogOpen] = useState(false); // New state for rearrange dialog
    const [isExpanded, setIsExpanded] = useState(false);
    const [sectionIsHovered, setSectionIsHovered] = useState(false);
    const [editButtonIsHovered, setEditButtonIsHovered] = useState(false);
    const projectSectionRef = useRef(null);
    const editButtonWrapperRef = useRef(null);

    useEffect(() => {
        if (!sectionIsHovered || !editButtonIsHovered) {
            setIsExpanded(false);
        }
    }, [sectionIsHovered, editButtonIsHovered]);

    const deleteProjectSection = () => {
        setProject(prevProject => {
            const updatedSections = prevProject.sections.filter((section, index) => index !== sectionIndex);
            return { ...prevProject, sections: updatedSections };
        });
    };


    return (
        <div 
            className="project-section"
            ref={projectSectionRef}
            onMouseEnter={() => setSectionIsHovered(true)}
            onMouseLeave={() => setSectionIsHovered(false)}
        >
            <PortfolioItemWithPopupWrapper onButtonClick={() => setAddSectionDialogOpen(true)} type="add" popupLocation="bottom">
                {children}
            </PortfolioItemWithPopupWrapper>

            <div className="portfolio-add-button-wrapper">
                <IconButton
                    variant="contained"
                    onClick={() => setAddSectionDialogOpen(true)}
                    className="portfolio-project-section-button"
                >
                    <AddIcon />
                </IconButton>
            </div>

            <div 
                className={`portfolio-edit-button-wrapper ${isExpanded ? 'expanded' : ''}`}
                ref={editButtonWrapperRef}
                onMouseEnter={() => setEditButtonIsHovered(true)}
                onMouseLeave={() => setEditButtonIsHovered(false)}
            >
                {isExpanded && (
                    <>
                        <IconButton
                            variant="contained"
                            className="portfolio-project-section-button"
                            onClick={deleteProjectSection}
                        >
                            <img src={TrashIcon} alt="delete portfolio section button" />
                        </IconButton>
                        <IconButton
                            variant="contained"
                            className="portfolio-project-section-button"
                            onClick={() => setRearrangeDialogOpen(true)}
                        >
                            <img src={UpDownArrows} alt="move portfolio section button up/down" />
                        </IconButton>                        
                    </>
                )}
                <IconButton
                    variant="contained"
                    onClick={() => setIsExpanded(!isExpanded)}
                    id='ayoooo'
                    className="portfolio-project-section-button"
                >
                    <MoreHorizIcon />
                </IconButton>                
            </div>

            <AddSectionDialog 
                addSectionDialogOpen={addSectionDialogOpen}
                setAddSectionDialogOpen={setAddSectionDialogOpen}
                setProject={setProject}
                sectionIndex={sectionIndex}
            />
            <RearrangeSectionsDialog // New rearrange dialog component
                rearrangeDialogOpen={rearrangeDialogOpen}
                setRearrangeDialogOpen={setRearrangeDialogOpen}
                project={project}
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