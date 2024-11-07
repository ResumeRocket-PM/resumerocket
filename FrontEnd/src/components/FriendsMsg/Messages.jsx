import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, CircularProgress } from '@mui/material';
import { useApi } from "../../hooks"; // Assuming this is your custom API hook

const Messages = ({ friendId, onBack }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);

    const api = useApi();

    // Fetch message history when the component mounts
    useEffect(() => {
        setLoading(true);
        api.get(`/api/Chat/MsgHistory?friendId=${friendId}`)
            .then(response => {
                if (response.ok) {
                    response.json().then(data => {
                        setMessages(data.history || []); // Assuming the response has a 'history' array
                        setLoading(false);
                    });
                } else {
                    console.error('Failed to fetch message history');
                    setLoading(false);
                }
            })
            .catch(error => {
                console.error('Error fetching message history:', error);
                setLoading(false);
            });
    }, [friendId, api]);

    // Handle sending a new message
    const handleSendMessage = () => {
        if (!newMessage.trim()) return; // Do nothing if the message is empty

        api.post('/api/Chat/SendMessage', {
            friendId,
            message: newMessage.trim()
        })
            .then(response => {
                if (response.ok) {
                    // Add the new message to the message list
                    setMessages(prevMessages => [...prevMessages, { sender: 'You', content: newMessage.trim(), timestamp: new Date().toLocaleString() }]);
                    setNewMessage(''); // Clear the input
                } else {
                    console.error('Failed to send message');
                }
            })
            .catch(error => {
                console.error('Error sending message:', error);
            });
    };

    return (
        <Box
            style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#ffffff',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                borderRadius: '8px',
                maxHeight: '400px',
                overflowY: 'auto'
            }}
        >
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">Chat with Friend</Typography>
                <Button onClick={onBack} style={{ fontSize: '12px' }}>Close</Button>
            </Box>

            {loading ? (
                <CircularProgress />
            ) : (
                <Box style={{ maxHeight: '300px', overflowY: 'auto', marginTop: '10px' }}>
                    {messages.length > 0 ? (
                        messages.map((msg, index) => (
                            <Box key={index} style={{ marginBottom: '10px' }}>
                                <Typography variant="body2" color={msg.sender === 'You' ? 'primary' : 'textSecondary'}>
                                    <strong>{msg.sender}:</strong> {msg.content}
                                </Typography>
                                <Typography variant="caption" color="textSecondary">
                                    {msg.timestamp}
                                </Typography>
                            </Box>
                        ))
                    ) : (
                        <Typography variant="body2" color="textSecondary">No messages yet.</Typography>
                    )}
                </Box>
            )}

            <Box display="flex" alignItems="center" style={{ marginTop: '10px' }}>
                <TextField
                    variant="outlined"
                    fullWidth
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    style={{ marginRight: '10px' }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()} // Disable if input is empty
                >
                    Send
                </Button>
            </Box>
        </Box>
    );
};

export default Messages;
