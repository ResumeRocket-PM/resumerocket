import React, { useState, useEffect } from 'react';
import { exampleSavedResumesResponse } from "../../../../example_responses/resume";
import VersionHistory from '../VersionHistory'; // Import the VersionHistory component
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useApi } from "../../../../hooks";

const ResumeRow = ({ resume, showVersionHistory }) => {
    return (
        <div className='resume-row'>
            <div className='resume-cell version-cell hz-center'>
                <AccessTimeIcon className="version-history-icon" onClick={() => showVersionHistory(resume)}/>
            </div>
            <div className='resume-cell'>
                {resume.resumeName}
            </div>
            <div className='resume-cell'>{new Date(resume.createdDate).toLocaleDateString()}</div>
            <div className='resume-cell'>{new Date(resume.lastModifiedDate).toLocaleDateString()}</div>
        </div>
    );
}

const SavedResumesSection = () => {
    const api = useApi();
    const [resumes, setResumes] = useState([]);
    const [contentToShow, setContentToShow] = useState('saved-resumes');
    const [selectedResume, setSelectedResume] = useState(null);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const showVersionHistory = (resume) => {
        setSelectedResume(resume);
        setContentToShow('resume-version-history');
    };


    const loadPage = () => {
        api.get(`/resume/saved-resumes`)
        .then(response => response.json())
        .then(data => {
            setResumes(data.result);
        })
        .catch(error => {
            console.error("Failed to fetch data:", error);
            setError(error.message);
            setIsLoading(false);
        });
    }

    useEffect(() => {   
        loadPage()
    }, []);


    return (
        <div id='saved-resumes-section-root'>
            {contentToShow === 'saved-resumes' ? (
                <div id='resume-rows-container'>
                    <div className='resume-row header'>
                        <div className='resume-cell header version-header'></div>
                        <div className='resume-cell header'>Resume Name</div>
                        <div className='resume-cell header'>Created</div>
                        <div className='resume-cell header'>Last Modified</div>
                    </div>
                    {exampleSavedResumesResponse.resumeList.map((resume, index) => (
                        <ResumeRow key={index} resume={resume} showVersionHistory={showVersionHistory} />
                    ))}
                </div>
            ) : (
                <VersionHistory resume={selectedResume} setContentToShow={setContentToShow} />
            )}
        </div>
    );
};

export default SavedResumesSection;