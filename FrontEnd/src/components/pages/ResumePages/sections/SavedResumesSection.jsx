import React, { useState, useEffect } from 'react';
import { exampleSavedResumesResponse } from "../../../../example_responses/resume";
import VersionHistory from '../VersionHistory'; // Import the VersionHistory component
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useApi } from "../../../../hooks";
import { ClipLoader } from 'react-spinners'; 
import UploadNewResumeButton from '../UploadNewResumeButton';

import { parseISO, format } from 'date-fns';



const ResumeRow = ({ resume, displayName, showVersionHistory, showResume }) => {

    // console.log('resume--------', resume);
    // console.log('resume.originalResumeID', resume.originalResumeID);
    // console.log('resume.originalResume', resume.originalResume);

    const formatDate = (dateStr) => {
        const date = parseISO(dateStr);  // parse the ISO date string
        return format(date, 'MM/dd/yyyy');  // format as needed
    };

    return (
        <div className='resume-row'>
            <div className='resume-cell version-cell hz-center'>
                <AccessTimeIcon className="version-history-icon" onClick={() => showVersionHistory(resume.resumeId)} />
            </div>
            <div className='resume-cell resume-name' onClick={() => showResume(resume.resumeId)}>
                {/* {resume.resumeName} */}
                {displayName}
            </div>
            <div className='resume-cell'>{formatDate(resume.insertDate)}</div>
            <div className='resume-cell'>{formatDate(resume.updateDate)}</div>
        </div>
    );
};

const SavedResumesSection = ({showResume}) => {
    const api = useApi();
    const [resumes, setResumes] = useState([]);
    const [contentToShow, setContentToShow] = useState('saved-resumes');
    const [selectedOriginalResumeId, setSelectedOriginalResumeId] = useState(null);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const showVersionHistory = (resumeId) => {
        setSelectedOriginalResumeId(resumeId);
        setContentToShow('resume-version-history');
    };


    const loadPage = () => {
        api.get(`/resume/all`)
        .then(response => response.json())
        .then(data => {
            console.log('data', data);
            setResumes(data);
            setIsLoading(false);
        })
        .catch(error => {
            console.error("Failed to fetch data:", error);
            setError(error.message);
            setIsLoading(false);
        });


        // api.get(`/resume/primary/pdf`)
        // .then(response => response.json())
        // .then(data => {
        //     console.log('primary data', data);
        //     // setResumes(data);
        //     setIsLoading(false);
        // })
        // .catch(error => {
        //     console.error("Failed to fetch data:", error);
        //     setError(error.message);
        //     setIsLoading(false);
        // });
    }

    // const showEditResume = (resumeId) => {
    //     console.log('showEditResume', resumeId);
    //     showResume('edit');
    // };

    useEffect(() => {   
        loadPage()
    }, []);

    console.log('resumes', resumes);


    return (
        <>
            {isLoading ? (
                <ClipLoader />
            ) : (
                <div id='saved-resumes-section-root'>
                    {contentToShow === 'saved-resumes' ? (
                        <div id='resume-rows-container'>
                            <div className='resume-row header'>
                                <div className='resume-cell header version-header'></div>
                                <div className='resume-cell header'>Resume Name</div>
                                <div className='resume-cell header'>Created</div>
                                <div className='resume-cell header'>Last Modified</div>
                            </div>
                            {resumes
                                .filter(resume => resume.originalResumeID === null) // Filter resumes to only include those with originalResumeID set to null
                                .map((resume, index) => (
                                    <ResumeRow 
                                        key={index} 
                                        resume={resume} 
                                        displayName={"resume" + resume.resumeId} 
                                        showVersionHistory={showVersionHistory} 
                                        showResume={showResume}
                                    />
                                ))
                            }
                            <UploadNewResumeButton loadPage={loadPage}/>
                        </div>
                    ) : (
                        <VersionHistory originalResumeId={selectedOriginalResumeId} setContentToShow={setContentToShow} />
                    )}
                </div>
            )}        
        </>

    );
};

export default SavedResumesSection;