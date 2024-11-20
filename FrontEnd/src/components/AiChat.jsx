import React, { useState } from 'react';
import { IconButton, Box, Typography, TextField, Button } from '@mui/material';
import ChatIcon from '../assets/RR_Chat_Icon.png';

const AiChatButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [listType, setListType] = useState('friends');
    const [isVisible, setIsVisible] = useState(false);
    const [searchInput, setSearchInput] = useState(''); // State for search input
    const [searchQuery, setSearchQuery] = useState(''); // State to trigger search

    const handleClick = () => setIsOpen(!isOpen);
    const handleClose = () => setIsOpen(false);
    const handleListChange = (type) => {
        if (listType !== type) {
            setListType(type);
            setSearchQuery(''); // Reset search when changing list type
        }
    };
    const handleSearchClicked = () => {
        setIsVisible(!isVisible);
        setSearchInput(''); // Clear search input when toggling visibility
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && searchInput.trim()) {
            setSearchQuery(searchInput); // Set searchQuery to trigger the search
        }
    };

    return (
        <div>
            <IconButton
                onClick={handleClick}
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    left: '20px',
                    zIndex: 1000,
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
                    padding: '15px',
                }}
            >
                <img src={ChatIcon} alt="AiChat" style={{ width: '80px', height: '80px' }} />
            </IconButton>

            {isOpen && (
                <Box
                    style={{
                        position: 'fixed',
                        bottom: '80px',
                        right: '20px',
                        width: '400px',
                        maxHeight: '600px',
                        backgroundColor: 'white',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                        borderRadius: '8px',
                        padding: '10px',
                        zIndex: 1000,
                        overflowY: 'auto' // Enable scrolling within the panel
                    }}
                >
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6" align="center">Chat Box</Typography>
                        <IconButton
                            onClick={handleSearchClicked}
                            style={{
                                borderRadius: '2px',
                                position: 'fixed',
                                right: '90px'
                            }}
                        >
                        </IconButton>
                        <Button onClick={handleClose} style={{ fontSize: '12px' }}>Close</Button>
                    </Box>

                    {isVisible && (
                        <TextField
                            variant="outlined"
                            fullWidth
                            placeholder="Type a user name..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)} // Update search input
                            onKeyDown={handleKeyPress} // Trigger search on Enter key press
                            style={{ width: '100%', marginBottom: '10px' }}
                            sx={{
                                backgroundColor: 'white' // Set background color to white
                            }}
                            inputProps={{
                                style: {
                                    height: '100%',
                                    padding: '10px 12px',
                                }
                            }}
                        />
                    )}

                    <Box display="flex" justifyContent="space-around" marginBottom="8px">
                        <Button
                            variant={listType === 'messages' ? 'contained' : 'outlined'}
                            onClick={() => handleListChange('messages')}
                        >
                            Messages
                        </Button>
                        <Button
                            variant={listType === 'friends' ? 'contained' : 'outlined'}
                            onClick={() => handleListChange('friends')}
                        >
                            Friends
                        </Button>
                        <Button
                            variant={listType === 'unaccept' ? 'contained' : 'outlined'}
                            onClick={() => handleListChange('unaccept')}
                        >
                            Pending
                        </Button>
                        <Button
                            variant={listType === 'block' ? 'contained' : 'outlined'}
                            onClick={() => handleListChange('block')}
                        >
                            Blocked
                        </Button>
                    </Box>
                </Box>
            )}
        </div>
    );
};

export default AiChatButton;
