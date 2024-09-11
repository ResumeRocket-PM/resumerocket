import React, { useState } from "react";
import "../../../styles/ExperienceBodyDefault.css";
import PortfolioNavbar from "../PortfolioNavbar";

const ExperienceBody = ({ userExperience, editMode, setPortfolioContent, navContent }) => {
    const [experience, setExperience] = useState(userExperience);

    return (
        <>
            <div id='portfolio-experience-root'>
                <PortfolioNavbar navContent={navContent}/>
                <h1 id='portfolio-exp-header' style={experience.styles} >Experience</h1>
                <div className='v-center-start'>
                    {experience.map((job, index) => (
                        <div key={index} className="job-experience">
                            <h2>{job.company}</h2>
                            <h3>{job.position} ({job.type})</h3>
                            <p>{job.description}</p>
                            <p>{job.startDate} - {job.endDate}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ExperienceBody;