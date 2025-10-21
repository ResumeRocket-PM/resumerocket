import {useState, useEffect, useRef, useContext} from 'react';
import { ClipLoader } from 'react-spinners'; 
import { useApi } from "../../../hooks.js";

import userSolidOrange from "../../../assets/user-solid-orange.svg"
import userLightRed from "../../../assets/colored-user-icons/circle-user-light-red.svg";
import userPink from "../../../assets/colored-user-icons/circle-user-pink.svg";
import userPurple from "../../../assets/colored-user-icons/circle-user-purple.svg";
import userRaspberryRose from "../../../assets/colored-user-icons/circle-user-raspberry-rose.svg";
import userSpaceCadet from "../../../assets/colored-user-icons/circle-user-space-cadet.svg";
import userVerdigris from "../../../assets/colored-user-icons/circle-user-verdigris.svg";
// import userSolidOrange from "../../../assets/RR_logo1.png";
import "../../../styles/AccountPage.css";
import accountBanner from '../../../assets/account-banner.png';
import AccountSectionCard from './AccountSectionCard'; 
import SectionEditButton from './SectionEditButton'; 
import ExperienceEntry from './ExperienceEntry.jsx'; 
import EducationEntry from './EducationEntry.jsx'; 
import EditEducationDialog from './Dialog/EditEducationDialog.jsx'; 
import EditExperienceDialog from './Dialog/EditExperienceDialog.jsx'; 
import EditFieldModal from './Dialog/EditFieldModal.jsx'; 
import EditSkillsDialog from './Dialog/EditSkillsDialog.jsx'; 
import UploadPDFButton from './UploadPDFButton.jsx';
import { VisuallyHiddenInput } from '../../../utils/muiHelpers';
import { inputClasses } from '@mui/material';
import { ImageContext } from '../../../context/ImageProvider';
import { Chip } from '@mui/material';
import editIcon from "../../../assets/pen-to-square-solid.svg";


