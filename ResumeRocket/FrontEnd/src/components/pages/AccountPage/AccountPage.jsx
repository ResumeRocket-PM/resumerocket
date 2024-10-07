import {useState, useEffect} from 'react';
import { ClipLoader } from 'react-spinners'; 
import { useApi } from "../../../hooks.js";

import userSolidOrange from "../../../assets/user-solid-orange.svg"
import "../../../styles/AccountPage.css";
import { exampleUserDetails } from "../../../example_responses/networking.js";
import AccountSectionCard from './AccountSectionCard'; 
import SectionEditButton from './SectionEditButton'; 
import ExperienceEntry from './ExperienceEntry.jsx'; 
import EducationEntry from './EducationEntry.jsx'; 
import AddEducationDialog from './Dialog/AddEducationDialog.jsx'; 
import AddExperienceDialog from './Dialog/AddExperienceDialog.jsx'; 
import EditEducationDialog from './Dialog/EditEducationDialog.jsx'; 
import EditExperienceDialog from './Dialog/EditExperienceDialog.jsx'; 
import EditFieldModal from './Dialog/EditFieldModal.jsx'; 
import EditSkillsDialog from './Dialog/EditSkillsDialog.jsx'; 


const AccountPage = () => {
    // you should fetch the data when the page loads,
    // set variables in a context just for this page, and update when needed

    // when we initially call to get user details, we'll set all these state variables
    const [isLoading, setIsLoading] = useState(false);
    const [userDetails, setUserDetails] = useState(exampleUserDetails);
    const [dialogOpen, setDialogOpen] = useState('none');
    
    const api = useApi()

    const updateAccount = () => {
        // setIsLoading(true)

        api.get('/account/details').then(response => {
            if (response.ok) {
              response.json().then(data => {
    
                const clone = structuredClone(userDetails);

                clone['firstName'] = data.result.firstName
                clone['lastName'] = data.result.lastName
                clone['title'] = data.result.title
                clone['location'] = data.result.location

                console.log(clone)
                setUserDetails(clone)
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

        api.postForm('/account/details', 
        {
            parameters: {
                [fieldName]: newValue,
            }
        }
        ).then(response => {

                if (response.ok) {
                    response.json().then(data => {
                        updateAccount()
                        console.log(data)
                    });
                }
                else {
                    console.log("Failed to save account");
                }
        })
    };

    useEffect(() => {
        updateAccount()
    }, []);

    // you'll need to conditionally render whether or not editing is enabled based on 
    // if the currently logged in user is the same as the user being viewed
    return (
        // just don't even display this page until the data is loaded
        // or display a loading spinner
        <>
            { isLoading &&
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <ClipLoader size={150} color={"#123abc"} loading={isLoading} />
                </div>
            }
            { !isLoading &&
                <div id='account-page-root'>
                    <div id='account-page-content'>
                        <div id='account-page-main-header-section'>
                            <img 
                                id='account-page-profile-picture'
                                src={userDetails.profilePhotoLink != null ? userDetails.profilePhotoLink : userSolidOrange}
                                alt="profile picture" 
                            />
                            <SectionEditButton onClick={() => setDialogOpen('editProfilePhotoLink')}/>


                            <div id='account-page-user-header-details' className='v-center'>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <h1>{userDetails.firstName} {userDetails.lastName}</h1>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <h2>{userDetails.title}</h2>
                                    <SectionEditButton onClick={() => setDialogOpen('editTitle')}/>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                <h3>{userDetails.location}</h3>
                                    <SectionEditButton onClick={() => setDialogOpen('editLocation')}/>
                                </div>

                            </div>
                        </div>
                        {}
                        <AccountSectionCard 
                            title='Experience' 
                            buttonType={'add'}
                            onButtonClick={() => setDialogOpen('addExperience')}
                        >
                            {userDetails.experience.map((entry, index) => (
                                <ExperienceEntry key={index} {...entry} onEditClick={() => setDialogOpen(`editExperience-${index}`)}/>
                            ))}
                        </AccountSectionCard>
                        <AccountSectionCard 
                            title='Education' 
                            buttonType={'add'}
                            onButtonClick={() => setDialogOpen('addEducation')}
                        >                            {userDetails.education.map((entry, index) => (
                                <EducationEntry key={index} {...entry} onEditClick={() => setDialogOpen(`editEducation-${index}`)}/>
                            ))}
                        </AccountSectionCard>
                        <AccountSectionCard 
                            title='Skills' 
                            buttonType={'edit'}    
                            onButtonClick={() => setDialogOpen('editSkills')}
                        >
                            <ul>
                                {userDetails.skills.map((skill, index) => (
                                    <li key={index}>{skill}</li>
                                ))}
                            </ul>
                        </AccountSectionCard>
                    </div>

                    <AddExperienceDialog 
                        dialogOpen={dialogOpen} 
                        setDialogOpen={setDialogOpen}
                        userDetails={userDetails}
                        setUserDetails={setUserDetails}
                        onClose={updateAccount}
                    />
                    <AddEducationDialog 
                        dialogOpen={dialogOpen} 
                        setDialogOpen={setDialogOpen}
                        onClose={updateAccount}
                    />
                    {/* <AddSkillDialog 
                        dialogOpen={dialogOpen} 
                        setDialogOpen={setDialogOpen}
                    /> */}
                    <EditExperienceDialog 
                        dialogOpen={dialogOpen} 
                        setDialogOpen={setDialogOpen}
                        experience={userDetails.experience}
                        onClose={updateAccount}
                    />
                    <EditEducationDialog 
                        dialogOpen={dialogOpen} 
                        setDialogOpen={setDialogOpen}
                        education={userDetails.education}
                        onClose={updateAccount}
                    />
                    <EditSkillsDialog 
                        dialogOpen={dialogOpen} 
                        setDialogOpen={setDialogOpen}
                        skills={userDetails.skills}
                        onClose={updateAccount}
                    />
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