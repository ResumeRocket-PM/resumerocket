import React, { useState } from "react";
import "../../../styles/ExperienceBodyDefault.css";
import PortfolioNavbar from "../PortfolioNavbar";
import DialogButton from "../../DialogButton";
import { TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { experienceItemDefault } from "../../../example_responses/portfolioContent";
import Button from "@mui/material/Button";

const ExperienceBody = ({ editMode, portfolioContent, setPortfolioContent }) => {
    const [experienceToAdd, setExperienceToAdd] = useState(experienceItemDefault);
    const [addExperienceOpen, setAddExperienceOpen] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});

    const handleInputChange = (key) => (event) => {
        setExperienceToAdd({
            ...experienceToAdd,
            [key]: event.target.value,
        });
        setValidationErrors({
            ...validationErrors,
            [key]: false,
        });
    };

    const handleAddExperience = () => {
        const errors = {};
        if (!experienceToAdd.company) errors.company = 'Company is required';
        if (!experienceToAdd.position) errors.position = 'Position is required';
        if (!experienceToAdd.description) errors.description = 'Description is required';
        if (!experienceToAdd.startDate) errors.startDate = 'Start date is required';
        if (!experienceToAdd.endDate) errors.endDate = 'End date is required';

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        const updatedExperienceList = [...portfolioContent.pages.experience.experienceList, experienceToAdd];
        setPortfolioContent({
            ...portfolioContent,
            pages: {
                ...portfolioContent.pages,
                experience: {
                    ...portfolioContent.pages.experience,
                    experienceList: updatedExperienceList,
                },
            },
        });
        setExperienceToAdd(experienceItemDefault);
        setAddExperienceOpen(false);
    };

    return (
        <>
            <div id='portfolio-experience-root'>
                <PortfolioNavbar portfolioContent={portfolioContent}/>
                <h1 id='portfolio-exp-header' style={portfolioContent.pages.experience.styles} >Experience</h1>
                <div id='portfolio-exp-list' className='v-center-start'>
                    {portfolioContent.pages.experience.experienceList.map((job, index) => (
                        <div key={index} className="job-experience">
                            <h2>{job.company}</h2>
                            <h3>{job.position} ({job.type})</h3>
                            <p>{job.description}</p>
                            <p>{job.startDate} - {job.endDate}</p>
                        </div>
                    ))}

                    {editMode && (
                        <DialogButton
                            id='portfolio-exp-add-experience-button'
                            text='Add Experience'
                            title='Experience Details'
                            startIcon={<AddIcon />}
                            isOpen={addExperienceOpen}
                            setIsOpen={setAddExperienceOpen}
                            content={
                                <>
                                    <div className='pp-add-project-dialog-body'>
                                        <p>* indicates required field</p>
                                        {Object.keys(experienceItemDefault).map((key, index) => (
                                            <TextField 
                                                key={index}
                                                label={key}
                                                onChange={handleInputChange(key)}
                                                margin='normal'
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant='outlined'
                                                type={key === 'startDate' || key === 'endDate' ? 'date' : 'text'}
                                                required={key === 'company' || key === 'position' || key === 'description' || key === 'startDate' || key === 'endDate'}
                                                error={!!validationErrors[key]}
                                                helperText={validationErrors[key]}
                                                sx={{ flex: '1 1 200px' }} // Adjust the width as needed
                                            />
                                        ))}
                                    </div>
                                    <Button 
                                        variant='contained' 
                                        onClick={handleAddExperience}
                                        sx={{marginTop: '1rem'}}
                                    >
                                        Add Experience
                                    </Button>
                                </>
                            }
                        />
                    )}

                </div>
            </div>
        </>
    );
};

export default ExperienceBody;