import React, { useEffect, useState, useRef } from 'react';
import UserCard from './UserCard'; 
import ResumeContent from './ResumeContent'; 
import { useApi } from "../../../hooks.js";
import { useLocation } from 'react-router-dom'; 
import FloatingChatButton from '../../../components/FloatChatBox.jsx';
import '../../../styles/NetworkingPage.css'; // Assuming you have a CSS file for styles
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { ClipLoader } from "react-spinners";

const USERS_PER_PAGE = 20; // Change this to however many users you want per page

const NetworkingPage = () => {
  const [usersDetails, setUsersDetails] = useState([]);
  const [selectedUserIndex, setSelectedUserIndex] = useState(null);
  const [page, setPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  const userResultsRef = useRef(null);
  const networkingPageWrapperRef = useRef(null);


  const handleUserResultClick = (index) => {
    setSelectedUserIndex(index);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    // window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (userResultsRef.current) {
      setSelectedUserIndex(0); // Reset selected user index to the first user of the new page
      userResultsRef.current.scrollTo({ top: 0 });
    }
  }, [page]);

  const api = useApi();
  const location = useLocation(); 

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get('query') || ''; 

    api.postForm('/account/search', {
      searchTerm: searchTerm,
      resultCount: 10000
    }).then(response => {
      if (response.ok) {
        response.json().then(data => {
          setUsersDetails(data.result);
          setPage(1); 
          if (data.result.length > 0) {
            setSelectedUserIndex(0);
          }
        });
      } else {
        console.log("Failed to save account");
      }
    });
  }, [location.search]);

  // when networkingPageWrapperRef gets to width of 861px, set a state variable "isMobile" to true
  useEffect(() => {
    const handleResize = () => {
      console.log("NetworkingPageWrapper width:", networkingPageWrapperRef.current?.offsetWidth);
      if (networkingPageWrapperRef.current) {
        setIsMobile(networkingPageWrapperRef.current.offsetWidth <= 861);
      }
    };

    // Initial check
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [networkingPageWrapperRef]);

  // Pagination logic
  const pageCount = Math.ceil(usersDetails.length / USERS_PER_PAGE);
  const paginatedUsers = usersDetails.slice(
    (page - 1) * USERS_PER_PAGE,
    page * USERS_PER_PAGE
  );

  // Get selected user's details (adjusted for pagination)
  const selectedUserDetails =
    selectedUserIndex !== null && paginatedUsers[selectedUserIndex]
      ? paginatedUsers[selectedUserIndex]
      : null;

  console.log("Users Details:", usersDetails);
  console.log("Selected User Index:", selectedUserIndex);
  console.log("isMobile:", isMobile);
  console.log("Selected User Details:", selectedUserDetails);

  return (
    <div id="networking-page-wrapper" ref={networkingPageWrapperRef}>
      <div id="networking-page">

          {usersDetails.length !== 0 ? (
            <>
              <div
                id="networking-page-user-results"
                className={isMobile ? 'mobile' : ''}
                ref={userResultsRef}
                style={{ display: isMobile && selectedUserIndex !== null ? 'none' : '' }}
              >
                <div id="networking-page-user-results-content">
                  {paginatedUsers.map((user, index) => (
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
                      isMobile={isMobile}
                    />
                  ))}
                </div>
                <div id='networking-page-pagination' className='hz-center'>
                  <Stack spacing={2}>
                    <Pagination
                      count={pageCount}
                      page={page}
                      onChange={handlePageChange}
                      color="primary"
                    />
                  </Stack>
                </div>
              </div>
              <ResumeContent
                accountId={selectedUserDetails.accountId}
                isMobile={isMobile}
                selectedUserIndex={selectedUserIndex}
              />
            </>
          ) : (
            <div style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
              <ClipLoader size='100px'/>
            </div>
          )}



      </div>
      <FloatingChatButton />
    </div>
  );
};

export default NetworkingPage;
