import React, { useState, useEffect } from 'react';
import { Button, Typography, CircularProgress, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Draggable from 'react-draggable';
import { useApi } from "../../hooks";
import userSolidOrange from "../../assets/user-solid-orange.svg";
import Messages from './Messages';
import accountBanner from '../../assets/account-banner.png';

const ProfilePhoto = ({ accountId, friendStatus, onClose }) => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [messageOpen, setMessageOpen] = useState(false);
    const [currentFriendStatus, setCurrentFriendStatus] = useState(null);
    const api = useApi();

    const fetchUserInfo = async () => {
        setLoading(true);
        try {
            const response = await api.get(`/Chat/UserInfo/${accountId}`);
            if (response.ok) {
                const data = await response.json();
                setUserData(data.result); // Use the result field and lowercase attributes
                console.log(currentFriendStatus);
            } else {
                console.error('Failed to fetch user info');
            }
        } catch (error) {
            console.error('Error fetching user info:', error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        setCurrentFriendStatus(friendStatus);
    }, [friendStatus]);

    useEffect(() => {
        fetchUserInfo();
    }, [accountId]);

    const handleSendMessage = () => {
        setMessageOpen(true);
    };

    const handleAddOrBlock = async () => {
        try {
            if (currentFriendStatus === 'friends') {
                await api.post(`/Chat/block/${accountId}`);
                setCurrentFriendStatus(null); // Update to null after blocking
            } else {
                await api.post(`/Chat/add/${accountId}`);
                setCurrentFriendStatus('friends'); // Update to 'friends' after adding
            }
        } catch (error) {
            console.error(`Error updating friend status: ${error}`);
        }
    };

    return (
        <>
            <Draggable>
                <div
                    style={{
                        position: 'fixed',
                        bottom: '80px',
                        right: '443px',
                        width: '450px',
                        maxHeight: '600px',
                        backgroundColor: 'skyblue',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        zIndex: 2000,
                        cursor: 'move',
                        display: 'flex',
                        flexDirection: 'column',
                        border: '2px solid black',
                    }}
                >
                    {/* Header Section */}
                    <div style={{ position: 'relative', height: '150px', backgroundColor: '#f3f3f3' }}>
                        <img
                            src={accountBanner}
                            alt="Background"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        />
                        <IconButton
                            onClick={onClose}
                            style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                color: 'white',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                        <div
                            style={{
                                position: 'absolute',
                                bottom: '-30px',
                                left: '20px',
                                width: '60px',
                                height: '60px',
                                borderRadius: '50%',
                                backgroundColor: 'white',
                                overflow: 'hidden',
                                border: '3px solid #30678e',
                            }}
                        >
                            <img
                                src={userData?.profilePhotoLink || userSolidOrange}
                                alt={`${userData?.firstName} ${userData?.lastName}`}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ padding: '50px 20px 20px' }}>
                        <Typography variant="h6">
                            {userData?.firstName} {userData?.lastName}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {userData?.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {userData?.location}
                        </Typography>
                    </div>

                    {/* Content Section */}
                    <div
                        style={{
                            flex: 1,
                            overflowY: 'auto',
                            padding: '20px',
                        }}
                    >
                        {loading ? (
                            <CircularProgress />
                        ) : (
                            userData && (
                                <>
                                    <Typography variant="body2" style={{ marginBottom: '10px' }}>
                                        Email: {userData.email}
                                    </Typography>
                                    <Typography variant="body2" style={{ marginBottom: '10px' }}>
                                        Portfolio: {userData.portfolioLink}
                                    </Typography>
                                    <Typography variant="body2" style={{ marginBottom: '20px' }}>
                                        Primary Resume ID: {userData.primaryResumeId}
                                    </Typography>

                                    {/* Skills Section */}
                                    {userData.skills && (
                                        <>
                                            <Typography variant="h6" style={{ marginBottom: '10px' }}>Skills</Typography>
                                            <Typography variant="body2">
                                                {userData.skills.map((skill, index) => (
                                                    <span key={skill.skillId}>
                                                        {skill.description}{index < userData.skills.length - 1 ? ', ' : ''}
                                                    </span>
                                                ))}
                                            </Typography>
                                        </>
                                    )}

                                    {/* Experience Section */}
                                    {userData.experience && userData.experience.length > 0 && (
                                        <>
                                            <Typography variant="h6" style={{ marginTop: '15px' }}>Experience</Typography>
                                            {userData.experience.map((exp, index) => (
                                                <div key={index} style={{ marginBottom: '15px' }}>
                                                    <Typography variant="subtitle2" fontWeight="bold">
                                                        {exp.position} at {exp.company}
                                                    </Typography>
                                                    <Typography variant="caption" color="textSecondary">
                                                        {exp.startDate} - {exp.endDate || 'Present'}
                                                    </Typography>
                                                    <Typography variant="body2">{exp.description}</Typography>
                                                </div>
                                            ))}
                                        </>
                                    )}

                                    {/* Education Section */}
                                    {userData.education && userData.education.length > 0 && (
                                        <>
                                            <Typography variant="h6" style={{ marginTop: '15px' }}>Education</Typography>
                                            {userData.education.map((edu, index) => (
                                                <div key={index} style={{ marginBottom: '10px' }}>
                                                    <Typography variant="subtitle2" fontWeight="bold">
                                                        {edu.degree} in {edu.major}
                                                    </Typography>
                                                    <Typography variant="caption" color="textSecondary">
                                                        {edu.schoolName} - Graduated {edu.graduationDate}
                                                    </Typography>
                                                    {edu.minor && <Typography variant="body2">Minor: {edu.minor}</Typography>}
                                                </div>
                                            ))}
                                        </>
                                    )}
                                </>
                            )
                        )}
                    </div>

                    {/* Footer Section */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSendMessage}
                        >
                            Send Message
                        </Button>
                        <Button
                            variant="contained"
                            color={currentFriendStatus === 'friends' ? 'secondary' : 'primary'}
                            onClick={handleAddOrBlock}
                        >
                            {currentFriendStatus === 'friends' ? 'Block' : 'Add'}
                        </Button>
                    </div>
                </div>
            </Draggable>

            {/* Messages Panel */}
            {messageOpen && (
                <Messages
                    theyId={accountId}
                    profilePhotoLink={userData?.profilePhotoLink}
                    firstName={userData?.firstName}
                    lastName={userData?.lastName}
                    onClose={() => setMessageOpen(false)}
                />
            )}
        </>
    );
};

export default ProfilePhoto;
