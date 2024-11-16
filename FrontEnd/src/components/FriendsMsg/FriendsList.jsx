import React, { useState, useEffect, useContext } from 'react';
import { CircularProgress, Box, Button } from '@mui/material';
import { useApi } from "../../hooks";
import { ImageContext } from '../../context/ImageProvider';
import Messages from './Messages';
import userSolidOrange from "../../assets/user-solid-orange.svg";
import ProfilePhoto from './ProfilePhoto'; // Import ProfilePhoto component

const FriendsList = ({ status }) => {
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedFriend, setSelectedFriend] = useState(null); // Store the selected friend object
    const api = useApi();
    const { showImage } = useContext(ImageContext);
    const [profileDialog, setProfileDialog] = useState({ open: false, accountId: null, status: null });

    useEffect(() => {
        const fetchFriends = async () => {
            setLoading(true);
            try {
                const response = await api.get(`/Chat/friendsList/${status}`);
                if (response.ok) {
                    const data = await response.json();
                    setFriends(data.result || []);
                } else {
                    console.error('Failed to fetch friends list');
                }
            } catch (error) {
                console.error('Error fetching friends list:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFriends();
    }, [status]);

    const closeProfileDialog = () => {
        setProfileDialog({ open: false, accountId: null, status: null });
    };

    const handlePhotoClicked = (friend) => {
        console.log(friend.accountId);
        setProfileDialog({ open: true, accountId: friend.accountId, status: friend.status });
    };

    const handleActionButtonClick = async (friend, action) => {
        try {
            const respond = action;
            const response = await api.post(`/Chat/respondNewFriend/${friend.accountId}/${respond}`);
            if (response.ok) {
                // Refresh the friend list after action
                const updatedFriends = friends.filter(f => f.accountId !== friend.accountId);
                setFriends(updatedFriends);
            } else {
                console.error('Failed to update friend status');
            }
        } catch (error) {
            console.error('Error updating friend status:', error);
        }
    };

    return (
        <Box>
            {loading ? (
                <CircularProgress />
            ) : (
                <div>
                    {friends.map((friend, index) => (
                        <div
                            key={friend.accountId || index} // Use accountId as the key if available
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '8px',
                                borderBottom: '1px solid #ddd',
                                cursor: 'pointer',
                                backgroundColor: '#e0f7fa'
                            }}
                        >
                            <div
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handlePhotoClicked(friend);
                                }}
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    backgroundImage: `url(${friend.profilePhotoLink || userSolidOrange})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    marginRight: '8px',
                                    backgroundColor: '#ddd'
                                }}
                            ></div>
                            <div style={{
                                flex: 1, // Makes the name container take the available space
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'flex-start', // Align content to the right
                            }}>
                                <h2 style={{ fontWeight: 'bold', fontSize: '15px', color: '#000000' }}>
                                    {friend.firstName} {friend.lastName}
                                </h2>
                            </div>
                            {friend.status === 'blocked' ? null : friend.status === 'blocking' ? (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleActionButtonClick(friend, 'unblock');
                                    }}
                                >
                                    Unblock
                                </Button>
                            ) : friend.status === 'unaccept' ? (
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleActionButtonClick(friend, 'accept');
                                        }}
                                    >
                                        Accept
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        size="small"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleActionButtonClick(friend, 'reject');
                                        }}
                                    >
                                        Reject
                                    </Button>
                                </div>
                            ) : (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedFriend(friend);
                                    }}
                                >
                                    Send Message
                                </Button>
                            )}
                        </div>
                    ))}

                    {/* Render Messages component as an overlay when a friend is selected */}
                    {selectedFriend && (
                        <Messages
                            theyId={selectedFriend.accountId} // Ensure this ID is correct
                            profilePhotoLink={selectedFriend.profilePhotoLink}
                            firstName={selectedFriend.firstName}
                            lastName={selectedFriend.lastName}
                            onClose={() => setSelectedFriend(null)}
                        />
                    )}
                    {profileDialog.open && (
                        <ProfilePhoto
                            accountId={profileDialog.accountId}
                            friendStatus={profileDialog.status}
                            onClose={closeProfileDialog} // Pass a function to close the dialog
                        />
                    )}
                </div>
            )}
        </Box>
    );
};

export default FriendsList;
