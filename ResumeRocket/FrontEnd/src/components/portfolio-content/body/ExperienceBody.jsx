import React, { useState } from "react";
import "../../../styles/ExperienceBodyDefault.css";
import PortfolioNavbar from "../PortfolioNavbar";
import DialogButton from "../../DialogButton";
import { TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { experienceItemDefault } from "../../../example_responses/portfolioContent";
import Button from "@mui/material/Button";

const ExperienceBody = ({ editMode, portfolioContent, setPortfolioContent }) => {
    const [experience, setExperience] = useState(portfolioContent.pages.experience);

    // console.log('portfolioContent:', portfolioContent);
    // console.log('experienceList:', portfolioContent.experience.experienceList);

    const handleAddExperience = () => {
        setExperience({
            ...experience,
            experienceList: [...experience.experienceList, experienceItemDefault]
        });
        setPortfolioContent({
            ...portfolioContent,
            pages: {
                ...portfolioContent.pages,
                experience: {
                    ...experience,
                    experienceList: [...experience.experienceList, experienceItemDefault]
                }
            }
        });
    };

    return (
        <>
            <div id='portfolio-experience-root'>
                <PortfolioNavbar portfolioContent={portfolioContent}/>
                <h1 id='portfolio-exp-header' style={experience.styles} >Experience</h1>
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
                            text='Add Experience'
                            title='Experience Details'
                            startIcon={<AddIcon />}
                            content={
                                <>
                                    {Object.keys(experienceItemDefault).map((key, index) => (
                                        <TextField 
                                            key={index}
                                            label={key}
                                            variant='outlined'
                                        />
                                    ))}
                                    <Button variant='contained' onClick={handleAddExperience}>Add Experience</Button>
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