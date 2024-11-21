import React, { useState, useContext } from 'react';
import TextField from '@mui/material/TextField';
import { useApi } from "../hooks";
import { ResumeContext } from '../context/ResumeProvider';

const Chat = ({ resumeId, applicationId }) => {
    const { messages, setMessages } = useContext(ResumeContext);
    const [inputText, setInputText] = useState('');
    const api = useApi();

    const sendMessage = async (message) => {
        try {
            const payload = {
                "resumeId": resumeId,
                "applicationId": applicationId || null,
                "message": message
            };
            const response = await api.post('/Externel/openai/aiMultipleMessage', payload);
            const responseData = await response.json();
            const aiMessage = responseData.result;
            setMessages((prevMessages) => [
                ...prevMessages,
                { ai: aiMessage }
            ]);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const message = inputText.trim();
            if (message) {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { user: message }
                ]);
                setInputText('');
                sendMessage(message);
            }
        }
    };

    return (
        <div id="chat_outermost">
            <h1>Resume Assistant</h1>
            <div id="chat_messages_container">
                {messages.map((message, index) => (
                    <React.Fragment key={index}>
                        {message.user && (
                            <div className="UserMessageRow">
                                <div className="UserMessage">{message.user}</div>
                            </div>
                        )}
                        {message.ai && (
                            <div className="AiMessageRow">
                                <div className="AiMessage">{message.ai}</div>
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
            <div id="chat_input_container">
                <TextField
                    id="chat_input"
                    label="Type a message"
                    variant="outlined"
                    fullWidth
                    multiline
                    minRows={1}
                    maxRows={5}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    sx={{
                        fontSize: ".5em",
                        "& textarea": {
                            scrollbarWidth: "thin",
                            "&::-webkit-scrollbar": {
                                width: "6px",
                                height: "6px",
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default Chat;