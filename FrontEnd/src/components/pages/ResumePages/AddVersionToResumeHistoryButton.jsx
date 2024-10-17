import React, { useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { useApi } from "../../../hooks"; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// This is to be used from the repository page to upload a new ORIGINAL resume
// which means it will send another param - OriginalResume = true - with each request

// the resume param is already html for the resume
const UploadNewResumeButton = ({resume, originalResumeId, resumeLoading, resumeDoneEditing}) => {

  const [fileName, setFileName] = useState('Upload');
  const [file, setFile] = useState(null); // Store the uploaded file
  const [versionIsUploading, setVersionIsUploading] = useState(false);
  const api = useApi(); 

  const handleSubmit = () => {
    const formData = new FormData();
    // formData.append('File', selectedFile); // Append the file to FormData
    formData.append("ResumeHtmlString", resume); // Append the ResumeHtmlString to FormData

    setVersionIsUploading(true); // Show loading indicator
    console.log('formData', formData);

    api.postFileForm(`/resume/${originalResumeId}/addToVersionHistory`, formData) // Call the API to upload
      .then(response => {
        console.log('Response from API:', response);
        toast.success('Resume added to version history successfully!');
      })
      .catch(error => {
        console.error('Error uploading file:', error);
        toast.error('Failed to add resume to version history.');
      })
      .finally(() => {
        setVersionIsUploading(false); // Stop loading indicator
        setFile(null); // Reset file input
        setFileName('Upload'); // Reset button text
        // loadPage(); // Reload the page to show the new resume
      });
};

console.log('resume', resume);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
        {/* {fileName} Display the file name or default button text */}
        Save Version
      </Button>

      <ToastContainer />
    </div>
  );
};

export default UploadNewResumeButton;
