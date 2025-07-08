import React, { useEffect, useState } from 'react';
import { useApi } from "../../../hooks.js";
import UserProfileHeader from './UserProfileHeader'; // Import the new header component
import AccountSectionCard from '../AccountPage/AccountSectionCard.jsx'; 
import ExperienceEntry from '../AccountPage/ExperienceEntry.jsx'; 
import EducationEntry from '../AccountPage/EducationEntry.jsx'; 
import { Chip } from '@mui/material';


const ResumeContent = ({ accountId, isMobile, selectedUserIndex }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedUserDetails, setSelectedUserDetails] = useState(null);

  const api = useApi();

  useEffect(() => {
    setLoading(true);
    if (accountId) {
      api.get(`/account/${accountId}`).then(response => {
        if (response.ok) {
          response.json().then(data => {
            setSelectedUserDetails(data.result);
            setLoading(false);
          });
        } else {
          console.log("Failed to fetch account");
          setLoading(false);
        }
      });
    }
  }, [accountId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!selectedUserDetails) {
    return <div>No user details available.</div>;
  }

  if (!selectedUserDetails) {
    return null; // or a loading spinner if you prefer
  }

  return (
    <div id="networking-page-content"  style={{ display: isMobile && selectedUserIndex === null ? 'none' : '' }}>
      <UserProfileHeader
        userDetails={selectedUserDetails}
      />
      {/* Additional content like Experience and Education goes here */}


      {/* Experience Section */}
      {selectedUserDetails.experience && selectedUserDetails.experience.length > 0 && (
        <AccountSectionCard 
          title='Experience' 
          buttonType={'none'}
        >
          {selectedUserDetails.experience
            .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
            .map((entry, index) => (
              <ExperienceEntry key={index} {...entry}/>
            ))}
        </AccountSectionCard>
      )}

      {/* Education Section */}
      {selectedUserDetails.education && selectedUserDetails.education.length > 0 && (
        <AccountSectionCard 
          title='Education' 
          buttonType={'none'}
        >
          {selectedUserDetails.education
            .sort((a, b) => new Date(b.graduationDate) - new Date(a.graduationDate))
            .map((entry, index) => (
              <EducationEntry key={index} {...entry}/>
            ))}
        </AccountSectionCard>
      )}

      {/* Skills Section */}
      {selectedUserDetails.skills && selectedUserDetails.skills.length > 0 && (
        <AccountSectionCard 
          title='Skills' 
          buttonType={'none'}
        >
          {selectedUserDetails.skills.map((skill, index) => (
            <Chip
              key={index}
              label={skill.description}
              color="primary"
              style={{ margin: '0.2rem', backgroundColor: 'var(--space-cadet', color: 'white'}}
            />
          ))}
        </AccountSectionCard>
      )}
    </div>
  );
};

export default ResumeContent;
