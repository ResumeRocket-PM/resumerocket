import { useState, createContext, useEffect, useCallback } from 'react';

const ResumeContext = createContext();



const bigMessage = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

+ "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

+ "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." 

+ "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

+ "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

+ "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";


const ResumeProvider = ({ children }) => {
    // the 3 sections are: repository, edit, applications
    const [sectionSelected, setSectionSelected] = useState(localStorage.getItem('sectionSelected') || 0);
    // const [messages, setMessages] = useState([{ai: "Hello, how can I help you today?"}]);
    const [messages, setMessages] = useState([{ai: bigMessage}]);

    const [selectedResumeId, setSelectedResumeId] = useState(localStorage.getItem('selectedResumeId'));
    const [selectedApplicationId, setSelectedApplicationId] = useState(localStorage.getItem('selectedApplicationId'));
    const [selectedOriginalResumeId, setSelectedOriginalResumeId] = useState(localStorage.getItem('selectedOriginalResumeId'));

    useEffect(() => {
        localStorage.setItem('sectionSelected', sectionSelected);
    }, [sectionSelected]);
    useEffect(() => {
        localStorage.setItem('messages', messages);
    }, [messages]);
    useEffect(() => {
        localStorage.setItem('selectedResumeId', selectedResumeId);
    }, [selectedResumeId]);
    useEffect(() => {
        localStorage.setItem('selectedApplicationId', selectedApplicationId);
    }, [selectedApplicationId]);
    useEffect(() => {
        localStorage.setItem('selectedOriginalResumeId', selectedOriginalResumeId);
    }, [selectedOriginalResumeId]);

    return (
        <ResumeContext.Provider 
            value={{ 
                sectionSelected,
                setSectionSelected,
                messages,
                setMessages,
                selectedResumeId,
                setSelectedResumeId,
                selectedApplicationId,
                setSelectedApplicationId,
                selectedOriginalResumeId,
                setSelectedOriginalResumeId
            }}
        >
            {children}
        </ResumeContext.Provider>
    );
};

export {ResumeProvider, ResumeContext};