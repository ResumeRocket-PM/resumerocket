import React, { useState, useEffect } from 'react';
import { CircularProgress, Button, Box, Typography } from '@mui/material';
import { useApi } from "../../hooks";
import Messages from './Messages';
import userSolidOrange from "../../assets/user-solid-orange.svg";
import ProfilePhoto from './ProfilePhoto';

const SearchUser = ({ input }) => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const api = useApi();
    const [profileDialog, setProfileDialog] = useState({ open: false, accountId: null, status: null });

    const fetchResults = async () => {
        setLoading(true);
        try {
            const response = await api.get(`/Chat/searchUser/${input}`);
            if (response.ok) {
                const data = await response.json();
                setResults(data.result || []);
                console.log("from searchUser. ", data);
            } else {
                console.error('Failed to fetch search results');
                setResults([]);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (input.trim()) {
            fetchResults();
        } else {
            setResults([]);
        }
    }, [input]);

    const handleSendMessage = (user) => {
        setSelectedUser(user);
    };

    const handlePhotoClicked = (user) => {
        setProfileDialog({ open: true, accountId: user.accountId, status: user.status });
    };

    const closeProfileDialog = () => {
        setProfileDialog({ open: false, accountId: null, status: null });
    };

    return (
        <div>
            {loading ? (
                <CircularProgress />
            ) : (
                <div>
                    {results.length === 0 ? (
                        <Box style={{ textAlign: 'center', padding: '16px', color: 'gray' }}>
                            <Typography variant="subtitle1">No users found</Typography>
                        </Box>
                    ) : (
                        results.map((user, index) => (
                            <div
                                key={user.accountId || index}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '8px',
                                    borderBottom: '1px solid #ddd',
                                    backgroundColor: '#e0f7fa',
                                }}
                            >
                                <div
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handlePhotoClicked(user);
                                    }}
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        backgroundImage: `url(${user.profilePhotoLink || userSolidOrange})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        marginRight: '8px',
                                        backgroundColor: '#ddd',
                                    }}
                                ></div>
                                <div style={{ flex: 1 }}>
                                    <Typography variant="subtitle1" style={{ fontWeight: 'bold', fontSize: '15px', color: '#000000' }}>
                                        {user.firstName} {user.lastName}
                                    </Typography>
                                </div>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleSendMessage(user)}
                                    style={{ backgroundColor: 'darkgreen', color: 'white' }}
                                >
                                    Send Message
                                </Button>
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* Render ProfilePhoto outside the map loop */}
            {profileDialog.open && (
                <ProfilePhoto
                    accountId={profileDialog.accountId}
                    friendStatus={profileDialog.status}
                    onClose={closeProfileDialog}
                />
            )}

            {selectedUser && (
                <Messages
                    theyId={selectedUser.accountId}
                    profilePhotoLink={selectedUser.profilePhotoLink}
                    firstName={selectedUser.firstName}
                    lastName={selectedUser.lastName}
                    onClose={() => setSelectedUser(null)}
                />
            )}
        </div>
    );
};

export default SearchUser;
