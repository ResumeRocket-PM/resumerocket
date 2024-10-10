import {useState, useEffect} from 'react';
import { ClipLoader } from 'react-spinners'; 
import { useApi } from "../../../hooks.js";

import userSolidOrange from "../../../assets/user-solid-orange.svg"
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


const AccountPage = () => {

    const api = useApi()

    const [isLoading, setIsLoading] = useState(true);
    const [userDetails, setUserDetails] = useState(null);
    const [dialogOpen, setDialogOpen] = useState('none');
    
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

                        <div style={{ position: 'relative', margin: 0, padding: 0 }}>
                            {/* Background Image */}
                            <div 
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
                                    src={accountBanner} 
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
                            </div>

                            {/* Profile Picture */}
                            <img 
                                id='account-page-profile-picture'
                                src={userDetails.profilePhotoLink != null ? userDetails.profilePhotoLink : userSolidOrange}
                                alt="profile picture" 
                                style={{
                                    position: 'absolute',
                                    top: '70px',
                                    left: '20px',
                                    width: '150px', 
                                    height: '150px',
                                    borderRadius: '50%', 
                                    border: '3px solid white',
                                    zIndex: 1 
                                }} 
                                onClick={() => setDialogOpen('editProfilePhotoLink')}
                            />

                            <div id="account-page-main-header-section" >
                                <div id='account-page-user-header-details' className='v-center' style={{ position: 'relative', zIndex: 2 }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <h1>{userDetails.firstName} {userDetails.lastName}</h1>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <h2>{userDetails.title}</h2>
                                        <SectionEditButton onClick={() => setDialogOpen('editTitle')} />
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <h3>{userDetails.location}</h3>
                                        <SectionEditButton onClick={() => setDialogOpen('editLocation')} />
                                    </div>
                                </div>
                            </div>
                        </div>




                        <AccountSectionCard 
                            title='Experience' 
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
                            <ul>
                                {userDetails.skills.map((skill, index) => (
                                    <li key={index}>{skill.description}</li>
                                ))}
                            </ul>
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
        </>

    );
};

export default AccountPage;