import {useState, useEffect} from 'react';
import { Dialog, DialogContent, DialogTitle, TextField, Button } from "@mui/material"

const EditEducationDialog = ({ dialogOpen, setDialogOpen, education, onClose }) => {
    // Parse dialogOpen to get the index of the education entry to edit
    const openType = dialogOpen.split('-')[0];
    const index = !isNaN(parseInt(dialogOpen.split('-')[1])) ? parseInt(dialogOpen.split('-')[1]) : null;

    const [formData, setFormData] = useState({
        schoolName: '',
        degree: '',
        major: '',
        minor: '',
        graduationDate: '',
        courses: ''
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
        // Handle form submission logic here
    };

    const isValidDate = (date) => {
        return date instanceof Date && !isNaN(date.getTime());
    };
    
    const parseDate = (dateString) => {
        const date = new Date(dateString);
        return isValidDate(date) ? date : null;
    };
    
    useEffect(() => {
        if (index !== null) {
            const selectedEducation = education[index];

            setFormData({
                schoolName: selectedEducation.schoolName,
                degree: selectedEducation.degree,
                major: selectedEducation.major,
                minor: selectedEducation.minor,
                graduationDate: selectedEducation.graduationDate ? parseDate(selectedEducation.graduationDate).toISOString().split('T')[0] : '',
                courses: selectedEducation.courses.join(', ')
            });
        } else {
            setFormData({
                schoolName: '',
                degree: '',
                major: '',
                minor: '',
                graduationDate: '',
                courses: ''
            });
        }
    }, [index, education]);

    return (
        <Dialog
            open={openType === 'editEducation'}
            onClose={() => setDialogOpen('none')}
        >
            <DialogTitle>Edit Education</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label='School Name'
                        name='schoolName'
                        value={formData.schoolName}
                        onChange={handleChange}
                        fullWidth
                        margin='normal'
                    />
                    <TextField
                        label='Degree'
                        name='degree'
                        value={formData.degree}
                        onChange={handleChange}
                        fullWidth
                        margin='normal'
                    />
                    <TextField
                        label='Major'
                        name='major'
                        value={formData.major}
                        onChange={handleChange}
                        fullWidth
                        margin='normal'
                    />
                    <TextField
                        label='Minor'
                        name='minor'
                        value={formData.minor}
                        onChange={handleChange}
                        fullWidth
                        margin='normal'
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
                    />
                    <TextField
                        label='Courses'
                        name='courses'
                        value={formData.courses}
                        onChange={handleChange}
                        fullWidth
                        margin='normal'
                    />
                    <Button type='submit' variant='contained' color='primary'>
                        Edit
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditEducationDialog;