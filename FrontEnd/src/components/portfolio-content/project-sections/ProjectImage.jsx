import { useContext, useState, useRef, useEffect } from 'react';
import ProjectSectionWrapper from '../ProjectSectionWrapper';
import { PortfolioEditContext } from '../../../context/PortfolioEditProvider';
import { ImageContext } from '../../../context/ImageProvider';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { VisuallyHiddenInput } from '../../../utils/muiHelpers';
import cameraIcon from '../../../assets/portfolio/camera-solid.svg';
import TextField from '@mui/material/TextField';
import PortfolioItemWithPopupWrapper from '../PortfolioItemWithPopupWrapper';
import ItemWithDialogWrapper from '../ItemWithDialogWrapper';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Edit } from '@mui/icons-material';
import { useApi } from '../../../hooks';

const ProjectImage = ({ project, setProject, content, sectionIndex, type }) => {
    const { editMode } = useContext(PortfolioEditContext);
    const { showImage } = useContext(ImageContext);
    const api = useApi();
    const [popoverOpen, setPopoverOpen] = useState(false);
    const fileInputRef = useRef(null);

    const [projectImage, setProjectImage] = useState(null);

    const handleImageChange = async (file) => {
        const formData = new FormData();
        file = file[0];
        
        formData.append('file', file); 
        formData.append('imageId', content.imageId);
    
        try {
            const response = await api.postFileForm('/image/upload', formData);
            const data = await response.json();
            
            console.log(data);
            const url = data.imageUrl;
            const imageId = data.imageId;
    
            // Update the project state with the new image URL and imageId
            setProject(prevProject => {
                const updatedSections = prevProject.sections.map((section, index) => {
                    if (section.type === 'image' && index === sectionIndex) {
                        return { ...section, content: { ...section.content, imageUrl: url, imageId: imageId } };
                    }
                    return section;
                });
                return { ...prevProject, sections: updatedSections };
            });
    
            // Await the result of showImage and then set it in the state
            const newImage = await showImage(url, imageId);
            setProjectImage(URL.createObjectURL(newImage));
        } catch (err) {
            console.error(err);
        }
    };
    

    const handleEditIconClick = () => {
        fileInputRef.current.click();
    };

    useEffect(() => {
        // if there is an image URL and imageId is not empty
        if (content.imageUrl && content.imageId !== "" && projectImage === null) {
            showImage(content.imageUrl, content.imageId)
                .then(blob => {
                    const objectUrl = URL.createObjectURL(blob);
                    setProjectImage(objectUrl);
                })
                .catch(err => {
                    console.error(err);
                });
        }else {
            setProjectImage(content.imageUrl);
        }
    }, [content.imageUrl, content.imageId]);

    console.log('projectImage', content.imageUrl);
    console.log('content', content.imageId);

    return (
        <>            
            <PortfolioItemWithPopupWrapper 
                popupLocation="top-right-over"
                popupContentClasses="project-edit-image-popup-content"
                popoverContent={
                    <div className='hz-center' onClick={handleEditIconClick}>
                        <EditOutlinedIcon />
                        <div>Edit Image</div>
                    </div>
                } 
            >
                <img 
                    className='portfolio-image'
                    src={projectImage}
                    alt="portfolio image" 
                    style={{ height: '15rem', width: '15rem', borderRadius: '5px'}}
                />
                <VisuallyHiddenInput 
                    type='file' 
                    accept='image/*' 
                    multiple={false}
                    ref={fileInputRef}
                    onChange={(event) => handleImageChange(event.target.files)}
                />
            </PortfolioItemWithPopupWrapper>
        </>
    );
};

export default ProjectImage;