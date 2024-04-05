import "../../styles/ResumeListPage.css";
import {Card, CardContent, Typography, TextField, Menu, MenuItem, Button} from '@mui/material/';
import addIcon from '../../assets/add.png';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";



export default function ResumeListPage() {

    const navigate = useNavigate(); // note, there is another thing called redirect that is supposdely better for loaders
    const [listingURL, setListingURL] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleChooseResumeButtonClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleChooseResumeClose = (action) => {

        switch (action) {
            case 'from saved resumes':
                // Handle "From saved resumes" action
                break;
            case 'upload resume': {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = '.pdf,.doc,.docx,.txt';
                input.onchange = (e) => {
                    const file = e.target.files[0];
                    // Handle the uploaded file, e.g., send it to a server
                    console.log('Uploaded file:', file);
                };
                input.click();
                break;
            }
            default:
                break;
        }
        setAnchorEl(null);
    };

    const handleCreateResumeButtonClick = () => {
        // validate the listing URL
        // validate that they have choosen a resume option

        // if valid, navigate to create resume page
        console.log('Create Resume button clicked')
        return navigate('/create-resume');

    }

    const dummyData = [
        {
            id: 1,
            appliedDate: '2022-01-01',
            company: 'Company A',
            position: 'Position A',
            status: 'Applied',
            resume: 'Link to Resume A'
        },
        {
            id: 2,
            appliedDate: '2022-01-02',
            company: 'Company B',
            position: 'Position B',
            status: 'Under Review',
            resume: 'Link to Resume B'
        },
        {
            id: 3,
            appliedDate: '2022-01-03',
            company: 'Company C',
            position: 'Position C',
            status: 'Rejected',
            resume: 'Link to Resume C'
        },
        {
            id: 4,
            appliedDate: '2022-01-04',
            company: 'Company D',
            position: 'Position D',
            status: 'Offer Extended',
            resume: 'Link to Resume D'
        }
    ];

    return (
        <div id='ResumeList_content'>
            <div id="resume_entry_list">
                <div id="resume_entry_list_header">
                    <h2>Applied date</h2>
                    <h2>Company</h2>
                    <h2>Position</h2>
                    <h2>Status</h2>
                    <h2>Resume</h2>
                </div>
                {dummyData.map((result) => (
                    //map over results and display each result in a card
                    <Card
                        sx={{
                            // width: { xs: '400px', sm: '400px', md: '400px', lg: '400px' }
                        }}
                        key={result.username}
                        style={{ cursor: 'pointer' }} // Add this style for cursor change
                    >
                        <CardContent
                            sx={{
                                // display: 'flex',
                                // flexDirection: 'row',
                                // justifyContent: 'space-evenly'
                                display: 'grid',
                                gridTemplateColumns: 'repeat(5, 1fr)',
                            }}
                        >
                            <Typography align='center'>
                                {result.appliedDate}
                            </Typography>
                            <Typography align='center'>
                                {result.company}
                            </Typography>
                            <Typography align='center'>
                                {result.position}
                            </Typography>
                            <Typography align='center'>
                                {result.status}
                            </Typography>
                            <Typography align='center'>
                                {result.resume}
                            </Typography>
                        </CardContent>

                    </Card>
                ))}
                <Card sx={{marginTop:'3em'}}> 
                    <CardContent
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'end',
                            gap: '30px'
                        }}
                    >
                        <Typography 
                        display='flex' 
                        flexDirection='row'
                        marginLeft='10px'
                        >
                            <Button
                                id="create_resume_button"
                                sx={{padding:'0', gap:'5px'}}
                                onClick={handleCreateResumeButtonClick}
                            >
                                <img id='create_resume_button' src={addIcon} alt="create resume from job listing button" style={{ width: 20, height: 20 }} />   
                                Create Resume
                            </Button>

                        </Typography>
                        <div style={{ display:'flex', flexDirection:'column', justifyContent:'end'}}>
                            <Button
                                id="choose_resume_button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleChooseResumeButtonClick}
                                sx={{padding:'0'}}
                            >
                                Choose Resume
                            </Button>   
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleChooseResumeClose}
                                MenuListProps={{
                                'aria-labelledby': 'basic-button',
                                }}
                            >        
                                <MenuItem onClick={() => handleChooseResumeClose('from saved resumes')}>From saved resumes</MenuItem>
                                <MenuItem onClick={() => handleChooseResumeClose('upload resume')}>Upload resume</MenuItem>
                            </Menu>                                             
                        </div>
                        <TextField
                        label="Enter job listing URL"
                        variant="standard"
                        value={listingURL}
                        onChange={(e) => setListingURL(e.target.value)}
                        marginTop='0px'
                        sx={{width: '40%'}}
                        />  
                    </CardContent>
                </Card>            
            </div>
        </div>
    )
}