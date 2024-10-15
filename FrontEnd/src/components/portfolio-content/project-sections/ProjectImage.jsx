import { useContext, useState } from 'react';
import ProjectSectionWrapper from '../ProjectSectionWrapper';
import { PortfolioEditContext } from '../../../context/PortfolioEditProvider';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { VisuallyHiddenInput } from '../../../utils/muiHelpers';
import cameraIcon from '../../../assets/portfolio/camera-solid.svg';
import TextField from '@mui/material/TextField';
import PortfolioItemWithPopupWrapper from '../PortfolioItemWithPopupWrapper';
import ItemWithDialogWrapper from '../ItemWithDialogWrapper';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Edit } from '@mui/icons-material';


const ProjectImage = ({ project, setProject, content, sectionIndex }) => {
    const { editMode } = useContext(PortfolioEditContext);
    // const [imageURL, setImageURL] = useState(content.imageURL);
    const [imageURL, setImageURL] = useState('https://64.media.tumblr.com/0e7cf00818a80d639465cfa74e5f8282/5f4ab7b2d961f3d7-e9/s400x600/d56fb2bb9fee3e8b0ad9212119769972fcf67564.jpg');  
    const [addImageDialogOpen, setAddImageDialogOpen] = useState(false);
    const [popoverOpen, setPopoverOpen] = useState(false);

    return (
        <>
            {/* // *** We'll use this when we actually have image uploading functionality ***    
            // <Button 
            //     component='label'
            //     role={undefined}
            //     tabIndex={-1}
            //     variant='outlined' 
            //     startIcon={<AddIcon/>} 
            //     sx={{"&:hover": {backgroundColor:'lightblue'}, marginTop: '1rem', height: '15rem', width: '15rem', borderRadius: '5px'}}
            // >
            //     Add Picture
            //     <VisuallyHiddenInput 
            //         type='file' 
            //         accept='image/*' 
            //         onChange={(event) => console.log(event.target.files)}
            //     />
            // </Button>    */}
            
            <PortfolioItemWithPopupWrapper 
                popoverOpen={popoverOpen}
                setPopoverOpen={setPopoverOpen}
                popupLocation="top-right-over"
                popoverContent={
                    <ItemWithDialogWrapper
                        isOpen={addImageDialogOpen}
                        setIsOpen={setAddImageDialogOpen}
                        onClose={() => setPopoverOpen(false)}
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
                            <EditOutlinedIcon />
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
        </>
    );
};

export default ProjectImage;