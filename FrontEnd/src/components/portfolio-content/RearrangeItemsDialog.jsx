import { useState, useContext, useEffect,useRef } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { VisuallyHiddenInput } from '../../utils/muiHelpers';


const RearrangeItemsDialog = ({ open, setOpen, items, setItems }) => {
    const [tempItems, setTempItems] = useState(items);
    const [isGrabbing, setIsGrabbing] = useState(false);

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const newItems = Array.from(tempItems);
        const [movedSection] = newItems.splice(result.source.index, 1);
        newItems.splice(result.destination.index, 0, movedSection);
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
    };

    const getListStyle = isDraggingOver => ({
        background: isDraggingOver ? 'lightblue' : 'white',
        display: 'flex',
        // padding: grid,
        overflow: 'auto',
      });


    return (
        <>
            <Dialog
                open={open}
                onClose={handleDialogClose}
                aria-labelledby="rearrange-dialog-title"
                aria-describedby="rearrange-dialog-description"
            >
                <DialogTitle id="rearrange-dialog-title">Rearrange Sections</DialogTitle>
                <DialogContent>
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="sections" direction={'vertical'}>
                            {(provided, snapshot) => (
                                <div
                                    {...provided.droppableProps}
                                    style={getListStyle(snapshot.isDraggingOver)}
                                    ref={provided.innerRef}
                                    className={[
                                        'rearrange-sections-container',
                                        'column-layout',
                                    ].join(' ')}                                >
                                    {tempItems.map((item, index) => (
                                        <Draggable key={index} draggableId={index.toString()} index={index}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className={[
                                                        'rearrange-section-block',
                                                        isGrabbing ? 'grabbing' : '',
                                                        snapshot.isDragging ? 'dragging' : ''
                                                    ].join(' ')}
                                                    onMouseDown={handleMouseDown}
                                                    onMouseUp={handleMouseUp}
                                                >
                                                    {item.type}
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
        </>
    );
};

export default RearrangeItemsDialog;