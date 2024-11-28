import React, { useState, useEffect, useRef } from 'react';
import { Button, TextField, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useApi } from "../../hooks";
import Draggable from 'react-draggable';
import userSolidOrange from "../../assets/user-solid-orange.svg";

const Messages = ({ theyId, profilePhotoLink, firstName, lastName, onClose, onMessageSent }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [zIndex, setZIndex] = useState(2000); // Set initial zIndex
    const api = useApi();
    const messagesEndRef = useRef(null);

    // Function to fetch message history
    const fetchMessages = async (id) => {
        if (!id) return;
        try {
            const response = await api.get(`/Chat/MsgHistory/${id}`);
            const data = await response.json();
            setMessages(data.result || []);
        } catch (error) {
            console.error('Error fetching message history:', error);
        }
    };

    useEffect(() => {
        fetchMessages(theyId);
    }, [theyId]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;

        try {
            const response = await api.post('/Chat/sendMsg', {
                receiveId: theyId,
                msgContent: newMessage.trim(),
            });
            const data = await response.json();

            if (data.result) {
                setMessages(prevMessages => [
                    ...prevMessages,
                    { identity: 'system', msgContent: data.result }
                ]);
            } else {
                setNewMessage('');
                await fetchMessages(theyId);
                if (onMessageSent) {
                    onMessageSent();
                }
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    };

    // Function to bring the component to the top layer when clicked
    const handleClick = () => {
        setZIndex(zIndex + 1); // Increase zIndex to bring to the front
    };

    return (
        <Draggable>
            <div
                onClick={handleClick} // Update zIndex on click
                style={{
                    position: 'fixed',
                    bottom: '80px',
                    right: '443px',
                    width: '400px',
                    maxHeight: '500px',
                    backgroundColor: 'lightskyblue',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                    borderRadius: '8px',
                    padding: '10px',
                    zIndex: zIndex, // Apply dynamic zIndex
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'move',
                    border: '2px solid black',
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid black', }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                            src={profilePhotoLink || userSolidOrange}
                            alt={`${firstName} ${lastName}`}
                            style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                marginRight: '8px',
                                background: 'white',
                                border: '2px'
                            }}
                        />
                        <Typography variant="h6" >{firstName} {lastName}</Typography>
                    </div>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </div>

                <div
                    style={{
                        flex: 1,
                        overflowY: 'auto',
                        marginTop: '10px',
                        marginBottom: '10px',
                        paddingRight: '10px',
                    }}
                >
                    {messages.slice().map((msg, index) => (
                        <div
                            key={index}
                            style={{
                                display: 'flex',
                                justifyContent: msg.identity === 'me' ? 'flex-end' : 'flex-start',
                                marginBottom: '5px',
                            }}
                        >
                            <div
                                style={{
                                    maxWidth: '70%',
                                    padding: '8px',
                                    borderRadius: '10px',
                                    backgroundColor: msg.identity === 'me'
                                        ? 'green'
                                        : msg.identity === 'system'
                                            ? 'red'  // Red background for system messages (e.g., blocked message)
                                            : 'ThreeDDarkShadow',
                                    color: 'white',
                                    textAlign: 'left',
                                }}
                            >
                                {msg.msgContent}
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={handleKeyPress} // Listen for "Enter" key press
                        style={{ marginRight: '10px' }}
                        sx={{
                            backgroundColor: 'white' // Set background color to white
                        }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        style={{
                            backgroundColor: newMessage.trim() ? 'darkgreen' : 'lightgrey', // Green when enabled, grey when disabled
                            color: 'white',
                            cursor: newMessage.trim() ? 'pointer' : 'not-allowed', // Pointer when enabled, default when disabled
                        }}
                    >
                        Send
                    </Button>
                </div>
            </div>
        </Draggable>
    );
};

export default Messages;
