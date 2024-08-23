import {useState} from 'react';
import "../../styles/AccountPage.css";
import addIcon from "../../assets/plus-solid.svg";
import editIcon from "../../assets/pen-to-square-solid.svg";
// import {IconButton, SvgIcon} from "@mui/material";
import { ClipLoader } from 'react-spinners'; 
import { exampleUserDetails } from "../../example_responses/networking.js";




const SectionAddButton = ({onClick}) => {
    return (
        <div className='account-page-section-modify-button hz-center'>
            <img src={addIcon} onClick={onClick}/>
        </div>
    );
};

const SectionEditButton = ({onClick}) => {
    return (
        <div className='account-page-section-modify-button hz-center'>
            <img src={editIcon} onClick={onClick}/>
        </div>
    );
};

const AccountSectionCard = ({title, children, onEditClick, onAddClick}) => {
    return (
        <div id={`account-page-${title}-section`} className='account-page-section-card'>
        <div className='account-page-section-header hz-space-btwn'>
            <h2>{title}</h2>
            <div className='account-page-section-modify hz-center'>
                <SectionAddButton onClick= {onAddClick} />
                <SectionEditButton onClick= {onEditClick} />
            </div>
        </div>
        <div className='account-page-section-content'>
            {children}
        </div>
    </div>
    );
};

const ExperienceEntry = ({company, position, type, description, startDate, endDate}) => {    
    return (
        <div className='account-page-experience-entry v-center'>
            <h3>{company}</h3>
            <p>{position}</p>
            <p>{type}</p>
            <p>{startDate} - {endDate}</p>
            <p>{description}</p>
        </div>
    );
};

const EducationEntry = ({schoolName, degree, major, minor, graduationDate, courses}) => {
    return (
        <div className='account-page-education-entry v-center'>
            <h3>{schoolName}</h3>
            <p>{degree} in {major} {minor && `with a minor in ${minor}`}</p>
            <p>Graduated {graduationDate}</p>
            {courses &&
                <ul>
                    {courses.map((course, index) => (
                        <li key={index}>{course}</li>
                    ))}
                </ul>
            }
        </div>
    );
};

const AccountPage = () => {
    // you should fetch the data when the page loads,
    // set variables in a context just for this page, and update when needed

    // when we initially call to get user details, we'll set all these state variables
    const [isLoading, setIsLoading] = useState(false);

    // const [loggedInUserProfilePictureUrl, setLoggedInUserProfilePictureUrl] = useState("https://us.123rf.com/450wm/tuktukdesign/tuktukdesign1805/tuktukdesign180500044/100913847-user-icon-vector-male-person-symbol-profile-circle-avatar-sign-in-flat-color-glyph-pictogram.jpg");
    // const [loggedInUserName, setLoggedInUserName] = useState("John Doe");
    // const [loggedInUserTitle, setLoggedInUserTitle] = useState("Software Engineer");
    // const [loggedInUserLocation, setLoggedInUserLocation] = useState("San Francisco, CA");

    const [userDetails, setUserDetails] = useState(exampleUserDetails);


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
                            <img id='account-page-profile-picture' src={userDetails.profilePhotoUrl} alt="profile picture" />
                            <div id='account-page-user-header-details' className='v-center'>
                                <h1>{userDetails.name}</h1>
                                <h2>{userDetails.title}</h2>
                                <h3>{userDetails.location}</h3>
                            </div>
                        </div>
                        {}
                        <AccountSectionCard title='Experience' onEditClick={() => {}} onAddClick={() => {}}>
                            {userDetails.experience.map((entry, index) => (
                                <ExperienceEntry key={index} {...entry} />
                            ))}
                        </AccountSectionCard>
                        <AccountSectionCard title='Education' onEditClick={() => {}} onAddClick={() => {}}>
                            {userDetails.education.map((entry, index) => (
                                <EducationEntry key={index} {...entry} />
                            ))}
                        </AccountSectionCard>
                        <AccountSectionCard title='Skills' onEditClick={() => {}} onAddClick={() => {}}>
                            <ul>
                                {userDetails.skills.map((skill, index) => (
                                    <li key={index}>{skill}</li>
                                ))}
                            </ul>
                        </AccountSectionCard>
                    </div>
                </div>
            }        
        </>

    );
};

export default AccountPage;