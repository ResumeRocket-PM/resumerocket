import React, { useState, useEffect } from 'react';
import { aboutExample } from '../../../example_responses/portfolioBodies';
import '../../../styles/AboutBodyDefault.css';
import PortfolioNavbar from '../PortfolioNavbar';
import discordLogo from '../../../assets/portfolio/discord-brands-solid.svg';
import emailLogo from '../../../assets/portfolio/envelope-solid.svg';
import githubLogo from '../../../assets/portfolio/github-brands-solid.svg';
import instagramLogo from '../../../assets/portfolio/instagram-brands-solid.svg';
import linkedinLogo from '../../../assets/portfolio/linkedin-brands-solid.svg';
import twitterLogo from '../../../assets/portfolio/x-twitter-brands-solid.svg';
import facebookLogo from '../../../assets/portfolio/facebook-brands-solid.svg';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import cameraIcon from '../../../assets/portfolio/camera-solid.svg';
import { VisuallyHiddenInput } from '../../../utils/muiHelpers';

const addButtonStyles = {   
    '&:hover': {
        backgroundColor: 'lightblue',
    }
}

const AboutBody = ({userAbout, editMode, portfolioContent, setPortfolioContent}) => {
    const [about, setAbout] = useState(userAbout);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedAbout = { ...about, [name]: value };
        setAbout(updatedAbout);

        setPortfolioContent((prevContent) => ({
            ...prevContent,
            pages: {
                ...prevContent.pages,
                about: updatedAbout,
            },
        }));
    };

    const autoResize = (e) => {
        e.target.style.height = '1px';  // Temporarily set height to 1px to get the correct scrollHeight
        e.target.style.height = (e.target.scrollHeight) + 'px';  // Adjust height to fit the content
    };

    useEffect(() => { // update height of textareas by class when listed useEffect dependencies change
        const textareas = document.querySelectorAll('.portfolio-textarea');
        textareas.forEach((textarea) => {
            autoResize({ target: textarea });
        });
    }, [about.name, about.title]); // Add dependencies for all fields that might change

    const handleAddProfilePicture = () => {
        // Add code to handle adding a profile picture
    }


    return (
        <>
            <div id='portfolio-about-root'>
                <PortfolioNavbar portfolioContent={portfolioContent}/>
                {editMode && (
                    <IconButton 
                        aria-label='add background picture'
                        component='label'
                        role={undefined}
                        tabIndex={-1}
                        sx={{position: 'absolute', bottom: '10px', right: '10px', ...addButtonStyles}}
                    >
                        <img style={{height:'1.5rem', width: '1.5rem' }} src={cameraIcon} alt="add background picture" />
                        <VisuallyHiddenInput 
                            type='file' 
                            accept='image/*' 
                            onChange={(event) => console.log(event.target.files)}
                        />
                    </IconButton>
                )}

                <div 
                    id='portfolio-about-header'
                    style={{
                        backgroundImage: about.backgroundPicture
                            ? `url(${about.backgroundPicture})`
                            : 'none',
                        backgroundColor: about.backgroundPicture ? 'transparent' : 'lightgreen',
                        backgroundSize: 'cover', // Ensures the image covers the div area
                        backgroundPosition: 'center', // Centers the image within the div
                    }}
                >

                    {about.profilePicture ? (
                        <div className='hz-center' id='portfolio-profile-picture-container'>
                            <img 
                                id='portfolio-profile-picture'
                                src={about.profilePicture}
                                alt="profile picture" 
                            />
                        </div>
                    ) : (
                        editMode && (
                            <div className='hz-center' id='portfolio-profile-picture-container'>
                                <Button 
                                    component='label'
                                    role={undefined}
                                    tabIndex={-1}
                                    variant='outlined' 
                                    startIcon={<AddIcon/>} 
                                    sx={addButtonStyles}
                                >
                                    Add Profile Picture
                                    <VisuallyHiddenInput 
                                        type='file' 
                                        accept='image/*' 
                                        onChange={(event) => console.log(event.target.files)}
                                    />
                                </Button>
                            </div>
                        )
                    )}
                    <div id='portfolio-about-header-details' className='hz-center'>
                        <div className='v-center-center'>
                        <textarea
                            name="name"
                            className={`portfolio-textarea h1 ${!editMode ? 'disabled-textarea' : ''}`}
                            id="portfolio-about-name"
                            rows="2"
                            cols="20"
                            value={about.name || ""}
                            onChange={handleChange}
                            onInput={autoResize}    
                            placeholder="Name" /* Placeholder text shown when about.name is empty */
                        />
                        <textarea
                            name="title"
                            className={`portfolio-textarea h2 ${!editMode ? 'disabled-textarea' : ''}`}
                            id="portfolio-about-title"
                            rows="2"
                            cols="30"
                            value={about.title || ""}
                            onChange={handleChange}
                            onInput={autoResize}    
                            placeholder="Title (Engineer, Graphic Designer, etc)" /* Placeholder text shown when about.name is empty */
                        />
                        </div>
                    </div>
                    <div id="portfolio-about-header-contact">
                            {about.contactInfo.email && (
                                <a href={`mailto:${about.contactInfo.email}`}>
                                    <img src={emailLogo} alt="email" style={about.styles.contactLogos} />
                                </a>
                            )}
                            {about.contactInfo.instagram && (
                                <a href={about.contactInfo.instagram}>
                                    <img src={instagramLogo} alt="instagram" style={about.styles.contactLogos} />
                                </a>
                            )}
                            {about.contactInfo.linkedin && (
                                <a href={about.contactInfo.linkedin}>
                                    <img src={linkedinLogo} alt="linkedin" style={about.styles.contactLogos} />
                                </a>
                            )}
                            {about.contactInfo.github && (
                                <a href={about.contactInfo.github}>
                                    <img src={githubLogo} alt="github" style={about.styles.contactLogos} />
                                </a>
                            )}
                            {about.contactInfo.twitter && (
                                <a href={about.contactInfo.twitter}>
                                    <img src={twitterLogo} alt="twitter" style={about.styles.contactLogos} />
                                </a>
                            )}
                            {about.contactInfo.facebook && (
                                <a href={about.contactInfo.facebook}>
                                    <img src={facebookLogo} alt="facebook" style={about.styles.contactLogos} />
                                </a>
                            )}
                            {about.contactInfo.discord && (
                                <a href={about.contactInfo.discord}>
                                    <img src={discordLogo} alt="discord" style={about.styles.contactLogos} />
                                </a>
                            )}
                    </div>
                </div>
                {about.personalSummary !== '' && (
                    <div id='portfolio-about-summary'>
                        <p>{about.personalSummary}</p>
                    </div>
                )}
            </div>        
        </>

    );
};

export default AboutBody;