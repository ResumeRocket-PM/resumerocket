import React, { useState, useEffect } from 'react';
import { TextField, MenuItem, CircularProgress } from '@mui/material';
import { useApi } from "../../../../hooks"; // Custom hook to call backend APIs

const ProfileDropdown = ({ label, apiUrl, pxSize}) => {
    const [inputValue, setInputValue] = useState(''); // Initial input value
    const [profileList, setProfileList] = useState([]); // Dropdown options
    const [isLoading, setIsLoading] = useState(false); // Loading indicator
    const [selectedProfile, setSelectedProfile] = useState(''); // To store the selected profile field name
    const api = useApi(); // Use API hook for fetching data

    const fetchData = (inputValue) => {
        if (!inputValue) {
            setProfileList([]); // Reset the list when input is empty
            return;
        }
        setIsLoading(true); // Show loading spinner

        api.get(`/profile/${apiUrl}/${inputValue}/true`) // Use the passed apiUrl for the request
            .then(response => {
                if (response.ok) {
                    response.json().then(data => {
                        const mlist = data.result;
                        setProfileList(mlist);
                    });
                } else {
                    setProfileList(["there are something error"]);
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            })
            .finally(() => {
                setIsLoading(false); // Hide loading spinner
            });
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchData(inputValue);
        }, 300); // Adding debounce of 300ms for better performance

        return () => clearTimeout(delayDebounceFn); // Cleanup to avoid multiple calls
    }, [inputValue]);

    return (
        <div style={{ width: '552px' }}>
            {/* Input text bar for searching */}
            <TextField
                label={label} // Dynamic label
                variant="outlined"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)} // Update input value
                fullWidth
                style={{ marginTop: pxSize }}
            />

            {/* Dropdown menu for showing select profile field names */}
            {isLoading ? (
                <CircularProgress size={24} style={{ margin: '10px' }} /> // Show loading spinner
            ) : (
                profileList.length > 0 && (
                    <div>
                        {profileList.map((profile, index) => (
                            <MenuItem
                                key={index}
                                onClick={() => {
                                    setSelectedProfile(profile); // Set selected profile file name
                                    setInputValue(profile); // Show the selected profile in input
                                    setProfileList([]); // Hide the dropdown
                                }}
                            >
                                {profile}
                            </MenuItem>
                        ))}
                    </div>
                )
            )}

            {/* Display selected profile field name */}
            {selectedProfile && <p>Selected {label}: {selectedProfile}</p>}
        </div>
    );
};

export default ProfileDropdown;
