import React, { useState, useRef, useContext, useEffect, useLayoutEffect } from "react";
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CloseIcon from '@mui/icons-material/Close';
import { useApi } from "../hooks";
import { ResumeContext } from '../context/ResumeProvider';
import Draggable from "react-draggable"; 
import { Resizable } from 're-resizable';
import Tooltip from '@mui/material/Tooltip';
import '../styles/Chat.css'; // Ensure you have the styles for chat

const Chat = ({ resumeId, applicationId, mainContentHeight }) => {
    // const startingMessage = "Hello! How can i help you today?"
    const { messages, setMessages, startingMessage } = useContext(ResumeContext);
    const [inputText, setInputText] = useState('');
    const api = useApi();

    const [chatMounted, setChatMounted] = useState(true);
    const [isResizing, setIsResizing] = useState(false);
    const chatRef = useRef();

    const handleUndock = () => setChatMounted(false);
    const handleDock = () => setChatMounted(true);
    const chatOutermostStyle = chatMounted
        ? { height: mainContentHeight ? `${Math.round(mainContentHeight * 0.90)}px` : 'auto'}
        : {};

    const messagesEndRef = useRef(null);


    // for( let i = 0; i < 10; i++) {
    //     messages.push({ ai: bigMessage });
    // }

    const [typingStarted, setTypingStarted] = useState(false);
    useEffect(() => {
        const typeMessage = async () => {
            if (messages.length === 1 && messages[0].ai === "") {
                let aiMessage = '';
                for (const char of startingMessage) {
                    aiMessage += char;
                    setMessages((prevMessages) => {
                        const newMessages = [...prevMessages];
                        const lastMessage = newMessages[newMessages.length - 1];
                        if (lastMessage?.ai !== undefined) {
                            lastMessage.ai = aiMessage;
                        }
                        return newMessages;
                    });
                    await new Promise(res => setTimeout(res, 5));
                }
            }
        };
        typeMessage();
    }, [messages, setMessages, startingMessage, typingStarted]);

    useEffect(() => {
        const handleMouseUp = () => setIsResizing(false);
        window.addEventListener('mouseup', handleMouseUp);
        return () => window.removeEventListener('mouseup', handleMouseUp);
    }, []);

    // Listen for mousedown on the resize handle (bottom-right corner)
    useEffect(() => {
        const chatElem = chatRef.current;
        if (!chatElem) return;
        const handleMouseDown = (e) => {
            // Only trigger if the user is clicking the resize handle (bottom-right corner)
            // The resize handle is usually 16x16px in the bottom right
            const rect = chatElem.getBoundingClientRect();
            if (
                e.target === chatElem &&
                e.offsetX > rect.width - 20 &&
                e.offsetY > rect.height - 20
            ) {
                setIsResizing(true);
            }
        };
        chatElem.addEventListener('mousedown', handleMouseDown);
        return () => chatElem.removeEventListener('mousedown', handleMouseDown);
    }, []);

    useEffect(() => {
    if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
}, [messages]);

    // const sendMessage = async (message) => {
    //     try {
    //         const payload = {
    //             "resumeId": resumeId,
    //             "applicationId": applicationId || null,
    //             "message": message
    //         };
    //         const response = await api.post('/Externel/openai/aiMultipleMessage', payload);
    //         const responseData = await response.json();
    //         const aiMessage = responseData.result;
    //         setMessages((prevMessages) => [
    //             ...prevMessages,
    //             { ai: aiMessage }
    //         ]);
    //     } catch (error) {
    //         console.error('Error sending message:', error);
    //     }
    // };

    const sendMessage = async (message) => {
        const payload = {
            resumeId: resumeId,
            applicationId: applicationId || null,
            message: message
        };

        // Use fetch instead of Axios to handle streaming
        const response = await fetch(`${api.baseUrl}/Externel/openai/streamAiMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let aiMessage = '';

        // Start with an empty AI message in the message list
        setMessages((prevMessages) => [
            ...prevMessages,
            { ai: '' }
        ]);

        let numChunks = 0;
        while (true) {
            const { done, value } = await reader.read();

            if (done) break;
            numChunks++;

            const chunk = decoder.decode(value, { stream: true });

            // Parse the SSE format
            const matches = chunk.match(/^data: (.*)$/gm);
            if (matches) {
                for (const line of matches) {
                    const data = line.replace(/^data: /, '');
                    aiMessage += data;

                    setMessages((prevMessages) => {
                        const newMessages = [...prevMessages];
                        const lastMessage = newMessages[newMessages.length - 1];
                        if (lastMessage?.ai !== undefined) {
                            lastMessage.ai = aiMessage;
                        }
                        return newMessages;
                    });
                }
            }
        }

        console.log('numChunks', numChunks)
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


    const chatContent = (
        <div 
            id="chat_outermost" 
            className={!chatMounted ? 'unmounted-styles' : 'mounted-styles'} 
            ref={chatRef}
            style={chatOutermostStyle}
        >
            <div className="chat-header-and-handle glossy-background">
                <div></div>
                <h1>Resume Assistant</h1>
                <div className="hz-right">
                    <Tooltip title={chatMounted ? "Undock" : "Dock"}>
                        <IconButton
                            aria-label={chatMounted ? "Undock" : "Dock"}
                            onClick={chatMounted ? handleUndock : handleDock}
                            size="small"
                        >
                            {chatMounted ? <OpenInNewIcon /> : <CloseIcon />}
                        </IconButton>
                    </Tooltip>
                </div>
                
            </div>
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
                <div ref={messagesEndRef} />
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
    )
    if (!chatMounted) {
        return (
            <Draggable disabled={isResizing} handle=".chat-header-and-handle">
                {/* <Resizable
                    defaultSize={{
                        width: 320,
                        height: 560,
                    }}
                    minWidth={256}
                    minHeight={320}
                    maxWidth="90vw"
                    maxHeight="90vh"
                    style={{ zIndex: 1000, position: 'fixed', top: 100, left: 100 }}
                    enable={{
                        top: true, right: true, bottom: true, left: true,
                        topRight: true, bottomRight: true, bottomLeft: true, topLeft: true
                    }}
                    onResizeStart={() => setIsResizing(true)}
                    onResizeStop={() => setIsResizing(false)}
                > */}
                {/* </Resizable> */}
                {chatContent}
            </Draggable>
        );
    }
    else {
        return (
            chatContent
        )
    }
};

export default Chat;