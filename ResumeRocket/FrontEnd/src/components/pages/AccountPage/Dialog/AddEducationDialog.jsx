import {useState} from 'react';
import { Dialog, DialogContent, DialogTitle, TextField, Button } from "@mui/material"

const AddEducationDialog = ({ dialogOpen, setDialogOpen, onClose }) => {
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
        setDialogOpen('none');
    };

    return (
        <Dialog
            open={dialogOpen === 'addEducation'}
            onClose={() => setDialogOpen('none')}
        >
            <DialogTitle>Add Education</DialogTitle>
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
                        Add
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddEducationDialog;