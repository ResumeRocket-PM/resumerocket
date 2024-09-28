import PropTypes from 'prop-types';
import { Popover } from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
// import './PortfolioItemOptionsPopup.css'; // Assuming you will have some styles
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { PortfolioEditContext } from '../../context/PortfolioEditProvider';
import { useEffect, useState, useContext } from 'react';


const PortfolioItemWithPopupWrapper = ({children, type="delete", popupLocation="top"}) => {

    // const { 
    //     hoveredItem,
    //     popoverHovered,
    //     anchorEl,
    //     handlePopoverEnter,
    //     handlePopoverLeave,
    // } = useContext(PortfolioEditContext);

    const [hoveredItem, setHoveredItem] = useState('');
    const [popoverHovered, setPopoverHovered] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    // const [popoverOpen, setPopoverOpen] = useState(false);

    const onDelete = () => {
        console.log("Delete");
    }

    const handleMouseEnterPI = (event, item) => {
        console.log("handleMouseEnter");
        setHoveredItem(item);
        setAnchorEl(event.currentTarget);
    };

    const handleMouseLeavePI = () => {
        if(popoverHovered){
            // setHoveredItem('yeababy');
            return;
        }
        console.log("handleMouseLeave");
        setHoveredItem('');
        // setAnchorEl(null);
    };

    const handlePopoverEnter = () => {
        console.log("handlePopoverEnter");
        setPopoverHovered(true);
    };

    const handlePopoverLeave = () => {
        console.log("handlePopoverLeave");
        setPopoverHovered(false);
        // if (!hoveredItem) {
        //     setAnchorEl(null);
        // }
    };

    const getPopoverPosition = (popupLocation) => {
        switch(popupLocation) {
            case 'top':
                return {
                    anchorOrigin: { vertical: 'top', horizontal: 'center' },
                    transformOrigin: { vertical: 'bottom', horizontal: 'center' }
                };
            case 'right':
                return {
                    anchorOrigin: { vertical: 'center', horizontal: 'right' },
                    transformOrigin: { vertical: 'center', horizontal: 'left' }
                };
            case 'bottom':
                return {
                    anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
                    transformOrigin: { vertical: 'top', horizontal: 'center' }
                };
            case 'left':
                return {
                    anchorOrigin: { vertical: 'center', horizontal: 'left' },
                    transformOrigin: { vertical: 'center', horizontal: 'right' }
                };
            case 'top-right':
                return {
                    anchorOrigin: { vertical: 'top', horizontal: 'right' },
                    transformOrigin: { vertical: 'bottom', horizontal: 'left' }
                };
            default:
                return {
                    anchorOrigin: { vertical: 'top', horizontal: 'center' },
                    transformOrigin: { vertical: 'bottom', horizontal: 'center' }
                };
        }
    };

    const { anchorOrigin, transformOrigin } = getPopoverPosition(popupLocation);


    return (
        <>
            <Popover
                className="portfolio-item-options-popup"
                open={Boolean(hoveredItem) || Boolean(popoverHovered)}
                anchorEl={anchorEl}
                // onClose={onClose}
                onMouseEnter={handlePopoverEnter}
                onMouseLeave={handlePopoverLeave}
                anchorOrigin={anchorOrigin}
                transformOrigin={transformOrigin}
                sx={{pointerEvents: 'none'}}
                disableEnforceFocus
                disableAutoFocus
            >
                <div style={{ pointerEvents: 'auto' }}>
                    <IconButton
                        variant="contained"
                        onClick={() => onDelete()}
                        sx={{ backgroundColor: '#f7f7f7'}}
                    >
                        {type === "add" ? <AddIcon /> : <DeleteIcon />}
                    </IconButton>
                </div>
            </Popover>
            
            <div
                className="portfolio-item-with-popup-wrapper"
                onMouseEnter={(event) => handleMouseEnterPI(event, 'portfolio-item')}
                onMouseLeave={handleMouseLeavePI}
            >
                {children}
            </div>
        </>
    );
};

export default PortfolioItemWithPopupWrapper;