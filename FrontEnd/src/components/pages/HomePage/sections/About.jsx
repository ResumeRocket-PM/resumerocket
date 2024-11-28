import React from 'react';
import "../../../../styles/HomePage.css";
import RR_logo from "../../../../assets/RR_logo1.png";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


const About = () => {
    return (
        <div id='home-about-main-content' className='home-page-section'>
            <img src={RR_logo} alt="resume rocket logo" id='home-about-RR-logo'/>

                    <h2 className='home-about-big-header'>The Problem</h2>
                    <p className='home-about-text-section'>Getting a job, or even landing an interview is about as tough as it has ever been. Resume filtering software throws out many resumes before they even reach a recruiter, so applicants often tailor their resume to meet job descriptions and pass the filtering. Many professions expect a personal portfolio/website in addition to a resume in order to truly showcase your work and stand out from the crowd, with most applications including a spot to include a link to said portfolio. And finally networking is as important as ever, as a wide network can often lead to greatly increased job opportunities. 
                    Trying to check each of these boxes can seem overwhelming, and requires a multitude of tools (not to mention web-based know how in the case of an online portfolio) to manage. ResumeRocket aims to provide tools for each of these challenges all in one convenient platform. 
                    </p>

                    <h2 className='home-about-big-header'>Our Solution</h2>
                    <p className='home-about-text-section'>Our site provides users with all the tools they need to boost their resume, and their chances of actually landing an interview, to the top. Below is a high level overview of some of the main features of the site.</p>

                    <h2 className='home-about-big-header'>Main Features</h2>
                    <h3 className='home-about-smaller-header'>Resume Tailoring, Version History, Application Tracking</h3>
                    <ul>
                        <li>
                            Users can get suggestions for their resume for a specific job posting either by using a URL for their desired job posting on the applications section of the resume page, or by using our browser extension on the page with the job application. These suggestions can be viewed and applied by clicking on their associated resume for each application in the applications section of the resume page.
                        </li>
                        <li>
                            After making changes to a resume, users can save that resume as a version to refer to later.
                        </li>
                        <li>
                            For each job users have had the site tailor a resume for, they can keep track of those applications and the status.
                        </li>
                    </ul>

                    <h3 className='home-about-smaller-header'>Portfolio Creation</h3>
                    <ul>
                        <li>
                            Users can create a personal portfolio to dynamically display projects they have worked on. These portfolios can be customized and there are a variety of sections to choose from to add content to each project.
                        </li>
                        <li>
                            A unique URL is provided for the portfolio enabling users to include it on any job application, so that companies can easily view their portfolio.
                        </li>
                    </ul>

                    <h3 className='home-about-smaller-header'>User Networking</h3>
                    <ul>
                        <li>
                            The networking page shows all users of the site, some details about them, and each user&apos;s resume and portfolio if provided. These can be searched for with the search bar.
                        </li>
                        <li>
                            Users can message and interact with each other via our messaging feature.
                        </li>
                    </ul>

        </div>
    );
};

export default About;