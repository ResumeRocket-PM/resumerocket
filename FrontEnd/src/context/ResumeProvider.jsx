import { useState, createContext, useEffect, useCallback } from 'react';

const ResumeContext = createContext();

const ResumeProvider = ({ children }) => {
    const [sectionSelected, setSectionSelected] = useState(localStorage.getItem('sectionSelected') || 0);
    

    useEffect(() => {
        localStorage.setItem('sectionSelected', sectionSelected);
    })


    return (
        <ResumeContext.Provider 
            value={{ 
                sectionSelected,
                setSectionSelected,
            }}
        >
            {children}
        </ResumeContext.Provider>
    );
};

export {ResumeProvider, ResumeContext};
