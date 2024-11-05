import { useState, createContext, useEffect, useCallback } from 'react';
import debounce from 'lodash.debounce';

const PortfolioEditContext = createContext();

const PortfolioEditProvider = ({ children }) => {

    const [editMode, setEditMode] = useState(true);
    const [selectedPage, setSelectedPage] = useState(localStorage.getItem('selectedPage') || 'about');

    const autoResizeTextArea = (e) => {
        e.target.style.height = '1px';  // Temporarily set height to 1px to get the correct scrollHeight
        e.target.style.height = (e.target.scrollHeight) + 'px';  // Adjust height to fit the content
    };

    const updateTextAreaSizes = () => {
        const container = document.getElementById('portfolio-actual');
        if (container) {
            const textareas = container.querySelectorAll('.portfolio-textarea');
            textareas.forEach((textarea) => {
                autoResizeTextArea({ target: textarea });
            });
        }
    };

    useEffect(() => {
        localStorage.setItem('editMode', editMode);
    }, [editMode]);

    useEffect(() => {
        localStorage.setItem('selectedPage', selectedPage);
    }, [selectedPage]);


    return (
        <PortfolioEditContext.Provider 
            value={{ 
                editMode,
                setEditMode,
                selectedPage,
                setSelectedPage,
                autoResizeTextArea, 
                updateTextAreaSizes,
            }}
        >
            {children}
        </PortfolioEditContext.Provider>
    );
};

export {PortfolioEditProvider, PortfolioEditContext};
