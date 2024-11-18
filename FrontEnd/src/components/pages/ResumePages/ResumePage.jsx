import { useState, useContext, useEffect } from 'react';
import '../../../styles/ResumePage.css';
import { ClipLoader } from 'react-spinners'; 
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FolderIcon from '@mui/icons-material/Folder';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SavedResumesSection from './sections/SavedResumesSection';
import ApplicationsSection from './sections/ApplicationsSection';
import EditResumeSection from './sections/EditResumeSection';
import { ResumeContext } from '../../../context/ResumeProvider';
import { useApi } from "../../../hooks";
import { set } from 'date-fns';


const ResumePage = () => {
    const api = useApi();
    // const [value, setValue] = useState('repository');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { sectionSelected, setSectionSelected } = useContext(ResumeContext);
    const [selectedResumeId, setSelectedResumeId] = useState(null);

    useEffect(() => {
        // Simulate loading
        // setTimeout(() => setLoading(false), 1000);

        // Load section from local storage
        const savedSection = localStorage.getItem('sectionSelected');
        if (savedSection) {
            // setValue(savedSection);
            setSectionSelected(savedSection);
        }
    }, [setSectionSelected]);

    const handleChange = (event, newValue) => {
    //   setValue(newValue);
      setSectionSelected(newValue);
      localStorage.setItem('sectionSelected', newValue);
    };

    const showResume = (resumeId) => {
        setSelectedResumeId(resumeId);
        setSectionSelected('edit');
        console.log('showResume resumeId', resumeId);
    };

    // console.log('sectionSelected', sectionSelected);

    useEffect(() => {
        console.log('sectionSelected', sectionSelected);
        console.log('selectedResumeId', selectedResumeId);
    }, [sectionSelected, selectedResumeId]);

    return (
        <div id='resume-page-root'>
            <div id='resume-tabs-container'>
                <Tabs value={sectionSelected} onChange={handleChange} aria-label="icon label tabs example">
                    <Tab sx={{ fontSize: '12px'}} icon={<FolderIcon />} label="Repository" value="repository" disableRipple />
                    <Tab sx={{ fontSize: '12px'}} icon={<AccessTimeIcon />} label="Applications" value="applications" disableRipple />
                    <Tab sx={{ fontSize: '12px'}} icon={<EditOutlinedIcon />} label="Edit" value="edit" disableRipple />
                </Tabs>
            </div>

            
            <div id='resume-page-main-content'>
                {/* {isLoading ? (
                    <ClipLoader />
                ) : ( */}
                    <>
                        {sectionSelected === 'repository' && <SavedResumesSection showResume={showResume} />}
                        {sectionSelected === 'applications' && <ApplicationsSection />}
                        {sectionSelected === 'edit' && <EditResumeSection resumeId={selectedResumeId} setSelectedResumeId={setSelectedResumeId}/>}
                    </>
                {/* )} */}
            </div>
        </div>
    );
};

export default ResumePage;