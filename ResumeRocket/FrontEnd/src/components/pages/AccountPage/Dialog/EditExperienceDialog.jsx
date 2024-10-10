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

    const [formErrors, setFormErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    const isValidDate = (date) => {
        return date instanceof Date && !isNaN(date.getTime());
    };

    const parseDate = (dateString) => {
        const date = new Date(dateString);
        return isValidDate(date) ? date : null;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
        // Validate form on every change
        validateForm({ ...formData, [name]: value });
    };

    const validateForm = (data) => {
        const errors = {};
        if (!data.company) errors.company = "Company is required.";
        if (!data.position) errors.position = "Position is required.";
        if (!data.type) errors.type = "Type is required.";
        if (!data.description) errors.description = "Description is required.";
        if (!data.startDate) errors.startDate = "Start Date is required.";
        if (data.endDate && new Date(data.startDate) > new Date(data.endDate)) {
            errors.endDate = "End Date must be after Start Date.";
        }

        setFormErrors(errors);
        setIsFormValid(Object.keys(errors).length === 0);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!isFormValid) {
            return; // Do not proceed if there are errors
        }

        const updatedExperience = [...experience]; 

        if (index !== null && index >= 0 && index < updatedExperience.length) {
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
        if (index !== null && experience) {
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
            setFormErrors({}); 
        } else {
            setFormData({
                company: '',
                position: '',
                type: '',
                description: '',
                startDate: '',
                endDate: ''
            });
            setFormErrors({});
            setIsFormValid(false);
        }
    }, [index, experience]);

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
                        error={!!formErrors.company}
                        helperText={formErrors.company}
                    />
                    <TextField
                        label='Position'
                        name='position'
                        value={formData.position}
                        onChange={handleChange}
                        fullWidth
                        margin='normal'
                        error={!!formErrors.position}
                        helperText={formErrors.position}
                    />
                    <FormControl fullWidth margin='normal' error={!!formErrors.type}>
                        <InputLabel>Type</InputLabel>
                        <Select
                            name='type'
                            value={formData.type}
                            onChange={handleChange}
                        >
                            <MenuItem value="FullTime">FullTime</MenuItem>
                            <MenuItem value="PartTime">PartTime</MenuItem>
                        </Select>
                        {formErrors.type && <div style={{ color: 'red' }}>{formErrors.type}</div>}
                    </FormControl>
                    <TextField
                        label='Description'
                        name='description'
                        multiline
                        value={formData.description}
                        onChange={handleChange}
                        fullWidth
                        margin='normal'
                        error={!!formErrors.description}
                        helperText={formErrors.description}
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
                        error={!!formErrors.startDate}
                        helperText={formErrors.startDate}
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
                        error={!!formErrors.endDate}
                        helperText={formErrors.endDate}
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
                    onClick={handleSubmit} 
                    disabled={!isFormValid}
                >
                    {index !== null ? 'Save' : 'Add'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditExperienceDialog;
