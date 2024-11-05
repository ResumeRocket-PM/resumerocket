import { useState } from 'react';
import ProjectSectionWrapper from '../ProjectSectionWrapper';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import PortfolioItemWithPopupWrapper from '../PortfolioItemWithPopupWrapper';

const ProjectVideo = ({ project, setProject, content, sectionIndex }) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [popupOpen, setPopupOpen] = useState(false);
    const [tempVideoUrl, setTempVideoUrl] = useState(content);

    // When the edit icon is clicked, open the dialog to edit the video URL
    const handleEditIconClick = () => {
        setDialogOpen(true);
    };

    // Extract the URL from the iframe string
    const extractUrlFromIframe = (iframeString) => {
        const urlMatch = iframeString.match(/src="([^"]+)"/);
        return urlMatch ? urlMatch[1] : '';
    };

    const handleTempVideoUrlChange = (e) => {
        setTempVideoUrl(e.target.value);
    };

    const handleDialogClose = () => {
        const extractedUrl = extractUrlFromIframe(tempVideoUrl);
        setProject(prevProject => {
            const updatedSections = prevProject.sections.map((section, index) => {
                if (section.type === 'video' && index === sectionIndex) {
                    return { ...section, content: extractedUrl };
                }
                return section;
            });
            return { ...prevProject, sections: updatedSections };
        });
        setDialogOpen(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleDialogClose();
        }
    };

    return (
        <>
            <PortfolioItemWithPopupWrapper
                popoverOpen={popupOpen}
                setPopoverOpen={setPopupOpen}
                popupLocation="top-right"
                popoverContent={
                    <div className='hz-center' onClick={handleEditIconClick}>
                        <EditOutlinedIcon />
                        <div>Edit Video</div>
                    </div>
                }
            >
                <iframe
                    width="672"
                    height="378"
                    src={content}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                ></iframe>
            </PortfolioItemWithPopupWrapper>
            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <TextField
                        id="outlined-basic"
                        label="Video URL"
                        variant="outlined"
                        value={tempVideoUrl}
                        onChange={handleTempVideoUrlChange}
                        onKeyPress={handleKeyPress}
                        style={{ width: '30rem' }}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ProjectVideo;