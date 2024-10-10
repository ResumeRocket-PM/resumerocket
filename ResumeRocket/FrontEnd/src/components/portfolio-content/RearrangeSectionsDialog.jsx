import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const RearrangeSectionsDialog = ({ rearrangeDialogOpen, setRearrangeDialogOpen, project, setProject }) => {
    const [localSections, setLocalSections] = useState(project.sections);

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const newSections = Array.from(localSections);
        const [movedSection] = newSections.splice(result.source.index, 1);
        newSections.splice(result.destination.index, 0, movedSection);

        setLocalSections(newSections);
    };

    const handleRearrange = () => {
        setProject(prevProject => ({
            ...prevProject,
            sections: localSections,
        }));
        setRearrangeDialogOpen(false);
    };

    return (
        <Dialog
            open={rearrangeDialogOpen}
            onClose={() => setRearrangeDialogOpen(false)}
            aria-labelledby="rearrange-dialog-title"
            aria-describedby="rearrange-dialog-description"
        >
            <DialogTitle id="rearrange-dialog-title">Rearrange Sections</DialogTitle>
            <DialogContent>
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="sections">
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="rearrange-sections-container"
                            >
                                {localSections.map((section, index) => (
                                    <Draggable key={index} draggableId={index.toString()} index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className={`rearrange-section-block ${snapshot.isDragging ? 'dragging' : ''}`}
                                            >
                                                {section.type}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
                <Button onClick={handleRearrange}>Save</Button>
            </DialogContent>
        </Dialog>
    );
};

export default RearrangeSectionsDialog;