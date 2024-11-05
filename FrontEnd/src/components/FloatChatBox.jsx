import React, { useState } from 'react';
import { IconButton, Box, Typography, Button } from '@mui/material';
import ChatIcon from '../assets/RR_Chat_Icon.png'; // Use custom image or icon
//import FriendsList from './FriendsList';

const FloatingChatButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen); // Toggle the chatbox visibility
    };

    const handleClose = () => {
        setIsOpen(false); // Close the chatbox
    };

    return (
        <div>
            {/* Floating Icon Button */}
            <IconButton
                onClick={handleClick}
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    zIndex: 1000,
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
                    padding: '15px',
                }}
            >
                <img src={ChatIcon} alt="Chat" style={{ width: '80px', height: '80px' }} />
            </IconButton>

            {/* Persistent Chatbox */}
            {isOpen && (
                <Box
                    style={{
                        position: 'fixed',
                        bottom: '80px', // Position above the floating button
                        right: '20px',
                        width: '300px',
                        maxHeight: '400px',
                        backgroundColor: 'white',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                        borderRadius: '8px',
                        padding: '10px',
                        zIndex: 1000,
                    }}
                >
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6" align="center">Friends List</Typography>
                        <Button onClick={handleClose} style={{ fontSize: '12px' }}>Close</Button>
                    </Box>
                    <Typography variant="body2" color="textSecondary" align="center">
                        {/* Here you can add the FriendsList component or list items */}
                        This is your chatbox!
                    </Typography>
                </Box>
            )}
        </div>
    );
};

export default FloatingChatButton;
