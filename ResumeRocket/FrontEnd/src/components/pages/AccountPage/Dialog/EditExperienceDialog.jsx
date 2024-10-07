import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, TextField, Button, DialogActions, Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const EditExperienceDialog = ({ dialogOpen, setDialogOpen, experience, onClose }) => {
    const openType = dialogOpen.split('-')[0];
    const index = !isNaN(parseInt(dialogOpen.split('-')[1])) ? parseInt(dialogOpen.split('-')[1]) : null;

    const [formData, setFormData] = useState({
        company: '',
        position: '',
        type: '',
        description: '',
        startDate: '',
        endDate: ''
    });

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
            if (value === '') {
                setFormData({
                    ...formData,
                    [name]: ''
                });
            } else {
                if (isValidDate(parseDate(value))) {
                    const dateParts = value.split('/');
                    const formattedDate = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
                    setFormData({
                        ...formData,
                        [name]: formattedDate.toISOString().split('T')[0] // Format as YYYY-MM-DD
                    });
                }
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

        const updatedExperience = [...experience]; 

        if (index !== null  && index >= 0 && index < updatedExperience.length) {
            updatedExperience[index] = {
                ...updatedExperience[index],
                ...formData 
            };
        } else {
            updatedExperience.push({
                experienceId: updatedExperience.length, 
                ...formData
            });
        }

        onClose('Experience', updatedExperience);

        setDialogOpen('none');
    };

    const handleDelete = () => {
        if (index !== null  &&  index !== null && experience) {
            const updatedExperience = [...experience];
            updatedExperience.splice(index, 1);
            onClose('Experience', updatedExperience);
        }
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

    const isFormValid = () => {
        const startDate = new Date(formData.startDate);
        const endDate = formData.endDate ? new Date(formData.endDate) : null;

        return (
            formData.company &&
            formData.position &&
            formData.type &&
            formData.description &&
            formData.startDate &&
            (!formData.endDate || startDate <= endDate) // Allow endDate to be equal to startDate
        );
    };

    return (
        <Dialog
            open={openType === 'Experience'}
            onClose={() => setDialogOpen('none')}
        >
            <DialogTitle>{index !== null ? 'Edit Experience' : 'Add Experience'}</DialogTitle>
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
                    <FormControl fullWidth margin='normal'>
                        <InputLabel>Type</InputLabel>
                        <Select
                            name='type'
                            value={formData.type}
                            onChange={handleChange}
                        >
                            <MenuItem value="FullTime">FullTime</MenuItem>
                            <MenuItem value="PartTime">PartTime</MenuItem>
                        </Select>
                    </FormControl>
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
                </form>
            </DialogContent>
            <DialogActions>

                {index !== null && (
                        <Button onClick={handleDelete} variant='contained' color='secondary' style={{ marginLeft: 'auto' }}>
                            Delete
                        </Button>
                    )}
                <Button 
                    type='submit' 
                    variant='contained' 
                    color='primary'
                    disabled={!isFormValid()} 
                    onClick={handleSubmit} // Use onClick to handle form submission
                >
                    {index !== null ? 'Save' : 'Add'}
                </Button>


            </DialogActions>
        </Dialog>
    );
};

export default EditExperienceDialog;
