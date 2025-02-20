import { useState, createContext, useEffect } from 'react';

const UserInfoContext = createContext();

const UserInfoProvider = ({ children }) => {
    const [userDetails, setUserDetails] = useState(localStorage.getItem('userDetails') || 'none');
    const [userPortfolioContent, setUserPortfolioContent] = useState(localStorage.getItem('userPortfolioContent') || []);


    // Save state variables to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('userDetails', userDetails);
    }, [userDetails]);

    useEffect(() => {
        localStorage.setItem('userPortfolioContent', userPortfolioContent);
    }, [userPortfolioContent]);

    return (
        <UserInfoContext.Provider 
            value={{ 
                userDetails, 
                setUserDetails, 
                userPortfolioContent, 
                setUserPortfolioContent
            }}
        >
            {children}
        </UserInfoContext.Provider>
    );
};

export {UserInfoProvider, UserInfoContext};




