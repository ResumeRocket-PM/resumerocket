import {useState, useEffect} from 'react';
import { Dialog, DialogContent, DialogTitle, TextField, Button } from "@mui/material"
import { useApi } from "../../../../hooks.js";

const AddExperienceDialog = ({ dialogOpen, setDialogOpen, userDetails, setUserDetails, onClose }) => {
    const api = useApi();

    const [formData, setFormData] = useState({
        company: '',
        position: '',
        type: '',
        description: '',
        startDate: '',
        endDate: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const sanitizedData = {};
        for (const key in formData) {
            if (formData[key] === '') {
                sanitizedData[key] = null;
            } else {
                sanitizedData[key] = formData[key];
            }
        }

        api.post('/account/experience', sanitizedData).then(response => {
            if (response.ok) {
              response.json().then(data => {
                onClose()
              });
            }
            else {
              console.log("Failed to save account");
            }
          })

        // Close the dialog
        setDialogOpen('none');
    };

    return (
        <Dialog
            open={dialogOpen === 'addExperience'}
            onClose={() => setDialogOpen('none')}
        >
            <DialogTitle>Add Experience</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label='Company'
                        name='company'
                        value={formData.company}
                        onChange={handleChange}
                        fullWidth
                        margin='normal'
                    />
                    <TextField
                        label='Position'
                        name='position'
                        value={formData.position}
                        onChange={handleChange}
                        fullWidth
                        margin='normal'
                    />
                    <TextField
                        label='Type'
                        name='type'
                        value={formData.type}
                        onChange={handleChange}
                        fullWidth
                        margin='normal'
                    />
                    <TextField
                        label='Description'
                        name='description'
                        value={formData.description}
                        onChange={handleChange}
                        fullWidth
                        margin='normal'
                    />
                    <TextField
                        label='Start Date'
                        name='startDate'
                        type='date'
                        value={formData.startDate}
                        onChange={handleChange}
                        fullWidth
                        margin='normal'
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        label='End Date'
                        name='endDate'
                        type='date'
                        value={formData.endDate}
                        onChange={handleChange}
                        fullWidth
                        margin='normal'
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Button type='submit' variant='contained' color='primary'>
                        Add
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};


export default AddExperienceDialog;