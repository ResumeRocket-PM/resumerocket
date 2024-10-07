import {useState, useEffect} from 'react';
import { Dialog, DialogContent, DialogTitle, TextField, Button } from "@mui/material"

const EditExperienceDialog = ({ dialogOpen, setDialogOpen, experience, onClose }) => {
    // parse dialogOpen to get the index of the experience entry to edit
    const openType = dialogOpen.split('-')[0];
    const index = !isNaN(parseInt(dialogOpen.split('-')[1])) ? parseInt(dialogOpen.split('-')[1]) : null;
    // console.log(parseInt(dialogOpen.split('-')[1]));
    // console.log(experience[index].company);

    if (index !== null) {
        console.log(experience[index].company);
    }
    
    const [formData, setFormData] = useState({});

    const isValidDate = (date) => {
        return date instanceof Date && !isNaN(date.getTime());
    };
    
    const parseDate = (dateString) => {
        const date = new Date(dateString);
        return isValidDate(date) ? date : null;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'startDate' || name === 'endDate') {

            if(isValidDate(parseDate(value)) )
            {
                // Convert the date string to a Date object
                const dateParts = value.split('/');
                const formattedDate = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
                setFormData({
                    ...formData,
                    [name]: formattedDate.toISOString().split('T')[0] // Format as YYYY-MM-DD
                });
            }

        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Process form data here
        console.log(formData);
        // Close the dialog
        setDialogOpen('none');
    };

    useEffect(() => {
        if (index !== null && experience[index]) {
            const selectedExperience = experience[index];
        
    
            setFormData({
                company: selectedExperience.company,
                position: selectedExperience.position,
                type: selectedExperience.type,
                description: selectedExperience.description,
                startDate: selectedExperience.startDate ? parseDate(selectedExperience.startDate).toISOString().split('T')[0] : '',
                endDate: selectedExperience.endDate ? parseDate(selectedExperience.endDate).toISOString().split('T')[0] : ''
            });
        } else {
            setFormData({
                company: '',
                position: '',
                type: '',
                description: '',
                startDate: '',
                endDate: ''
            });
        }
    }, [index, experience]);

    return (
        <Dialog
            open={openType === 'editExperience'}
            onClose={() => setDialogOpen('none')}
        >
            <DialogTitle>Edit Experience</DialogTitle>
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
                        multiline
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
                        Edit
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditExperienceDialog;