import React, { useState } from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useApi } from "../../../hooks"; 

const UploadPDFButton = ({ primaryResumeId, onSubmit }) => {
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
    formData.append('Data', JSON.stringify({ primaryResumeId })); // Add any additional data

    setIsLoading(true); // Show loading indicator
    console.log('formData', formData);

    api.postFileForm("/resume/primary", formData) // Call the API to upload
      .then(response => {
        onSubmit(); // Trigger callback after successful submission
      })
      .catch(error => {
        console.error('Error uploading file:', error);
      })
      .finally(() => {
        setIsLoading(false); // Stop loading indicator
        setFile(null); // Reset file input
        setFileName('Upload'); // Reset button text
      });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <Button variant="contained" onClick={handleUploadClick} disabled={isLoading}>
        {fileName} {/* Display the file name or default button text */}
      </Button>

      <Link to={`/create-resume/${primaryResumeId}`} style={{ textAlign: 'center' }}>
        {primaryResumeId != null ? 'Modify Uploaded Resume' : null }
      </Link>
    </div>
  );
};

export default UploadPDFButton;
