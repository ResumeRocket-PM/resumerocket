import React, { useState, useEffect, useContext } from 'react';
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
import DialogButton from '../../DialogButton';
import FormControl from '@mui/material/FormControl';
import Label from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import { PortfolioEditContext } from '../../../context/PortfolioEditProvider';
import PortfolioItemWithPopupWrapper from '../PortfolioItemWithPopupWrapper';
import DeleteIcon from '@mui/icons-material/Delete';



const addButtonStyles = {   
    '&:hover': {
        backgroundColor: 'lightblue',
    }
}

const ContactMethodIcons = {
    email: emailLogo,
    instagram: instagramLogo,
    linkedin: linkedinLogo,
    github: githubLogo,
    twitter: twitterLogo,
    facebook: facebookLogo,
    discord: discordLogo,
}

const AddContactMethodFields = ({ contactMethod, newContactMethodValue, setNewContactMethodValue }) => {
    let label = '';
    let placeholder = '';

    switch (contactMethod) {
        case 'email':
            label = 'Email';
            placeholder = 'Enter your email';
            break;
        case 'instagram':
            label = 'Instagram Username';
            placeholder = 'Enter your Instagram username';
            break;
        case 'linkedin':
            label = 'LinkedIn URL';
            placeholder = 'Enter your LinkedIn profile URL';
            break;
        case 'github':
            label = 'GitHub Username';
            placeholder = 'Enter your GitHub username';
            break;
        case 'twitter':
            label = 'Twitter Handle';
            placeholder = 'Enter your Twitter handle';
            break;
        case 'facebook':
            label = 'Facebook Profile URL';
            placeholder = 'Enter your Facebook profile URL';
            break;
        case 'discord':
            label = 'Discord Username';
            placeholder = 'Enter your Discord username';
            break;
        default:
            return null;
    }

    return (
        <TextField 
            id={`portfolio-add-${contactMethod}`}
            label={label}
            placeholder={placeholder}
            variant='outlined'
            sx={{ marginBottom: '1rem' }}
            value={newContactMethodValue}
            onChange={(e) => setNewContactMethodValue(e.target.value)}
            fullWidth
        />
    );
};
        

