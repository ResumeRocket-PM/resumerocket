import React, { useState, useEffect, useContext } from 'react';
import { CircularProgress, Box, Button } from '@mui/material';
import { useApi } from "../../hooks";
import { ImageContext } from '../../context/ImageProvider';
import Messages from './Messages';
import userSolidOrange from "../../assets/user-solid-orange.svg";

const FriendsList = ({ status = 'friends' }) => {
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedFriend, setSelectedFriend] = useState(null); // Store the selected friend object
    const api = useApi();
    const { showImage } = useContext(ImageContext);

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

    const handleSendMessage = (friend) => {
        // Set the selected friend object to open the Messages component with their details
        setSelectedFriend(friend);
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
                                    handleSendMessage(friend);
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
                            <div>
                                <h2 style={{ fontWeight: 'bold', fontSize: '15px', color: '#000000' }}>
                                    {friend.firstName} {friend.lastName}
                                </h2>
                            </div>
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleSendMessage(friend);
                                }}
                            >
                                Send Message
                            </Button>
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
                </div>
            )}
        </Box>
    );
};

export default FriendsList;
