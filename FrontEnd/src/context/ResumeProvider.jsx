import { useState, createContext, useEffect, useCallback } from 'react';

const ResumeContext = createContext();

const ResumeProvider = ({ children }) => {
    const [sectionSelected, setSectionSelected] = useState(localStorage.getItem('sectionSelected') || 0);
    const [messages, setMessages] = useState([{ai: "Hello, how can I help you today?"}]);
    

    useEffect(() => {
        localStorage.setItem('sectionSelected', sectionSelected);
    })
    useEffect(() => {
        localStorage.setItem('messages', messages);
    },
        [messages]
    );

    return (
        <ResumeContext.Provider 
            value={{ 
                sectionSelected,
                setSectionSelected,
                messages,
                setMessages
            }}
        >
            {children}
        </ResumeContext.Provider>
    );
};

export {ResumeProvider, ResumeContext};
