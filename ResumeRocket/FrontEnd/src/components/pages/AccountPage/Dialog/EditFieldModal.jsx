import {useState, useEffect} from 'react';
import { Dialog, DialogContent, DialogTitle, TextField } from "@mui/material"

const EditFieldModal = ({dialogOpen, setDialogOpen, fieldName, fieldValue, onClose }) => {
    const [newValue, setNewValue] = useState(fieldValue);

    const handleClose = () => { 
        setDialogOpen('none');
        onClose(fieldName, newValue);
    }

    return (
        <Dialog
            open={dialogOpen === 'edit' + fieldName}
            onClose={() => handleClose()}
        >
            <DialogTitle>Edit {fieldName}</DialogTitle>
            <DialogContent sx={{ width: '30rem' }}>
                <TextField
                    label={'Modify ' + fieldName}
                    name={fieldName}
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    fullWidth
                    margin='normal'
                >
                </TextField>
            </DialogContent>
        </Dialog>
    );
}

export default EditFieldModal;