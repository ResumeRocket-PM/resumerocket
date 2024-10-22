import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, TextField, Button, DialogActions } from "@mui/material";
import UniversityDropdown from './UniversityDropdown'; // Import your UniversityDropdown component
import MajorDropdown from './MajorDropdown'; // Import your MajorDropdown component

const EditEducationDialog = ({ dialogOpen, setDialogOpen, education, onClose }) => {
    const openType = dialogOpen.split('-')[0];
    const index = !isNaN(parseInt(dialogOpen.split('-')[1])) ? parseInt(dialogOpen.split('-')[1]) : null;

    const [formData, setFormData] = useState({
        schoolName: '',
        degree: '',
        major: '',
        minor: '',
        graduationDate: ''
    });

    const [errorMessages, setErrorMessages] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        validateForm({ ...formData, [name]: value });
    };

    const validateForm = (data) => {
        const errors = {};
        if (!data.schoolName) errors.schoolName = "School name is required.";
        if (!data.degree) errors.degree = "Degree is required.";
        if (!data.major) errors.major = "Major is required.";
        if (!data.graduationDate) errors.graduationDate = "Graduation date is required.";
        
        setErrorMessages(errors);
        setIsFormValid(Object.keys(errors).length === 0);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!isFormValid) {
            return;
        }

        const updatedEducation = [...education]; 

        if (index !== null && index >= 0 && index < updatedEducation.length) {
            updatedEducation[index] = {
                ...updatedEducation[index],
                ...formData 
            };
        } else {
            updatedEducation.push({
                educationId: updatedEducation.length, 
                ...formData
            });
        }

        onClose('Education', updatedEducation);
        setDialogOpen('none');
    };

    const handleDelete = () => {
        if (index !== null && education) {
            const updatedEducation = [...education];

            if (index !== null && index >= 0 && index < updatedEducation.length) {
                updatedEducation.splice(index, 1);
                onClose('Education', updatedEducation);
            }
        }
        setDialogOpen('none');
    };

    const isValidDate = (date) => {
        return date instanceof Date && !isNaN(date.getTime());
    };

    const parseDate = (dateString) => {
        const date = new Date(dateString);
        return isValidDate(date) ? date : null;
    };

    useEffect(() => {
        if (index !== null && education[index]) {
            const selectedEducation = education[index];
            
            setFormData({
                schoolName: selectedEducation.schoolName,
                degree: selectedEducation.degree,
                major: selectedEducation.major,
                minor: selectedEducation.minor,
                graduationDate: selectedEducation.graduationDate ? parseDate(selectedEducation.graduationDate).toISOString().split('T')[0] : ''
            });
        } else {
            setFormData({
                schoolName: '',
                degree: '',
                major: '',
                minor: '',
                graduationDate: ''
            });
        }
    }, [index, education]);

    return (
        <Dialog
            open={openType === 'Education'}
            onClose={() => setDialogOpen('none')}
        >
            <DialogTitle>{index === null ? 'Add Education' : 'Edit Education'}</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    
                    <UniversityDropdown
                        selectedUniversity={formData.schoolName}  // Pass current schoolName as selected value
                        onUniversitySelect={handleChange} // Handle the university change
                    />
                    <TextField
                        label='Degree'
                        name='degree'
                        value={formData.degree}
                        onChange={handleChange}
                        fullWidth
                        margin='normal'
                        error={Boolean(errorMessages.degree)}
                        helperText={errorMessages.degree}
                    />

                    <MajorDropdown
                        label = 'Major'
                        selectedMajor={formData.majorName}  // Pass current schoolName as selected value
                        onMajorSelect={handleChange} // Handle the university change
                    />
                    
                    <MajorDropdown
                        label='Minor'
                        selectedMajor={formData.majorName}  // Pass current schoolName as selected value
                        onMajorSelect={handleChange} // Handle the university change
                    />

                    <TextField
                        label='Graduation Date'
                        name='graduationDate'
                        type='date'
                        value={formData.graduationDate}
                        onChange={handleChange}
                        fullWidth
                        margin='normal'
                        InputLabelProps={{
                            shrink: true,
                        }}
                        error={Boolean(errorMessages.graduationDate)}
                        helperText={errorMessages.graduationDate}
                    />
                </form>
            </DialogContent>
            <DialogActions>
                {index !== null && (
                    <Button variant='contained' color='secondary' onClick={handleDelete} style={{ marginLeft: 'auto' }}>
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
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditEducationDialog;
