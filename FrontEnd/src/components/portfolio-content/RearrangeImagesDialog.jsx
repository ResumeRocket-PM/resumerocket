import { useState, useContext, useEffect,useRef } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { ImageContext } from '../../context/ImageProvider';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { VisuallyHiddenInput } from '../../utils/muiHelpers';


const RearrangeImagesDialog = ({ open, setOpen, items, setItems }) => {
    const [tempItems, setTempItems] = useState(items);
    const { showImage, uploadImage } = useContext(ImageContext);
    const [imageUrls, setImageUrls] = useState([]);
    const [isGrabbing, setIsGrabbing] = useState(false);
    const fileInputRef = useRef(null);

    const fetchImageUrls = async () => {
        const urls = [];
        for (let i = 0; i < tempItems.length; i++) {
            const section = tempItems[i];
            if (section.imageUrl && section.imageId) {
                let url = await showImage(section.imageUrl, section.imageId);
                url = URL.createObjectURL(url);
                urls[i] = url;
            }else {
                urls[i] = section.imageUrl;
            }
        }
        console.log('urls in fetchImageUrls:', urls);
        setImageUrls(urls);
    };

    // //set imageUrls
    // useEffect(() => {
    //     const fetchImageUrlsFromProps = async () => {
    //         const urls = [];
    //         for (let i = 0; i < items.length; i++) {
    //             const section = items[i];
    //             if (section.imageUrl && section.imageId) {
    //                 let url = await showImage(section.imageUrl, section.imageId);
    //                 url = URL.createObjectURL(url);
    //                 urls[i] = url;
    //             }else {
    //                 urls[i] = section.imageUrl;
    //             }
    //         }
    //         console.log('urls in fetchImageUrlsFromProps:', urls);
    //         setImageUrls(urls);
    //     };

    //     fetchImageUrlsFromProps();
    // }, []);

    //update imageUrls when tempItems changes
    useEffect(() => {
        if (tempItems.length === 0) return;
        fetchImageUrls();
    }, [tempItems]);

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const newItems = Array.from(tempItems);
        const [movedSection] = newItems.splice(result.source.index, 1);
        newItems.splice(result.destination.index, 0, movedSection);

        // const newItems = reorder(
        //     localSections,
        //     result.source.index,
        //     result.destination.index
        // );

        setTempItems(newItems);
    };

    const handleRearrangeSave = () => {
        setItems(tempItems);
        handleDialogClose();
    };

    const handleMouseDown = () => {
        setIsGrabbing(true);
    };

    const handleMouseUp = () => {
        setIsGrabbing(false);
    };

    const handleDialogClose = () => {   
        setOpen(false);
        // setItemsAreImages(false);
    };

    const getListStyle = isDraggingOver => ({
        background: isDraggingOver ? 'lightblue' : 'lightgrey',
        display: 'flex',
        // padding: grid,
        overflow: 'auto',
      });

    const handleUploadButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleImageUpload = (files) => {
        const file = files[0];
        if (file) {
            uploadImage(file)
                .then((data) => {
                    console.log('image uploaded:', data);
                    const newItems = [...tempItems];
                    newItems.push({ imageUrl: data.url, imageId: data.imageId });
                    console.log('new items:', newItems);
                    setTempItems(newItems);
                })
                .catch((err) => {
                    console.error(err);
                });
        }        
    };

    // console.log('items:', items);   
    // console.log('tempItems:', tempItems);
    // console.log('imageUrls:', imageUrls);


    return (
        <>
            <Dialog
                open={open}
                onClose={handleDialogClose}
                aria-labelledby="rearrange-dialog-title"
                aria-describedby="rearrange-dialog-description"
            >
                <DialogTitle id="rearrange-dialog-title">Rearrange Images</DialogTitle>
                <DialogContent>
                    <Button variant='contained' onClick={handleUploadButtonClick} sx={{marginBottom: '.5rem'}}>
                        <FileUploadIcon />
                        Upload
                    </Button>
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="sections" direction={'horizontal'}>
                            {(provided, snapshot) => (
                                <div
                                    {...provided.droppableProps}
                                    style={getListStyle(snapshot.isDraggingOver)}
                                    ref={provided.innerRef}
                                    className={[
                                        'rearrange-sections-container',
                                        'row-layout',
                                    ].join(' ')}
                                >
                                    {imageUrls?.map((imageUrl, index) => (
                                        <Draggable key={index} draggableId={index.toString()} index={index}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className={[
                                                        'rearrange-section-block-image',
                                                        isGrabbing ? 'grabbing' : '',
                                                        snapshot.isDragging ? 'dragging' : ''
                                                    ].join(' ')}
                                                    onMouseDown={handleMouseDown}
                                                    onMouseUp={handleMouseUp}
                                                >
                                                    {imageUrls[index] ? (
                                                        <img src={imageUrl} alt="gallery image preview" />
                                                    ) : (
                                                        imageUrl.type
                                                    )}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                    <Button onClick={handleRearrangeSave}>Save</Button>
                </DialogContent>
            </Dialog>
            <VisuallyHiddenInput
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={(event) => handleImageUpload(event.target.files)}
            />
        </>
    );
};

export default RearrangeImagesDialog;