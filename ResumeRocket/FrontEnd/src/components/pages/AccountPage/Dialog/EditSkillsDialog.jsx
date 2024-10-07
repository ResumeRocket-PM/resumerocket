import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, TextField, Button, Chip } from '@mui/material';

const EditSkillsDialog = ({ dialogOpen, setDialogOpen, skills, onClose }) => {
    const [newSkill, setNewSkill] = useState('');
    const [currentSkills, setCurrentSkills] = useState(skills);

    // Delete a skill
    const handleDeleteSkill = (index) => {
        setCurrentSkills((prevSkills) => prevSkills.filter((_, i) => i !== index));
    };

    // Add a new skill
    const handleAddSkill = () => {
        if (newSkill.trim()) {
            setCurrentSkills((prevSkills) => [
                ...prevSkills,
                { description: newSkill.trim() } // Add the skill in the correct format
            ]);
            setNewSkill(''); // Reset the input field
        }
    };

    // Handle Enter key for adding a skill
    const handleKeyUp = (e) => {
        if (e.key === 'Enter') {
            handleAddSkill();
        }
    };

    // Update current skills when the prop skills change
    useEffect(() => {
        setCurrentSkills(skills);
    }, [skills]);

    // Handle closing the dialog
    const handleClose = () => {
        console.log('currentSkills', currentSkills);
        onClose('Skill', currentSkills); // Send current skills back unchanged
        setDialogOpen('none'); // Close the dialog
    };

    return (
        <Dialog open={dialogOpen === 'Skills'} onClose={handleClose}>
            <DialogTitle>Edit Skills</DialogTitle>
            <DialogContent sx={{ width: '30rem' }}>
                <TextField
                    label="Add Skill"
                    name="skillName"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyUp={handleKeyUp}
                    fullWidth
                    margin="normal"
                />
                <div>
                    {currentSkills.map((skill, index) => (
                        <Chip
                            key={index}
                            label={skill.description} // Access description correctly
                            onDelete={() => handleDeleteSkill(index)}
                            color="primary"
                            variant="outlined"
                            style={{ margin: '0.5rem' }}
                        />
                    ))}
                </div>
                <div id="edit-skills-save-button" className="hz-right">
                    <Button
                        onClick={handleClose}
                        variant="contained"
                        color="primary"
                    >
                        Save
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default EditSkillsDialog;
