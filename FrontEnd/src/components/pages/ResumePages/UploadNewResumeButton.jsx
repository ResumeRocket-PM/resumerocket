import React, { useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { useApi } from "../../../hooks"; 

// This is to be used from the repository page to upload a new ORIGINAL resume
// which means it will send another param - OriginalResume = true - with each request

const UploadNewResumeButton = ({loadPage}) => {
  const [fileName, setFileName] = useState('Upload');
  const [file, setFile] = useState(null); // Store the uploaded file
  const [isLoading, setIsLoading] = useState(false);
  const api = useApi(); 

  const handleUploadClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf'; // Accept only PDF files
    input.onchange = (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        setFile(selectedFile); // Store the uploaded file
        setFileName(selectedFile.name); // Update button content with the file name
        handleSubmit(selectedFile); // Automatically submit after file selection
      }
    };
    input.click();
  };

  const handleSubmit = (selectedFile) => {
    const formData = new FormData();
    formData.append('File', selectedFile); // Append the file to FormData
    formData.append('OriginalResume', true); // Append the OriginalResume param

    setIsLoading(true); // Show loading indicator
    console.log('formData', formData);

    api.postFileForm("/resume/create", formData) // Call the API to upload
      .then(response => {
        console.log('Response from API:', response);
      })
      .catch(error => {
        console.error('Error uploading file:', error);
      })
      .finally(() => {
        setIsLoading(false); // Stop loading indicator
        setFile(null); // Reset file input
        setFileName('Upload'); // Reset button text
        loadPage(); // Reload the page to show the new resume
      });
};

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <Button 
        variant="contained" 
        onClick={handleUploadClick} 
        disabled={isLoading} 
        style={{ position: 'relative' }} // Make button relative to position the spinner
      >
        {isLoading && (
          <CircularProgress 
            size={24} 
            style={{ position: 'absolute', left: '50%', marginLeft: '-12px', color: 'white' }} // Center the spinner
          />
        )}
        {fileName} {/* Display the file name or default button text */}
      </Button>
    </div>
  );
};

export default UploadNewResumeButton;
