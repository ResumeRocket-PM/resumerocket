import React, { useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { useApi } from "../../../hooks"; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// This is to be used from the repository page to upload a new ORIGINAL resume
// which means it will send another param - OriginalResume = true - with each request

// the resume param is already html for the resume
const AddVersionToResumeHistoryButton = ({resume, originalResumeId, resumeLoading, resumeDoneEditing, afterVersionSave, reloadVersionHistory, saveSuggestionStatuses}) => {

  const [fileName, setFileName] = useState('Upload');
  const [file, setFile] = useState(null); // Store the uploaded file
  const [versionIsUploading, setVersionIsUploading] = useState(false);
  const api = useApi(); 

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("ResumeHtmlString", resume); // Append the ResumeHtmlString to FormData

    setVersionIsUploading(true); // Show loading indicator
    console.log('formData', formData);

    saveSuggestionStatuses(); // Save the suggestion statuses before uploading the new version

    try {
        const response = await api.postFileForm(`/resume/${originalResumeId}/addToVersionHistory`, formData); // Call the API to upload
        console.log('Response from API:', response);

        const data = await response.json();
        console.log('data', data);

        if (data && data.result && data.result.resumeId) {
            const newResumeId = data.result.resumeId;
            console.log('resumeId', newResumeId);
            afterVersionSave(newResumeId);
            reloadVersionHistory();
            toast.success('Resume added to version history successfully!');
        } else {
            console.error('Unexpected response structure:', data);
            toast.error('Failed to add resume to version history. Unexpected response structure.');
        }
    } catch (error) {
        console.error('Error uploading file:', error);
        toast.error('Failed to add resume to version history.');
    } finally {
        setVersionIsUploading(false); // Stop loading indicator
        setFile(null); // Reset file input
        setFileName('Upload'); // Reset button text
    }
};

// console.log('resume', resume);

  return (
    <div 
      // style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
    >
      <Button 
        variant="contained" 
        onClick={handleSubmit} 
        disabled={versionIsUploading || resumeLoading || !resumeDoneEditing} 
        style={{ position: 'relative' }} // Make button relative to position the spinner
      >
        {versionIsUploading && (
          <CircularProgress 
            size={24} 
            style={{ position: 'absolute', left: '50%', marginLeft: '-12px', color: 'white' }} // Center the spinner
          />
        )}
        Save Version
      </Button>

      <ToastContainer />
    </div>
  );
};

export default AddVersionToResumeHistoryButton;
