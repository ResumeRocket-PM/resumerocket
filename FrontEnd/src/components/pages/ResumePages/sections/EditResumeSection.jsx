import React, { useState, useEffect } from 'react';
import CreateResume from '../../CreateResume';
import { useApi } from "../../../../hooks";

const EditResumeSection = ({resumeId, setSelectedResumeId}) => {
    const api = useApi();
    const [resumes, setResumes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch the list of resumes
        api.get('/resume/all')
            .then(response => response.json())
            .then(data => {
                setResumes(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Failed to fetch resumes:', error);
                setError(error.message);
                setIsLoading(false);
            });
    }, []);

    const handleResumeClick = (resumeId) => {
        setSelectedResumeId(resumeId);
        // Additional logic to load and show the selected resume can be added here
    };

    return (
            <CreateResume resumeId={resumeId}/>
    );
};

export default EditResumeSection;