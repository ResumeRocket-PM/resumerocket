import React, { useState } from 'react';
import { Card, CardContent, Button, Typography, Menu, MenuItem, TextField, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 
import addIcon from '../../../assets/add.png'; 
import { useApi } from "../../../hooks"; 

const SubmitJobPosting = ({ onSubmit }) => {
  const [anchorEl, setAnchorEl] = useState(null); 
  const [uploadResumeButtonContent, setUploadResumeButtonContent] = useState('Choose Resume');
  const [isValidForm, setIsValidForm] = useState(false);
  const [file, setFile] = useState(null); 
  const [url, setUrl] = useState(''); 
  const [isLoading, setIsLoading] = useState(false); 
  const navigate = useNavigate(); 
  const api = useApi(); 

  const handleCreateResumeButtonClick = () => {
    return navigate('/create-resume'); 
  };

  const handleChooseResumeButtonClick = (event) => {
    setAnchorEl(event.currentTarget); 
  };

  const handleChooseResumeClose = (option) => {
    switch (option) {
      case 'upload resume': {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.pdf,.doc,.docx,.txt';
        input.onchange = (e) => {
          const selectedFile = e.target.files[0];
          setFile(selectedFile); 
          setUploadResumeButtonContent(selectedFile.name); 
          console.log('Uploaded file:', selectedFile);
          setIsValidForm(url.length > 0 && selectedFile !== null);
        };
        input.click();
        setAnchorEl(null);
        break;
      }
      case 'Use Primary Resume':
        setUploadResumeButtonContent('Primary Resume');
        setAnchorEl(null);
        break;
      default:
        setAnchorEl(null);
        break;
    }
  };

  const handleUrlChange = (event) => {
    const newValue = event.target.value; 
    setUrl(newValue); 
    setIsValidForm(newValue.length > 0 && file !== null); 
  };

  const handleSubmit = (event) => {
    event.preventDefault(); 
    const formData = new FormData();
    formData.append('File', file); 
    formData.append('Data', JSON.stringify({ Url: url })); 

    setIsLoading(true); 
    console.log('formData', formData);

    api.postFileForm("/job/postings", formData)
      .then(response => {
        console.log('Response:', response);
      })
      .catch(error => {
        console.error('Error uploading file:', error);
      })
      .finally(() => {
        setIsLoading(false); 
        setFile(null); 
        setUploadResumeButtonContent('Choose Resume'); 
        setUrl(''); 
        setIsValidForm(false); 
        onSubmit(); 
      });
  };

  return (
    <div>
      <Card sx={{ marginTop: '3em' }}>
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'end',
            gap: '30px'
          }}
        >
          <Typography display='flex' flexDirection='row' marginLeft='10px'>
            <Button
              id="create_resume_button"
              sx={{ padding: '0', gap: '5px' }}
              onClick={handleCreateResumeButtonClick}
            >
              <img id='create_resume_button' src={addIcon} alt="create resume from job listing button" style={{ width: 20, height: 20 }} />
              Create Resume
            </Button>
          </Typography>

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'end' }}>
            <Button
              id="choose_resume_button"
              aria-controls={Boolean(anchorEl) ? 'resume-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
              onClick={handleChooseResumeButtonClick}
              sx={{ padding: '0' }}
            >
              {uploadResumeButtonContent}
            </Button>

            <Menu
              id="resume-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
              MenuListProps={{
                'aria-labelledby': 'choose_resume_button',
              }}
            >
              <MenuItem onClick={() => handleChooseResumeClose('upload resume')}>Upload File</MenuItem>
              <MenuItem onClick={() => handleChooseResumeClose('Use Primary Resume')}>Use Primary Resume</MenuItem>
            </Menu>
          </div>

          <TextField
            label="Enter job listing URL"
            variant="standard"
            value={url} 
            onChange={handleUrlChange}
            onPaste={handleUrlChange}
            sx={{ width: '40%' }}
          />

          <Button
            disabled={!isValidForm}
            id="Submit"
            onClick={handleSubmit}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Submit'} {/* Show loading indicator */}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubmitJobPosting;
