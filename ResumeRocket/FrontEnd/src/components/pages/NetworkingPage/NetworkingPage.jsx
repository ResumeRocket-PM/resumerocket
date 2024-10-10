import React, { useEffect, useState } from 'react';
import UserCard from './UserCard'; 
import ResumeContent from './ResumeContent'; 
import { useApi } from "../../../hooks.js";
import { useLocation } from 'react-router-dom'; 

const NetworkingPage = () => {
  const [selectedUserIndex, setSelectedUserIndex] = useState(null);
  const [usersDetails, setUsersDetails] = useState([]);

  const handleUserResultClick = (index) => {
    setSelectedUserIndex(index);
  };

  const api = useApi();
  const location = useLocation(); 

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get('query') || 'UT'; 

    api.postForm('/account/search', {
      searchTerm: searchTerm,
      resultCount: 15
    }).then(response => {
      if (response.ok) {
        response.json().then(data => {
          setUsersDetails(data.result);
          if (data.result.length > 0) {
            setSelectedUserIndex(0);
          }
        });
      } else {
        console.log("Failed to save account");
      }
    });
  }, [location.search]);

  // Get selected user's details
  const selectedUserDetails = selectedUserIndex !== null ? usersDetails[selectedUserIndex] : {};

  return (
    <div id="networking-page-wrapper">
      <style>
        {`
          #networking-page-wrapper {
            width: 70%; /* Limit content width to 70% of the page */
            margin: 0 auto; /* Center align the content */
          }

          #networking-page {
            padding-top: 3rem;
            display: flex;
            flex-direction: row; /* Align components side by side */
            justify-content: flex-start; /* Align items to the start */
            align-items: flex-start; /* Align items at the start */
          }

          #networking-page-user-results {
            flex: 0 0 300px; /* Fixed width for user results */
            overflow-y: auto; /* Enable vertical scrolling */
            padding: 20px; /* Padding inside the user results */
            box-sizing: border-box; /* Include padding in width calculation */
          }

          #networking-page-user-results-content {
            display: flex; /* Flex container for user cards */
            flex-direction: column; /* Stack cards vertically */
            gap: 20px; /* Space between user cards */
          }

          .user-card {
            background-color: #fff; /* Card background color */
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            padding: 15px; /* Padding inside each user card */
          }

          #networking-page-content {
            flex: 1; /* Allow this to grow and take up remaining space */
            background-color: #fff;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            padding: 20px; /* Padding inside the selected user info window */
            min-height: 400px; /* Minimum height for better visibility */
            width: calc(1200px * 0.80); /* 80% of 1200px */
            margin-right: 30px;
          }
        `}
      </style>

      <div id="networking-page">
        <div id="networking-page-user-results">
          <div id="networking-page-user-results-content">
            {usersDetails.map((user, index) => (
              <UserCard
                key={user.accountId} // Use AccountId as the key
                userDetails={{
                  FirstName: user.firstName,
                  LastName: user.lastName,
                  ProfilePhotoLink: user.profilePhotoLink || "path/to/default/image.png", // Provide a default image if none exists
                  Title: user.title,
                  StateLocation: user.stateLocation,
                }}
                onClick={() => handleUserResultClick(index)}
                isSelected={selectedUserIndex === index}
              />
            ))}
          </div>
        </div>
        <ResumeContent 
          accountId={selectedUserDetails.accountId} // Pass AccountId to ResumeContent
          selectedUserDetails={selectedUserDetails}
        />
      </div>
    </div>
  );
};

export default NetworkingPage;