const AboutBody = ({userAbout, editMode, portfolioContent, setPortfolioContent}) => {
    const [about, setAbout] = useState(userAbout);
    const [selectedContactMethod, setSelectedContactMethod] = useState(null);
    const [newContactMethodValue, setNewContactMethodValue] = useState('');
    const [addContactMethodOpen, setAddContactMethodOpen] = useState(false);
    const { 
        handleMouseEnterPI, 
        handleMouseLeavePI, 
        autoResizeTextArea, 
        updateTextAreaSizes, 
        anchorEl 
    } = useContext(PortfolioEditContext); 
    
    const [tempValue, setTempValue] = useState({ name: about.name, title: about.title });

    const handleTempChange = (e) => {
        const { name, value } = e.target;
        setTempValue(prevTempValue => ({...prevTempValue, [name]: value}));
    };

    // const handleTextChange = (e) => {
    //     const { name, value } = e.target;
    //     setAbout(prevAbout => ({...prevAbout, [name]: value}));
    // };

    const handleTextChange = (e) => {
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

    useEffect(() => { // update height of textareas by class when listed useEffect dependencies change
        updateTextAreaSizes();
    }, [about.name, about.title]); // Add dependencies for all fields that might change

    const handleAddProfilePicture = () => {
        // Add code to handle adding a profile picture
    }

    const handleContactMethodSelected = (contactMethod) => {
        setSelectedContactMethod(contactMethod);
    }

    const handleAddContactMethod = (contactMethod) => {
        const updatedContactInfo = { ...about.contactInfo, [contactMethod]: newContactMethodValue };
        const updatedAbout = { ...about, contactInfo: updatedContactInfo };
        setAbout(updatedAbout);

        setPortfolioContent((prevContent) => ({
            ...prevContent,
            pages: {
                ...prevContent.pages,
                about: updatedAbout,
            },
        }));
        setAddContactMethodOpen(false);
    }

    return (
        <>
            <div id='portfolio-about-root'>
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
                    className={`${!editMode ? 'hz-center' : ''}`}
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
                                    sx={{...addButtonStyles, marginTop: '1rem', height: '15rem', width: '15rem', borderRadius: '50%'}}
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
                            name="name" // *this MUST match name of the field in portfolioContent!
                            className={`portfolio-textarea h1 ${!editMode ? 'disabled-textarea' : ''}`}
                            id="portfolio-about-name"
                            rows="2"
                            cols="20"
                            value={tempValue.name || ""}
                            onChange={handleTempChange}
                            onBlur={handleTextChange}
                            onInput={autoResizeTextArea}    
                            placeholder="Name" /* Placeholder text shown when about.name is empty */
                        />
                        <textarea
                            name="title" // *this MUST match name of the field in portfolioContent!
                            className={`portfolio-textarea h2 ${!editMode ? 'disabled-textarea' : ''}`}
                            id="portfolio-about-title"
                            rows="2"
                            cols="30"
                            value={tempValue.title || ""}
                            onChange={handleTempChange}
                            onBlur={handleTextChange}
                            onInput={autoResizeTextArea}    
                            placeholder="Title (Engineer, Graphic Designer, etc)" /* Placeholder text shown when about.name is empty */
                        />
                        </div>
                    </div>
                    <div id="portfolio-about-header-contact">
                    {about.contactInfo.email && (
                        <PortfolioItemWithPopupWrapper popoverContent={<DeleteIcon />}>
                            <a href={`mailto:${about.contactInfo.email}`}>
                                <img 
                                    src={emailLogo}
                                    alt="email" 
                                    style={about.styles.contactLogos}
                                />
                            </a>
                        </PortfolioItemWithPopupWrapper>
                    )}
                    {about.contactInfo.instagram && (
                        <PortfolioItemWithPopupWrapper popoverContent={<DeleteIcon />}>
                            <a href={about.contactInfo.instagram}>
                                <img 
                                    src={instagramLogo} 
                                    alt="instagram" 
                                    style={about.styles.contactLogos} 
                                />
                            </a>                            
                        </PortfolioItemWithPopupWrapper>    
                    )}
                    {about.contactInfo.linkedin && (
                        <PortfolioItemWithPopupWrapper popoverContent={<DeleteIcon />}>
                            <a href={about.contactInfo.linkedin}>
                                <img 
                                    src={linkedinLogo} 
                                    alt="linkedin" 
                                    style={about.styles.contactLogos} 
                                />
                            </a>
                        </PortfolioItemWithPopupWrapper>
                    )}
                    {about.contactInfo.github && (
                        <PortfolioItemWithPopupWrapper popoverContent={<DeleteIcon />}>
                            <a href={about.contactInfo.github}>
                                <img 
                                    src={githubLogo} 
                                    alt="github" 
                                    style={about.styles.contactLogos} 
                                />
                            </a>
                        </PortfolioItemWithPopupWrapper>
                    )}
                    {about.contactInfo.twitter && (
                        <PortfolioItemWithPopupWrapper popoverContent={<DeleteIcon />}>
                            <a href={about.contactInfo.twitter}>
                                <img 
                                    src={twitterLogo} 
                                    alt="twitter" 
                                    style={about.styles.contactLogos} 
                                />
                            </a>
                        </PortfolioItemWithPopupWrapper>
                    )}
                    {about.contactInfo.facebook && (
                        <PortfolioItemWithPopupWrapper popoverContent={<DeleteIcon />}>
                            <a href={about.contactInfo.facebook}>
                                <img 
                                    src={facebookLogo} 
                                    alt="facebook" 
                                    style={about.styles.contactLogos} 
                                />
                            </a>
                        </PortfolioItemWithPopupWrapper>
                    )}
                    {about.contactInfo.discord && (
                        <PortfolioItemWithPopupWrapper popoverContent={<DeleteIcon />}>
                            <a href={about.contactInfo.discord}>
                                <img 
                                    src={discordLogo} 
                                    alt="discord" 
                                    style={about.styles.contactLogos} 
                                />
                            </a>
                        </PortfolioItemWithPopupWrapper>
                    )}
                            {editMode && (
                                <DialogButton 
                                    id='portfolio-add-contact-button'
                                    text={Object.keys(about.contactInfo).length === 0 ? 'Add Contact Method' : ''}                                    title='Add Contact Method'
                                    startIcon={<AddIcon />}
                                    isOpen={addContactMethodOpen}
                                    setIsOpen={setAddContactMethodOpen}
                                    buttonStyles={{}}
                                    content={
                                        <div id="portfolio-add-contact-dialog">
                                            {selectedContactMethod ? (
                                                <>
                                                    <AddContactMethodFields 
                                                        contactMethod={selectedContactMethod} 
                                                        newContactMethodValue={newContactMethodValue} 
                                                        setNewContactMethodValue={setNewContactMethodValue} 
                                                    />
                                                    <Button
                                                        variant="contained"
                                                        onClick={() => setSelectedContactMethod(null)}
                                                        sx={{marginRight: '1rem', backgroundColor: 'red', "&:hover": {backgroundColor: '#FF6666'}}}
                                                    >     
                                                    Back
                                                    </Button>  
                                                    <Button
                                                        variant="contained"
                                                        onClick={() => handleAddContactMethod(selectedContactMethod, document.getElementById(`portfolio-add-${selectedContactMethod}`).value)}
                                                        sx={{backgroundColor: 'green', "&:hover": {backgroundColor: '#90EE90'}}}
                                                    >
                                                    Add
                                                    </Button>                                            
                                                </>
                                            ) : (
                                                <FormControl sx={{display: "flex", flexDirection: "row", gap: ".5rem"}}>
                                                    {Object.entries(ContactMethodIcons).map(([key, value], index) => (
                                                        <img key={key} src={value} alt={key} onClick={() => handleContactMethodSelected(key)} />
                                                    ))}
                                                </FormControl>
                                            )}
                                            {/* <div id="portfolio-add-project-dialog">
                                                <FormControl sx={{display: "flex", flexDirection: "row", gap: ".5rem"}}>
                                                    {Object.entries(ContactMethodIcons).map(([key, value], index) => (
                                                        <img key={key} src={value} alt={key} onClick={() => handleContactMethodSelected(key)} />
                                                    ))}
                                                </FormControl>
                                            </div> */}
                                        </div>
                                    }
                                />                              
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