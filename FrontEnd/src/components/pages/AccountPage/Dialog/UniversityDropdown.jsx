import React, { useState, useEffect } from 'react';
import { TextField, MenuItem, CircularProgress } from '@mui/material';
import { useApi } from "../../../../hooks"; // Custom hook to call backend APIs


const UniversityDropdown = () => {
    const [inputValue, setInputValue] = useState(''); // Initial input value
    const [universityList, setUniversityList] = useState([]); // Dropdown options
    const [isLoading, setIsLoading] = useState(false); // Loading indicator
    const [selectedUniversity, setSelectedUniversity] = useState(''); // To store the selected university
    const api = useApi(); // Use API hook for fetching data

    const fetchUniversities = (inputValue) => {
        if (!inputValue) {
            setUniversityList([]); // Reset the list when input is empty

            return;
        }
    setIsLoading(true); // Show loading spinner

    api.get(`/profile/UniversityName/${inputValue}/true`) // Assuming true for the sorting order
        .then(response => {
            //setUniversityList(response || ['test']); // Set the university list based on response
            //console.log("response.json: ", response.json());
            //console.log("response: ", response); 
            if (response.ok) {
                response.json().then(data => {
                    const ulist = data.result
                    setUniversityList(ulist)
                })
            }
            else {
                setUniversityList(["there are something error"])
            }

        })
        .catch((error) => {
            console.error('Error fetching university names:', error);
        })
        .finally(() => {
            setIsLoading(false); // Hide loading spinner
        });
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchUniversities(inputValue);
        }, 300); // Adding debounce of 300ms for better performance

        return () => clearTimeout(delayDebounceFn); // Cleanup to avoid multiple calls
    }, [inputValue]);
    // Fetch options from backend when component loads
    return (
        <div style={{ width: '552px' }}>
            {/* Input text bar for searching */}
            <TextField
                label="University"
                variant="outlined"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)} // Update input value
                fullWidth
            />

            {/* Dropdown menu for showing university names */}
            {isLoading ? (
                <CircularProgress size={24} style={{ margin: '10px' }} /> // Show loading spinner
            ) : (
                universityList.length > 0 && (
                    <div>
                        {universityList.map((university, index) => (
                            <MenuItem
                                key={index}
                                onClick={() => {
                                    setSelectedUniversity(university); // Set selected university
                                    setInputValue(university); // Show the selected university in input
                                    setUniversityList([]); // Hide the dropdown
                                }}
                            >
                                {university}
                            </MenuItem>
                        ))}
                    </div>
                )
            )}

            {/* Display selected university */}
            {selectedUniversity && <p>Selected University: {selectedUniversity}</p>}
        </div>
    );
};

export default UniversityDropdown;