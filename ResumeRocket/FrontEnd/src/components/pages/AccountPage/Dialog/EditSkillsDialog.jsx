import {useState, useEffect} from 'react';
import Chip from '@mui/material/Chip';
import { Dialog, DialogContent, DialogTitle, TextField, Button } from "@mui/material"

const EditSkillsDialog = ({ dialogOpen, setDialogOpen, skills }) => {
    const [newSkill, setNewSkill] = useState('');
    const [currentSkills, setCurrentSkills] = useState(skills);
    
    const handleDeleteSkill = (index) => {
        const updatedSkills = currentSkills.filter((skill, i) => i !== index);
        setCurrentSkills(updatedSkills);
    };

    const onClose = () => { 
        setDialogOpen('none');
        setTimeout(() => {
            setCurrentSkills(skills);
        }, 500);
    }

    return (
        <Dialog
            open={dialogOpen === 'editSkills'}
            onClose={() => onClose()}
        >
            <DialogTitle>Edit Skills</DialogTitle>
            <DialogContent sx={{ width: '30rem' }}>
                <TextField
                    label='Add Skill'
                    name='skillName'
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyUp={(e) => {
                        if (e.key === 'Enter') {
                            setCurrentSkills([...currentSkills, newSkill]);
                            setNewSkill('');
                        }
                    }}
                    fullWidth
                    margin='normal'
                >
                </TextField>
                <div>
                    {currentSkills.map((skill, index) => (
                        <Chip
                            key={index}
                            label={skill}
                            onDelete={() => handleDeleteSkill(index)}
                            color="primary"
                            variant="outlined"
                            style={{ margin: '0.5rem' }}
                        />
                    ))}
                </div>
                <div id='edit-skills-save-button' className='hz-right'>
                    <Button
                        onClick={() => {
                            // Process form data here
                            console.log(currentSkills);
                            // Close the dialog
                            setDialogOpen('none');
                        }}
                        variant='contained'
                        color='primary'
                    >
                        Save
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default EditSkillsDialog;