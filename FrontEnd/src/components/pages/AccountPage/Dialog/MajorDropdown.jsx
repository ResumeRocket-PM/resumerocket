import React, { useState, useEffect } from 'react';
import { TextField, MenuItem, CircularProgress } from '@mui/material';
import { useApi } from "../../../../hooks"; // Custom hook to call backend APIs

const MajorDropdown = ({ label, selectedMajor, onMajorSelect }) => {
    const [inputValue, setInputValue] = useState(''); // Initial input value
    const [majorList, setMajorList] = useState([]); // Dropdown options
    const [isLoading, setIsLoading] = useState(false); // Loading indicator
    const api = useApi(); // Use API hook for fetching data

    const fetchMajors = (inputValue) => {
        if (!inputValue) {
            setMajorList([]); // Reset the list when input is empty
            return;
        }
        setIsLoading(true); // Show loading spinner

        api.get(`/profile/MajorName/${inputValue}/true`) // Assuming true for the sorting order
            .then(response => {
                if (response.ok) {
                    response.json().then(data => {
                        const mlist = data.result;
                        setMajorList(mlist);
                    });
                } else {
                    setMajorList(["There was an error fetching majors"]);
                }
            })
            .catch((error) => {
                console.error('Error fetching major names:', error);
                setMajorList(["There was an error fetching majors"]);
            })
            .finally(() => {
                setIsLoading(false); // Hide loading spinner
            });
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchMajors(inputValue);
        }, 300); // Adding debounce of 300ms for better performance

        return () => clearTimeout(delayDebounceFn); // Cleanup to avoid multiple calls
    }, [inputValue]);

    return (
        <div style={{ width: '552px' }}>
            {/* Input text bar for searching */}
            <TextField
                label={label} // Use the dynamic label
                variant="outlined"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)} // Update input value
                fullWidth
            />

            {/* Dropdown menu for showing major names */}
            {isLoading ? (
                <CircularProgress size={24} style={{ margin: '10px' }} /> // Show loading spinner
            ) : (
                majorList.length > 0 && (
                    <div>
                        {majorList.map((major, index) => (
                            <MenuItem
                                key={index}
                                onClick={() => {
                                    onMajorSelect(major); // Call the passed onMajorSelect handler
                                    setInputValue(major); // Show the selected Major in input
                                    setMajorList([]); // Hide the dropdown
                                }}
                            >
                                {major}
                            </MenuItem>
                        ))}
                    </div>
                )
            )}
        </div>
    );
};

export default MajorDropdown;
