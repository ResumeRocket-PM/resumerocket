import { useState, createContext, useEffect, useCallback } from 'react';
import debounce from 'lodash.debounce';

const PortfolioEditContext = createContext();

const PortfolioEditProvider = ({ children }) => {

    const [editMode, setEditMode] = useState(true);
    const [selectedPage, setSelectedPage] = useState(localStorage.getItem('selectedPage') || 'about');
    // const [hoveredItem, setHoveredItem] = useState(localStorage.getItem('hoveredItem') || '');
    // const [popoverHovered, setPopoverHovered] = useState(false);
    // const [anchorEl, setAnchorEl] = useState(localStorage.getItem('anchorEl') || null);

    // const handleMouseEnterPI = (event, item) => {
    //     console.log("handleMouseEnter");
    //     setHoveredItem(item);
    //     setAnchorEl(event.currentTarget);
    // };

    // const handleMouseLeavePI = () => {
    //     if(popoverHovered){
    //         // setHoveredItem('yeababy');
    //         return;
    //     }
    //     console.log("handleMouseLeave");
    //     setHoveredItem('');
    //     // setAnchorEl(null);
    // };

    // const handlePopoverEnter = () => {
    //     console.log("handlePopoverEnter");
    //     setPopoverHovered(true);
    // };

    // const handlePopoverLeave = () => {
    //     console.log("handlePopoverLeave");
    //     setPopoverHovered(false);
    //     // if (!hoveredItem) {
    //     //     setAnchorEl(null);
    //     // }
    // };

    const autoResizeTextArea = (e) => {
        e.target.style.height = '1px';  // Temporarily set height to 1px to get the correct scrollHeight
        e.target.style.height = (e.target.scrollHeight) + 'px';  // Adjust height to fit the content
    };

    ////// ** this was code to delay calling updateTextAreaSizes, it was like delaying the call
    // or not even allowing another call until we'd gone the certain amount of time without a call
    // const updateTextAreaSizes = useCallback(debounce(() => {
    //     const container = document.getElementById('portfolio-actual');
    //     if (container) {
    //         const textareas = container.querySelectorAll('.portfolio-textarea');
    //         textareas.forEach((textarea) => {
    //             autoResizeTextArea({ target: textarea });
    //         });
    //     }
    // }, 300), []);

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

    // Save state variables to localStorage whenever they change
    // useEffect(() => {
    //     localStorage.setItem('hoveredItem', hoveredItem);
    // }, [hoveredItem]);

    // useEffect(() => {
    //     localStorage.setItem('popoverOpen', popoverHovered);
    // }, [popoverHovered]);

    // useEffect(() => {
    //     localStorage.setItem('anchorEl', anchorEl);
    // }, [anchorEl]);

    return (
        <PortfolioEditContext.Provider 
            value={{ 
                editMode,
                setEditMode,
                selectedPage,
                setSelectedPage,
                // hoveredItem, 
                // setHoveredItem, 
                // popoverHovered,
                // setPopoverHovered,
                // anchorEl, 
                // setAnchorEl,
                // handleMouseEnterPI,
                // handleMouseLeavePI,
                // handlePopoverEnter,
                // handlePopoverLeave, 
                autoResizeTextArea, 
                updateTextAreaSizes
            }}
        >
            {children}
        </PortfolioEditContext.Provider>
    );
};

export {PortfolioEditProvider, PortfolioEditContext};