const AccountPage = () => {

    const api = useApi()
    const { showImage } = useContext(ImageContext);

    const [isLoading, setIsLoading] = useState(true);
    const [userDetails, setUserDetails] = useState(null);
    const [dialogOpen, setDialogOpen] = useState('none');
    const currentInputRef = useRef(null);

    const profilePicInputRef = useRef(null);
    const backgroundPicInputRef = useRef(null);

    const [profilePhoto, setProfilePhoto] = useState(null);
    const [backgroundPhoto, setBackgroundPhoto] = useState(null);
    
    const updateAccount = () => {
        api.get('/account/details').then(response => {
            if (response.ok) {
              response.json().then(data => {
                setUserDetails(data.result)
                setIsLoading(false)
              });
            }
            else {
              console.log("Failed to save account");
            }
          })
    };

    const updateField = (fieldName, newValue) => { 

        if(newValue === "")
        {
            newValue = null
        }

        console.log('fieldName', fieldName, 'newValue', newValue)

        api.postForm('/account/details', 
        {
            parameters: {
                [fieldName]: (typeof newValue === 'object' && newValue !== null) ? JSON.stringify(newValue) : newValue,
            }
        }
        ).then(response => {

                if (response.ok) {
                    response.json().then(data => {
                        updateAccount()
                    });
                }
                else {
                    console.log("Failed to save account");
                }
        })
    };

    useEffect(() => {
        updateAccount();
    }, []);

    const handleChangeProfilePicture = (files, photoInput) => {
        if (files.length === 0) {
            return;
        }

        let imageId = '';
        if (photoInput === 'profile-photo-input') {
            // imageId = userDetails.profilePhotoLink ? userDetails.profilePhotoLink.split('/').pop() : '';
            if (
                userDetails.profilePhotoLink &&
                userDetails.profilePhotoLink.startsWith('http')
            ) {
                imageId = userDetails.profilePhotoLink.split('/').pop();
            } else {
                imageId = '';
            }
        } else if (photoInput === 'background-photo-input') {
            imageId = userDetails.backgroundPhotoLink ? userDetails.backgroundPhotoLink.split('/').pop() : '';
        }

        const formData = new FormData();
        formData.append('file', files[0]);
        formData.append('imageId', imageId);

        try {
            api.postFileForm('/image/upload', formData).then(response => {
                if (response.ok) {
                    response.json().then(data => {
                        console.log(data);
                        const url = data.imageUrl;
                        if(photoInput === 'background-photo-input') {
                            updateField('BackgroundPhotoLink', url)
                        } else {
                            updateField('ProfilePhotoLink', url)
                        }
                    });
                }
                else {
                    console.log("Failed to save account");
                }
            });
        } catch (error) {
            console.error(`Error uploading to ${photoInput}`, error);
        }
    };

    const handleImageChangeClick = (inputRef) => {
        currentInputRef.current = inputRef.current;
        currentInputRef.current.click();
    };

    useEffect(() => {
        // if there is an image URL and imageId is not empty
        if (userDetails?.profilePhotoLink) {
            const url = userDetails.profilePhotoLink;
            const regex = /https:\/\/resumerocketimages\.blob\.core\.windows\.net\/images\/[a-f0-9-]+$/;
            let imageId = '';
    
            if (regex.test(url)) {
                imageId = url.split('/').pop();
                showImage(url, imageId)
                    .then(blob => {
                        const objectUrl = URL.createObjectURL(blob);
                        setProfilePhoto(objectUrl);
                    })
                    .catch(err => {
                        console.error(err);
                    });
            } else {
                // If ProfilePhotoLink is a color string, map it to the correct SVG
                switch (url) {
                    case "light-red":
                        setProfilePhoto(userLightRed);
                        break;
                    case "pink":
                        setProfilePhoto(userPink);
                        break;
                    case "purple":
                        setProfilePhoto(userPurple);
                        break;
                    case "raspberry-rose":
                        setProfilePhoto(userRaspberryRose);
                        break;
                    case "space-cadet":
                        setProfilePhoto(userSpaceCadet);
                        break;
                    case "verdigris":
                        setProfilePhoto(userVerdigris);
                        break;
                    default:
                        setProfilePhoto(userSolidOrange);
                }
            }
        } else {
            setProfilePhoto(userSolidOrange);
        }

        if (userDetails?.backgroundPhotoLink) {
            const imageId = userDetails.backgroundPhotoLink.split('/').pop();
            showImage(userDetails.backgroundPhotoLink, imageId)
                .then(blob => {
                    const objectUrl = URL.createObjectURL(blob);
                    setBackgroundPhoto(objectUrl);
                })
                .catch(err => {
                    console.error(err);
                });
        }
        else {
            setBackgroundPhoto(accountBanner);
        }    }, [userDetails]);

    console.log('userDetails', userDetails)
    console.log('profilePhoto', profilePhoto)

    return (
        <>
            { isLoading &&
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <ClipLoader size={150} color={"#123abc"} loading={isLoading} />
                </div>
            }
            { !isLoading &&
                <div id='account-page-root'>
                    <div id='account-page-content'>

                    <div className="account-page-header-container" style={{ position: 'relative', margin: 0, padding: 0 }}>
                            {/* Background Image */}
                            <div 
                                id='account-page-background-image'
                                className='profile-image-container can-hover'
                                onClick={() => handleImageChangeClick(backgroundPicInputRef)}
                                style={{
                                    position: 'relative',
                                    height: '200px', 
                                    overflow: 'hidden',
                                    margin: 0,
                                    padding: 0
                                }}
                            >
                                <img 
                                    id="background-image" 
                                    src={backgroundPhoto} 
                                    alt="Background" 
                                    style={{
                                        width: '100%', 
                                        height: '100%', 
                                        objectFit: 'cover',
                                        margin: 0, 
                                        padding: 0, 
                                        borderTopLeftRadius: '5px', 
                                        borderTopRightRadius: '5px', 
                                    }}
                                />
                                    <div className="profile-image-overlay">
                                        <img src={editIcon} alt="Edit" className="profile-edit-icon" />
                                    </div>
                            </div>

                            {/* Profile Picture */}
                            <div 
                                id='account-page-profile-image'
                                className='can-hover profile-image-container'
                                onClick={() => handleImageChangeClick(profilePicInputRef)}
                                style={{
                                    position: 'absolute',
                                    top: '70px',
                                    left: '20px',
                                    width: '150px',
                                    height: '150px',
                                    borderRadius: '50%',
                                    border: '3px solid #30678e',
                                    zIndex: 1,
                                    backgroundColor: 'white' // Set the background color to white
                                }}
                            >
                                <img 
                                    id='account-page-profile-picture'
                                    src={profilePhoto}
                                    alt="profile picture" 
                                    style={{
                                        width: '100%', 
                                        height: '100%',
                                        borderRadius: '50%',
                                        backgroundColor: 'white'
                                    }}
                                />
                                    <div className="profile-image-overlay">
                                        <img src={editIcon} alt="Edit" className="profile-edit-icon" />
                                    </div>
                            </div>

                            <div id="account-page-main-header-section" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                {/* User details */}
                                <div id='account-page-user-header-details' className='v-center' style={{ position: 'relative', zIndex: 2 }}>
                                    <div style={{ marginTop: '1rem' }}>
                                        <h1>{userDetails.firstName} {userDetails.lastName}</h1>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem'}}>
                                        <h3 style={{fontWeight: '300'}}>{userDetails.title}</h3>
                                        <SectionEditButton onClick={() => setDialogOpen('editTitle')} />
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                                        <h4 style={{ color: '#888', fontWeight: '300', display: 'inline' }}>{userDetails.location}</h4>
                                        <SectionEditButton onClick={() => setDialogOpen('editLocation')} />
                                    </div>
                                </div>

                                {/* Right-aligned Upload Button */}
                                <UploadPDFButton primaryResumeId={userDetails.primaryResumeId} onSubmit={updateAccount} />
                            </div>
                        </div>

                        <AccountSectionCard 
                            title='Experience is canteloupe' 
                            buttonType={'add'}
                            onButtonClick={() => setDialogOpen('Experience')}
                        >
                            {userDetails.experience
                            .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
                            .map((entry, index) => (
                                <ExperienceEntry key={index} {...entry} onEditClick={() => {
                                    setDialogOpen(`Experience-${index}`);}}/>
                            ))}
                        </AccountSectionCard>
                 
                        <AccountSectionCard 
                            title='Education' 
                            buttonType={'add'}
                            onButtonClick={() => setDialogOpen('Education')}
                        >   {userDetails.education
                                .sort((a, b) => new Date(b.graduationDate) - new Date(a.graduationDate))
                                .map((entry, index) => (
                                    <EducationEntry key={index} {...entry} onEditClick={() => {
                                        setDialogOpen(`Education-${index}`)}}/>
                                ))}
                        </AccountSectionCard>

                        <AccountSectionCard 
                            title='Skills' 
                            buttonType={'edit'}    
                            onButtonClick={() => setDialogOpen('Skills')}
                        >
                                {userDetails.skills.map((skill, index) => (
                                    // <li key={index}>{skill.description}</li>
                                    <Chip
                                        key={index}
                                        label={skill.description} // Access description correctly
                                        color="primary"
                                        // variant="outlined"
                                        style={{ margin: '0.2rem' }}
                                    />
                                ))}
                        </AccountSectionCard>
                    </div>

                    { dialogOpen.startsWith('Experience') && (
                        <EditExperienceDialog 
                            dialogOpen={dialogOpen} 
                            setDialogOpen={setDialogOpen}
                            experience={userDetails.experience}
                            onClose={updateField}
                        />
                    )}
                    
                    { dialogOpen.startsWith('Education') && (
                        <EditEducationDialog 
                            dialogOpen={dialogOpen} 
                            setDialogOpen={setDialogOpen}
                            education={userDetails.education}
                            onClose={updateField}
                        /> 
                    )}

                    { dialogOpen.startsWith('Skills') && (
                        <EditSkillsDialog 
                            dialogOpen={dialogOpen} 
                            setDialogOpen={setDialogOpen}
                            skills={userDetails.skills}
                            onClose={updateField}
                        />
                    )}

                    <EditFieldModal 
                        dialogOpen={dialogOpen} 
                        setDialogOpen={setDialogOpen}
                        fieldName='Title'
                        fieldValue={userDetails.title ?? ''}
                        onClose={updateField}
                    />
                    <EditFieldModal 
                        dialogOpen={dialogOpen} 
                        setDialogOpen={setDialogOpen}
                        fieldName='Location'
                        fieldValue={userDetails.location ?? ''}
                        onClose={updateField}
                    />
                    <EditFieldModal 
                        dialogOpen={dialogOpen} 
                        setDialogOpen={setDialogOpen}
                        fieldName='ProfilePhotoLink'
                        fieldValue={userDetails.ProfilePhotoLink ?? ''}
                        onClose={updateField}
                    />

                </div>
            }   
                <VisuallyHiddenInput 
                    id="profile-photo-input"
                    type='file' 
                    accept='image/*' 
                    multiple={false}
                    ref={profilePicInputRef}
                    onChange={(event) => handleChangeProfilePicture(event.target.files, "profile-photo-input")}
                />
                <VisuallyHiddenInput 
                    id="background-photo-input"
                    type='file' 
                    accept='image/*' 
                    multiple={false}
                    ref={backgroundPicInputRef}
                    onChange={(event) => handleChangeProfilePicture(event.target.files, "background-photo-input")}
                />     
        </>

    );
};

export default AccountPage;