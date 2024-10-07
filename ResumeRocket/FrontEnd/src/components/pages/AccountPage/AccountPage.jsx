import {useState, useEffect} from 'react';
import { ClipLoader } from 'react-spinners'; 
import Chip from '@mui/material/Chip';

import { Dialog, DialogContent, DialogTitle, TextField, Button } from "@mui/material"

import { useApi } from "../../../hooks.js";

import userSolidOrange from "../../../assets/user-solid-orange.svg"
import "../../../styles/AccountPage.css";
import { exampleUserDetails } from "../../../example_responses/networking.js";
import AccountSectionCard from './AccountSectionCard'; 
import SectionEditButton from './SectionEditButton'; 
import ExperienceEntry from './ExperienceEntry.jsx'; 
import EducationEntry from './EducationEntry.jsx'; 


const AddExperienceDialog = ({ dialogOpen, setDialogOpen, userDetails, setUserDetails, onClose }) => {
    const api = useApi();

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

        // changeUserDetailsAsync(api, formData);

        // Update the user details

        const sanitizedData = {};
        for (const key in formData) {
            if (formData[key] === '') {
                sanitizedData[key] = null;
            } else {
                sanitizedData[key] = formData[key];
            }
        }

        api.post('/account/experience', sanitizedData).then(response => {
            if (response.ok) {
              response.json().then(data => {
                onClose()
              });
            }
            else {
              console.log("Failed to save account");
            }
          })

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

const AddEducationDialog = ({ dialogOpen, setDialogOpen, onClose }) => {
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

// const AddSkillDialog = ({ dialogOpen, setDialogOpen }) => {
//     const [formData, setFormData] = useState({
//         skillName: '',
//         proficiency: ''
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Process form data here
//         console.log(formData);
//         // Close the dialog
//         setDialogOpen('none');
//     };

//     return (
//         <Dialog
//             open={dialogOpen === 'addSkills'}
//             onClose={() => setDialogOpen('none')}
//         >
//             <DialogTitle>Add Skill</DialogTitle>
//             <DialogContent>
//                 <form onSubmit={handleSubmit}>
//                     <TextField
//                         label='Skill Name'
//                         name='skillName'
//                         value={formData.skillName}
//                         onChange={handleChange}
//                         fullWidth
//                         margin='normal'
//                     />
//                     <TextField
//                         label='Proficiency'
//                         name='proficiency'
//                         value={formData.proficiency}
//                         onChange={handleChange}
//                         fullWidth
//                         margin='normal'
//                     />
//                     <Button type='submit' variant='contained' color='primary'>
//                         Add
//                     </Button>
//                 </form>
//             </DialogContent>
//         </Dialog>
//     );
// };

const EditExperienceDialog = ({ dialogOpen, setDialogOpen, experience, onClose }) => {
    // parse dialogOpen to get the index of the experience entry to edit
    const openType = dialogOpen.split('-')[0];
    const index = !isNaN(parseInt(dialogOpen.split('-')[1])) ? parseInt(dialogOpen.split('-')[1]) : null;
    // console.log(parseInt(dialogOpen.split('-')[1]));
    // console.log(experience[index].company);

    if (index !== null) {
        console.log(experience[index].company);
    }
    
    const [formData, setFormData] = useState({});

    const isValidDate = (date) => {
        return date instanceof Date && !isNaN(date.getTime());
    };
    
    const parseDate = (dateString) => {
        const date = new Date(dateString);
        return isValidDate(date) ? date : null;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'startDate' || name === 'endDate') {

            if(isValidDate(parseDate(value)) )
            {
                // Convert the date string to a Date object
                const dateParts = value.split('/');
                const formattedDate = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
                setFormData({
                    ...formData,
                    [name]: formattedDate.toISOString().split('T')[0] // Format as YYYY-MM-DD
                });
            }

        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Process form data here
        console.log(formData);
        // Close the dialog
        setDialogOpen('none');
    };

    useEffect(() => {
        if (index !== null && experience[index]) {
            const selectedExperience = experience[index];
        
    
            setFormData({
                company: selectedExperience.company,
                position: selectedExperience.position,
                type: selectedExperience.type,
                description: selectedExperience.description,
                startDate: selectedExperience.startDate ? parseDate(selectedExperience.startDate).toISOString().split('T')[0] : '',
                endDate: selectedExperience.endDate ? parseDate(selectedExperience.endDate).toISOString().split('T')[0] : ''
            });
        } else {
            setFormData({
                company: '',
                position: '',
                type: '',
                description: '',
                startDate: '',
                endDate: ''
            });
        }
    }, [index, experience]);

    return (
        <Dialog
            open={openType === 'editExperience'}
            onClose={() => setDialogOpen('none')}
        >
            <DialogTitle>Edit Experience</DialogTitle>
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
                        multiline
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
                        Edit
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

const EditEducationDialog = ({ dialogOpen, setDialogOpen, education, onClose }) => {
    // Parse dialogOpen to get the index of the education entry to edit
    const openType = dialogOpen.split('-')[0];
    const index = !isNaN(parseInt(dialogOpen.split('-')[1])) ? parseInt(dialogOpen.split('-')[1]) : null;

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
        // Handle form submission logic here
    };

    const isValidDate = (date) => {
        return date instanceof Date && !isNaN(date.getTime());
    };
    
    const parseDate = (dateString) => {
        const date = new Date(dateString);
        return isValidDate(date) ? date : null;
    };
    
    useEffect(() => {
        if (index !== null) {
            const selectedEducation = education[index];

            setFormData({
                schoolName: selectedEducation.schoolName,
                degree: selectedEducation.degree,
                major: selectedEducation.major,
                minor: selectedEducation.minor,
                graduationDate: selectedEducation.graduationDate ? parseDate(selectedEducation.graduationDate).toISOString().split('T')[0] : '',
                courses: selectedEducation.courses.join(', ')
            });
        } else {
            setFormData({
                schoolName: '',
                degree: '',
                major: '',
                minor: '',
                graduationDate: '',
                courses: ''
            });
        }
    }, [index, education]);

    return (
        <Dialog
            open={openType === 'editEducation'}
            onClose={() => setDialogOpen('none')}
        >
            <DialogTitle>Edit Education</DialogTitle>
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
                        Edit
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

const EditSkillsDialog = ({ dialogOpen, setDialogOpen, skills }) => {
    const [newSkill, setNewSkill] = useState('');
    const [currentSkills, setCurrentSkills] = useState(skills);

    // useEffect(() => {
    //     setCurrentSkills(skills);
    // }, []);

    // const [formData, setFormData] = useState({
    //     skills: skills.join(', ')
    // });

    
    const handleDeleteSkill = (index) => {
        const updatedSkills = currentSkills.filter((skill, i) => i !== index);
        setCurrentSkills(updatedSkills);
    };

    const onClose = () => { 
        setDialogOpen('none');
        setTimeout(() => {
            setCurrentSkills(skills);
        }, 500);
    }

    return (
        <Dialog
            open={dialogOpen === 'editSkills'}
            onClose={() => onClose()}
        >
            <DialogTitle>Edit Skills</DialogTitle>
            <DialogContent sx={{ width: '30rem' }}>
                <TextField
                    label='Add Skill'
                    name='skillName'
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyUp={(e) => {
                        if (e.key === 'Enter') {
                            setCurrentSkills([...currentSkills, newSkill]);
                            setNewSkill('');
                        }
                    }}
                    fullWidth
                    margin='normal'
                >
                </TextField>
                <div>
                    {currentSkills.map((skill, index) => (
                        <Chip
                            key={index}
                            label={skill}
                            onDelete={() => handleDeleteSkill(index)}
                            color="primary"
                            variant="outlined"
                            style={{ margin: '0.5rem' }}
                        />
                    ))}
                </div>
                <div id='edit-skills-save-button' className='hz-right'>
                    <Button
                        onClick={() => {
                            // Process form data here
                            console.log(currentSkills);
                            // Close the dialog
                            setDialogOpen('none');
                        }}
                        variant='contained'
                        color='primary'
                    >
                        Save
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

const EditFieldModal = ({dialogOpen, setDialogOpen, fieldName, fieldValue, onClose }) => {
    const [newValue, setNewValue] = useState(fieldValue);

    const handleClose = () => { 
        setDialogOpen('none');
        onClose(fieldName, newValue);
    }

    return (
        <Dialog
            open={dialogOpen === 'edit' + fieldName}
            onClose={() => handleClose()}
        >
            <DialogTitle>Edit {fieldName}</DialogTitle>
            <DialogContent sx={{ width: '30rem' }}>
                <TextField
                    label={'Modify ' + fieldName}
                    name={fieldName}
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    fullWidth
                    margin='normal'
                >
                </TextField>
            </DialogContent>
        </Dialog>
    );
}


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
    
                console.log('data', data)
                
                // setUserDetails(data.result)

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