/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useApi } from "../../../../hooks";
import { ClipLoader } from 'react-spinners'; 
import UploadNewResumeButton from '../UploadNewResumeButton';
import { parseISO, format } from 'date-fns';

const ResumeRow = ({ resume, displayName, showResume }) => {
    const formatDate = (dateStr) => {
        const date = parseISO(dateStr);  // parse the ISO date string
        return format(date, 'MM/dd/yyyy');  // format as needed
    };

    return (
        <div className='resume-row'>
            <div className='resume-cell resume-name' onClick={() => showResume(resume.resumeId)}>
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

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadPage = () => {
        api.get(`/resume/all`)
        .then(response => response.json())
        .then(data => {
            setResumes(data);
            setIsLoading(false);
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

    console.log('resumes', resumes);

    return (
        <>
            {
                isLoading ? (
                    <ClipLoader />
                ) : 
                (
                    <div id='saved-resumes-section-root'>
                        {
                            contentToShow === 'saved-resumes' ? (
                                <div id='resume-rows-container'>
                                    <div className='resume-row header'>
                                        <div className='resume-cell header'>Resume Name</div>
                                        <div className='resume-cell header'>Created</div>
                                        <div className='resume-cell header'>Last Modified</div>
                                    </div>
                                    {resumes
                                        // Filter resumes to only include the latest version of those with originalResumeID set to null
                                        .filter(resume => resume.originalResumeID === null)
                                        .map((resume, index) => (
                                            <ResumeRow 
                                                key={index} 
                                                resume={resume} 
                                                displayName={"resume" + resume.resumeId}
                                                showResume={showResume}
                                            />
                                        ))
                                    }
                                    <UploadNewResumeButton loadPage={loadPage}/>
                                </div>
                            ) : 
                            null
                        }
                    </div>
                )
            }        
        </>
    );
};

export default SavedResumesSection;