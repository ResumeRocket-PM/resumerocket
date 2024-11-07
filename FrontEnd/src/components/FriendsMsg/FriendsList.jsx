import React, { useState, useEffect, useContext } from 'react';
import { CircularProgress, Box, Button } from '@mui/material';
import { useApi } from "../../hooks"; // Assuming this is your custom API hook
import { ImageContext } from '../../context/ImageProvider'; // Assuming this provides a showImage function
import Messages from './Messages'; // Component to show chat history
import userSolidOrange from "../../assets/user-solid-orange.svg"; // Adjust the path if needed

const FriendsList = ({ status = 'friends' }) => {
    const [friends, setFriends] = useState([]);
    const [selectedFriendId, setSelectedFriendId] = useState(null); // Track the selected friend for chat
    const [loading, setLoading] = useState(true);
    const [showDetails, setShowDetails] = useState(false); // Track if detail panel should be shown
    const [friendDetails, setFriendDetails] = useState(null); // Track selected friend details
    const [friendImages, setFriendImages] = useState({}); // Store object URLs for friend images

    const api = useApi();
    const { showImage } = useContext(ImageContext);

    useEffect(() => {
        // Fetch the friends list on component load
        api.get(`/Chat/friendsList/${status}`)
            .then(response => {
                if (response.ok) {
                    response.json().then(data => {
                        console.log("API Response:", data); // Log the entire API response for debugging
                        setFriends(data.result || []); // Store the list of friends in state
                        setLoading(false);
                    });
                } else {
                    setLoading(false);
                    console.error('Failed to fetch friends list');
                }
            })
            .catch(error => {
                console.error('Error fetching friends list:', error);
                setLoading(false);
            });
    }, [status, api]);

    useEffect(() => {
        // Fetch profile photos for each friend and store them as object URLs
        friends.forEach(friend => {
            if (friend.ProfilePhotoLink) {
                const imageId = friend.ProfilePhotoLink.split('/').pop();
                showImage(friend.ProfilePhotoLink, imageId)
                    .then(blob => {
                        const objectUrl = URL.createObjectURL(blob);
                        setFriendImages(prev => ({ ...prev, [friend.friendsId]: objectUrl }));
                    })
                    .catch(err => {
                        console.error(`Failed to load image for friend ${friend.friendsId}`, err);
                    });
            }
        });
    }, [friends, showImage]);

    const handleFriendClick = (friendId) => {
        setSelectedFriendId(friendId);
        setShowDetails(false); // Hide detail panel when switching to messages
    };

    const handleAvatarClick = (friend) => {
        setFriendDetails(friend);
        setShowDetails(true); // Show detail panel when avatar is clicked
    };

    const handleSendMessage = (friendId) => {
        // Add functionality for sending a message
        alert(`Sending message to Friend ID: ${friendId}`);
    };

    const handleAcceptRequest = (friendId) => {
        // Add functionality for accepting a friend request
        alert(`Accepted Friend Request from Friend ID: ${friendId}`);
    };

    const handleRejectRequest = (friendId) => {
        // Add functionality for rejecting a friend request
        alert(`Rejected Friend Request from Friend ID: ${friendId}`);
    };

    const handleUnblock = (friendId) => {
        // Add functionality for unblocking a friend
        alert(`Unblocked Friend ID: ${friendId}`);
    };

    return (
        <Box>
            {loading ? (
                <CircularProgress />
            ) : (
                <Box> {/* Main container */}
                    {!selectedFriendId ? (
                        <div> {/* Wrapper div for friends list */}
                            {friends.map((friend, index) => {
                                console.log("Friend data from friend:", friend); // Log each friend for debugging
                                const profileImage = friendImages[friend.profilePhotoLink] || userSolidOrange; // Default image if no profile photo
                                return (
                                    <div
                                        key={friend.friendsId || index} // Unique key for each friend
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            padding: '8px',
                                            borderBottom: '1px solid #ddd',
                                            cursor: 'pointer',
                                            backgroundColor: '#e0f7fa' // Light blue background color
                                        }}
                                        onClick={() => handleFriendClick(friend.friendsId)}
                                    >
                                        {/* Custom avatar div with background image */}
                                        <div
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent triggering message panel
                                                handleAvatarClick(friend);
                                            }}
                                            style={{
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: '50%',
                                                backgroundImage: `url(${friend.profilePhotoLink || userSolidOrange})`, // Use friend.ProfilePhotoLink or fallback image
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                marginRight: '8px',
                                                backgroundColor: '#ddd' // Optional background color in case image fails to load
                                            }}
                                        ></div>
                                        <h1 style={{ fontSize: '15px', align: 'left' }}>{friend.firstName} { friend.lastName} </h1>
                                        <div>
                                            <h2 style={{ fontWeight: 'bold', fontSize: '15px', color: '#000000' }}>
                                                {friend.FirstName} {friend.LastName}
                                            </h2>
                                        </div>
                                        {/* Conditional buttons based on status */}
                                        <div>
                                            {status === 'friends' && (
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    size="small"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleSendMessage(friend.friendsId);
                                                    }}
                                                >
                                                    Send Message
                                                </Button>
                                            )}
                                            {status === 'unaccept' && (
                                                <>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        size="small"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleAcceptRequest(friend.friendsId);
                                                        }}
                                                        style={{ marginRight: '4px' }}
                                                    >
                                                        Accept
                                                    </Button>
                                                    <Button
                                                        variant="outlined"
                                                        color="secondary"
                                                        size="small"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleRejectRequest(friend.friendsId);
                                                        }}
                                                    >
                                                        Reject
                                                    </Button>
                                                </>
                                            )}
                                            {status === 'block' && (
                                                <Button
                                                    variant="outlined"
                                                    color="secondary"
                                                    size="small"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleUnblock(friend.friendsId);
                                                    }}
                                                >
                                                    Unblock
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : showDetails && friendDetails ? (
                        <Box>
                            <h2>{`${friendDetails.FirstName} ${friendDetails.LastName}`}</h2>
                            <img src={friendImages[friendDetails.friendsId] || userSolidOrange} alt={`${friendDetails.FirstName} ${friendDetails.LastName}`} />
                            <p><strong>Email:</strong> {friendDetails.EmailAddress}</p>
                            <p><strong>Portfolio:</strong> <a href={friendDetails.PortfolioLink}>{friendDetails.PortfolioLink}</a></p>
                            <p><strong>Friend ID:</strong> {friendDetails.friendsId}</p>
                            <p><strong>Joined on:</strong> {friendDetails.CreatedTime}</p>
                            <button onClick={() => setShowDetails(false)}>Close Details</button>
                        </Box>
                    ) : (
                        <Messages friendId={selectedFriendId} onBack={() => setSelectedFriendId(null)} />
                    )}
                </Box>
            )}
        </Box>
    );
};

export default FriendsList;
