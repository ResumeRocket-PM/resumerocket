import {useState} from 'react';
import "../../styles/AccountPage.css";
import addIcon from "../../assets/plus-solid.svg";
import editIcon from "../../assets/pen-to-square-solid.svg";
// import {IconButton, SvgIcon} from "@mui/material";
import { ClipLoader } from 'react-spinners'; 
import { exampleUserDetails } from "../../example_responses/networking.js";
import { Dialog, DialogContent, DialogTitle, TextField, Button } from "@mui/material"




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

const AddExperienceDialog = ({ dialogOpen, setDialogOpen }) => {
    const [formData, setFormData] = useState({
        company: '',
        position: '',
        type: '',
        description: '',
        startDate: '',
        endDate: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Process form data here
        console.log(formData);
        // Close the dialog
        setDialogOpen('none');
    };

    return (
        <Dialog
            open={dialogOpen === 'addExperience'}
            onClose={() => setDialogOpen('none')}
        >
            <DialogTitle>Add Experience</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label='Company'
                        name='company'
                        value={formData.company}
                        onChange={handleChange}
                        fullWidth
                        margin='normal'
                    />
                    <TextField
                        label='Position'
                        name='position'
                        value={formData.position}
                        onChange={handleChange}
                        fullWidth
                        margin='normal'
                    />
                    <TextField
                        label='Type'
                        name='type'
                        value={formData.type}
                        onChange={handleChange}
                        fullWidth
                        margin='normal'
                    />
                    <TextField
                        label='Description'
                        name='description'
                        value={formData.description}
                        onChange={handleChange}
                        fullWidth
                        margin='normal'
                    />
                    <TextField
                        label='Start Date'
                        name='startDate'
                        type='date'
                        value={formData.startDate}
                        onChange={handleChange}
                        fullWidth
                        margin='normal'
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        label='End Date'
                        name='endDate'
                        type='date'
                        value={formData.endDate}
                        onChange={handleChange}
                        fullWidth
                        margin='normal'
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Button type='submit' variant='contained' color='primary'>
                        Add
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

const AddEducationDialog = ({ dialogOpen, setDialogOpen }) => {
    const [formData, setFormData] = useState({
        schoolName: '',
        degree: '',
        major: '',
        minor: '',
        graduationDate: '',
        courses: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Process form data here
        console.log(formData);
        // Close the dialog
        setDialogOpen('none');
    };

    return (
        <Dialog
            open={dialogOpen === 'addEducation'}
            onClose={() => setDialogOpen('none')}
        >
            <DialogTitle>Add Education</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label='School Name'
                        name='schoolName'
                        value={formData.schoolName}
                        onChange={handleChange}
                        fullWidth
                        margin='normal'
                    />
                    <TextField
                        label='Degree'
                        name='degree'
                        value={formData.degree}
                        onChange={handleChange}
                        fullWidth
                        margin='normal'
                    />
                    <TextField
                        label='Major'
                        name='major'
                        value={formData.major}
                        onChange={handleChange}
                        fullWidth
                        margin='normal'
                    />
                    <TextField
                        label='Minor'
                        name='minor'
                        value={formData.minor}
                        onChange={handleChange}
                        fullWidth
                        margin='normal'
                    />
                    <TextField
                        label='Graduation Date'
                        name='graduationDate'
                        type='date'
                        value={formData.graduationDate}
                        onChange={handleChange}
                        fullWidth
                        margin='normal'
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        label='Courses'
                        name='courses'
                        value={formData.courses}
                        onChange={handleChange}
                        fullWidth
                        margin='normal'
                    />
                    <Button type='submit' variant='contained' color='primary'>
                        Add
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

const AddSkillDialog = ({ dialogOpen, setDialogOpen }) => {
    const [formData, setFormData] = useState({
        skillName: '',
        proficiency: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Process form data here
        console.log(formData);
        // Close the dialog
        setDialogOpen('none');
    };

    return (
        <Dialog
            open={dialogOpen === 'addSkills'}
            onClose={() => setDialogOpen('none')}
        >
            <DialogTitle>Add Skill</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label='Skill Name'
                        name='skillName'
                        value={formData.skillName}
                        onChange={handleChange}
                        fullWidth
                        margin='normal'
                    />
                    <TextField
                        label='Proficiency'
                        name='proficiency'
                        value={formData.proficiency}
                        onChange={handleChange}
                        fullWidth
                        margin='normal'
                    />
                    <Button type='submit' variant='contained' color='primary'>
                        Add
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
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
    const [dialogOpen, setDialogOpen] = useState('none');


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
                        <AccountSectionCard title='Experience' onAddClick={() => setDialogOpen('addExperience')} onEditClick={() => setDialogOpen('editExperience')} >
                            {userDetails.experience.map((entry, index) => (
                                <ExperienceEntry key={index} {...entry} />
                            ))}
                        </AccountSectionCard>
                        <AccountSectionCard title='Education' onAddClick={() => setDialogOpen('addEducation')} onEditClick={() => setDialogOpen('editEducation')}>
                            {userDetails.education.map((entry, index) => (
                                <EducationEntry key={index} {...entry} />
                            ))}
                        </AccountSectionCard>
                        <AccountSectionCard title='Skills' onAddClick={() => setDialogOpen('addSkills')} onEditClick={() => setDialogOpen('editSkills')}>
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
                    />
                    <AddEducationDialog 
                        dialogOpen={dialogOpen} 
                        setDialogOpen={setDialogOpen}
                    />
                    <AddSkillDialog 
                        dialogOpen={dialogOpen} 
                        setDialogOpen={setDialogOpen}
                    />

                </div>
            }        
        </>

    );
};

export default AccountPage;