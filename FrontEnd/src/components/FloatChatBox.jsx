import React, { useState } from 'react';
import { IconButton, Box, Typography, TextField,Button } from '@mui/material';
import ChatIcon from '../assets/RR_Chat_Icon.png';
import FriendsList from './FriendsMsg/FriendsList';
import TalkedPeopleList from './FriendsMsg/TalkedPeopleList.jsx';
import searchIcon from '../assets/searchIcon.png';

const FloatingChatButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [listType, setListType] = useState('friends');
    const [isVisible, setIsVisible] = useState(false);

    const handleClick = () => setIsOpen(!isOpen);
    const handleClose = () => setIsOpen(false);
    const handleListChange = (type) => {
        if (listType !== type) { // Only change if listType is different
            setListType(type);
        }
    };
    const handleSearchClicked = () => {
        //alert("search button is clicked")
        setIsVisible(!isVisible);
    }
    return (
        <div>
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
                    }}
                >
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6" align="center">Chat Box</Typography>
                        <IconButton
                            onClick={handleSearchClicked }
                            style={{
                                borderRadius: '2px',
                                position: 'fixed',
                                right:'90px'
                            }}
                        >
                            <img src={searchIcon} alt="search" style={{ width: '18px', height: '18px' }} />
                        </IconButton>
                        <Button onClick={handleClose} style={{ fontSize: '12px' }}>Close</Button>
                    </Box>
                    <TextField
                        variant="outlined"
                        fullWidth
                        placeholder="Type a user name..."
                        //value={newMessage}
                        //onChange={(e) => setNewMessage(e.target.value)}
                        //onKeyDown={handleKeyPress} // Listen for "Enter" key press
                        style={{width: '400px', display: isVisible ? 'block' : 'none'}}
                        sx={{
                            backgroundColor: 'white' // Set background color to white
                        }}
                        inputProps={{
                            style: {
                                height: '100%', // Ensures the text area uses the full height
                                padding: '10px 12px', // Adjust padding to fit the height as needed
                            }
                        }}
                    />
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

                    {listType === 'messages' ? (
                        <TalkedPeopleList />
                    ) : (
                        <FriendsList status={listType} />
                    )}
                </Box>
            )}
        </div>
    );
};

export default FloatingChatButton;
