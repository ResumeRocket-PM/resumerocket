import React, { useState, useEffect } from 'react';
import { TextField, MenuItem, CircularProgress } from '@mui/material';
import { useApi } from "../../../../hooks"; // Custom hook to call backend APIs

const ProfileDropdown = ({ label, apiUrl, pxSize }) => {
    const [inputValue, setInputValue] = useState(''); // Initial input value
    const [profileList, setProfileList] = useState([]); // Dropdown options
    const [isLoading, setIsLoading] = useState(false); // Loading indicator
    const [selectedProfile, setSelectedProfile] = useState(''); // To store the selected profile field name
    const [inputError, setInputError] = useState(false); // Error state for invalid input
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
                    setProfileList(["there is something wrong"]);
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

    // Handle input changes and validation
    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        // Check if input value exists in the profile list
        if (!profileList.includes(value)) {
            setInputError(true); // Set error if input doesn't match the dropdown list
        } else {
            setInputError(false); // Reset error if input matches
        }

        setSelectedProfile(''); // Clear selected profile if input is manually typed
    };

    const handleMenuItemClick = (profile) => {
        setSelectedProfile(profile); // Set selected profile file name
        setInputValue(profile); // Show the selected profile in input
        setProfileList([]); // Hide the dropdown
        setInputError(false); // Clear error when a valid option is selected
    };

    return (
        <div style={{ width: '552px' }}>
            {/* Input text bar for searching */}
            <TextField
                label={label} // Dynamic label
                variant="outlined"
                value={inputValue}
                onChange={handleInputChange} // Update input value with validation
                onBlur={() => {
                    // When input loses focus, ensure it's a valid option from the list
                    if (!profileList.includes(inputValue)) {
                        setInputError(true); // Show error if input is invalid
                        setInputValue(''); // Clear input if not a valid option
                        setSelectedProfile(''); // Clear selected profile
                    } else {
                        setInputError(false); // Clear error if input is valid
                    }
                }}
                fullWidth
                style={{ marginTop: pxSize }}
                error={inputError} // Turn input box red if there's an error
                helperText={inputError ? "Input not found in the list." : ''} // Show error message
            />

            {/* Dropdown menu for showing select profile field names */}
            {isLoading ? (
                <CircularProgress size={24} style={{ margin: '10px' }} /> // Show loading spinner
            ) : (
                profileList.length > 0 && (
                    profileList.map((profile, index) => (
                        <MenuItem key={index} value={profile} onClick={() => handleMenuItemClick(profile)}>
                            {profile}
                        </MenuItem>
                    ))
                )
            )}

            {/* Display selected profile field name */}
        </div>
    );
};

export default ProfileDropdown;
