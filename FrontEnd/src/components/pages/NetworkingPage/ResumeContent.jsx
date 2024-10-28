import React, { useEffect, useState } from 'react';
import { useApi } from "../../../hooks.js";
import UserProfileHeader from './UserProfileHeader'; // Import the new header component
import AccountSectionCard from '../AccountPage/AccountSectionCard.jsx'; 
import ExperienceEntry from '../AccountPage/ExperienceEntry.jsx'; 
import EducationEntry from '../AccountPage/EducationEntry.jsx'; 

const ResumeContent = ({ accountId }) => {
  const [selectedUserDetails, setSelectedUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!selectedUserDetails) {
    return <div>No user details available.</div>;
  }

  return (
    <div id="networking-page-content">
      <UserProfileHeader
        userDetails={selectedUserDetails}
      />
      {/* Additional content like Experience and Education goes here */}


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

        <AccountSectionCard 
            title='Skills' 
            buttonType={'none'}
        >
            <ul>
                {selectedUserDetails.skills.map((skill, index) => (
                    <li key={index}>{skill.description}</li>
                ))}
            </ul>
        </AccountSectionCard>
    </div>
  );
};

export default ResumeContent;
