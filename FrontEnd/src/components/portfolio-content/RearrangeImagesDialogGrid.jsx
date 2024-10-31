import React, { useState, useEffect, useContext, useRef } from 'react';
import { Dialog, DialogTitle, DialogContent, Button } from '@mui/material';
import { ImageContext } from '../../context/ImageProvider';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { VisuallyHiddenInput } from '../../utils/muiHelpers';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';

const RearrangeImagesDialogGrid = ({ open, setOpen, items, setItems }) => {
    const [tempItems, setTempItems] = useState(items);
    const { showImage, uploadImage } = useContext(ImageContext);
    const [imageUrls, setImageUrls] = useState(items.map(item => item.imageUrl));
    const [draggingIndex, setDraggingIndex] = useState(null);
    const [hoverIndex, setHoverIndex] = useState(null);
    const fileInputRef = useRef(null);
    const deleteButtonRef = useRef(null);


    // const openPopover = Boolean(anchorEl);
    const [openPopover, setOpenPopover] = useState(false);



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

    useEffect(() => {
        if (tempItems.length === 0) return;
        fetchImageUrls();
    }, [tempItems]);

    // useEffect(() => {
    //     setTempItems(items);
    //     setImageUrls(items.map(item => item.imageUrl));
    // }, [items]);

    const handleDragStart = (index) => {
        setDraggingIndex(index);
    };

    const handleDragEnter = (index) => {
        setHoverIndex(index);
    };

    const handleDragEnd = () => {
        if (draggingIndex !== null && hoverIndex !== null && draggingIndex !== hoverIndex) {
            const newItems = Array.from(tempItems);
            const [movedItem] = newItems.splice(draggingIndex, 1);
            newItems.splice(hoverIndex, 0, movedItem);

            const newImageUrls = Array.from(imageUrls);
            const [movedImageUrl] = newImageUrls.splice(draggingIndex, 1);
            newImageUrls.splice(hoverIndex, 0, movedImageUrl);

            setTempItems(newItems);
            setImageUrls(newImageUrls);
        }
        setDraggingIndex(null);
        setHoverIndex(null);
    };

    const handleMouseDown = (event, index) => {
        if (deleteButtonRef.current && deleteButtonRef.current.contains(event.target)) {
            handleDelete(index);
        } else {
            setDraggingIndex(true);
            setOpenPopover(false);
        }
    };

    const handleMouseUp = () => {
        setDraggingIndex(false);
    };

    const handleDialogClose = () => {
        setOpen(false);
    };

    const handleUploadButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleImageUpload = (files) => {
        const file = files[0];
        if (file) {
            uploadImage(file)
                .then((data) => {
                    const newItems = [...tempItems];
                    newItems.push({ imageUrl: data.url, imageId: data.imageId });
                    setTempItems(newItems);
                })
                .catch((err) => {
                    console.error(err);
                });
        }        
    };

    const handleRearrangeSave = () => {
        setItems(tempItems);
        setOpen(false);
    }

    const handleDelete = (index) => {
        const newItems = tempItems.filter((_, i) => i !== index);
        // const newImageUrls = imageUrls.filter((_, i) => i !== index);
        setTempItems(newItems);
        // setImageUrls(newImageUrls);
        // setItems(newItems);
        // setAnchorEl(null);
    };

    // const handlePopoverOpen = (event, index) => {
    //     console.log('handlePopoverOpen:', index);
    //     setOpenPopover(true);
    //     setAnchorEl(event.currentTarget);
    //     setHoverIndex(index);
    // };

    // const handlePopoverClose = () => {
    //     console.log('handlePopoverClose');
    //     setOpenPopover(false);
    //     setAnchorEl(null);
    //     setHoverIndex(null);
    // };


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
                    <div className="grid-container" >
                        {imageUrls.map((url, index) => (
                        <div
                        key={index}
                        className={`grid-item ${draggingIndex === index ? 'dragging' : ''} ${hoverIndex === index ? 'hover' : ''}`}
                        draggable
                        onDragStart={() => handleDragStart(index)}
                        onDragEnter={() => handleDragEnter(index)}
                        onDragEnd={handleDragEnd}
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                        onMouseOver={() => setHoverIndex(index)}
                        onMouseOut={() => setHoverIndex(null)}
                    >
                        <img src={url} alt={`Image ${index}`} />
                        {hoverIndex === index && !draggingIndex && (
                            <div className="delete-button" ref={deleteButtonRef}>
                                <IconButton
                                    onClick={() => handleDelete(index)}
                                    sx={{
                                        backgroundColor: 'red',
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: 'darkred',
                                        },
                                        width: '1.25rem',
                                        height: '1.25rem',
                                    }}
                                >
                                    <CloseIcon />
                                </IconButton>
                            </div>
                        )}
                    </div>
                        ))}
                    </div>
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

export default RearrangeImagesDialogGrid;