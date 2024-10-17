import React, { useState, useEffect } from 'react';
import '../../../styles/ResumePage.css';
import { ClipLoader } from 'react-spinners'; 
import { useApi } from "../../../hooks";
import ShowResume from './ShowResume'; // Import the ShowResume component
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';

const VersionHistory = ({ originalResumeId, setContentToShow }) => {
    const api = useApi();

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [versionHistory, setVersionHistory] = useState([]);
    const [selectedResumeId, setSelectedResumeId] = useState(null); // State to track selected resume ID

    const loadVersionHistory = () => {
        api.get(`/resume/${originalResumeId}/history`)
            .then(response => response.json())
            .then(data => {
                console.log('data', data);
                setVersionHistory(data.result); // Save the response data to the state variable
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Failed to fetch data:", error);
                setError(error.message);
                setIsLoading(false);
            });
    };

    useEffect(() => {   
        loadVersionHistory();
    }, []);

    const handleNameClick = (resumeId) => {
        console.log(`Resume ${resumeId} clicked`);
        setSelectedResumeId(resumeId); // Set the selected resume ID
    };

    const handleBackClick = () => {
        setSelectedResumeId(null); // Reset the selected resume ID to go back to version history
    };

    return (
        <div>
            {selectedResumeId ? (
                <ShowResume resumeId={selectedResumeId} onBackClick={handleBackClick} />
            ) : (
                <>
                    <Button onClick={() => setContentToShow('saved-resumes')} variant="contained" style={{ marginBottom: '20px' }}>
                        Back to Saved Resumes
                    </Button>
                    {isLoading && <ClipLoader />}
                    {error && <p>Error: {error}</p>}
                    {!isLoading && !error && (
                    <Card>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={7}>
                                    <Typography variant="h6">Name</Typography>
                                </Grid>
                                <Grid item xs={2.5}>
                                    <Typography variant="h6">Insert Date</Typography>
                                </Grid>
                                <Grid item xs={2.5}>
                                    <Typography variant="h6">Update Date</Typography>
                                </Grid>
                            </Grid>
                            {versionHistory.map((resume, index) => (
                                <Grid container spacing={2} key={resume.resumeId} className="resume-row">
                                    <Grid item xs={7}>
                                        <Typography 
                                            className="resume-name" 
                                            onClick={() => handleNameClick(resume.resumeId)}
                                            style={{ cursor: 'pointer', color: 'blue' }}
                                        >
                                            {`resume${resume.originalResumeID}version-${index + 1}`}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={2.5}>
                                        <Typography className="resume-insert-date">
                                            {new Date(resume.insertDate).toLocaleDateString()}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={2.5}>
                                        <Typography className="resume-update-date">
                                            {new Date(resume.updateDate).toLocaleDateString()}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            ))}
                        </CardContent>
                    </Card>
                    )}
                </>
            )}
        </div>
    );
};

export default VersionHistory;