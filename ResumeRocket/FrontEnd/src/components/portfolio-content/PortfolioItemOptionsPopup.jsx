import PropTypes from 'prop-types';
import { Popover } from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
// import './PortfolioItemOptionsPopup.css'; // Assuming you will have some styles
import DeleteIcon from '@mui/icons-material/Delete';
import { PortfolioEditContext } from '../../context/PortfolioEditProvider';
import { useEffect, useState, useContext } from 'react';




///// **** OLD CODE **** /////  

// just keeping this around for reference (even though new code is basically the same)
// new component is now called PorfolioItemWithPopupWrapper, and is used differently 







const PortfolioItemOptionsPopup = () => {

    const { 
        hoveredItem,
        popoverHovered,
        anchorEl,
        handlePopoverEnter,
        handlePopoverLeave,
    } = useContext(PortfolioEditContext);

    // const [popoverOpen, setPopoverOpen] = useState(false);

    const onDelete = () => {
        console.log("Delete");
    }

    // const handlePopoverEnter = () => {    
    //     console.log("handlePopoverHovered");
    //     setPopoverHovered(true);
    // }

    // const handlePopoverLeave = () => {
    //     console.log("handlePopoverUnhovered");
    //     setPopoverHovered(false);
    // }

    // useEffect(() => {
    //     if(hoveredItem || popoverHovered){
    //         setPopoverOpen(true);
    //     }else {
    //         setPopoverOpen(false);
    //     }
    // }, [hoveredItem, popoverHovered]);

    const styles = {
        popover: {
          pointerEvents: 'none',
        },
        popoverContent: {
          pointerEvents: 'auto',
        },
      };


    return (
        <>
            {/* {(hoveredItem || anchorEl) && ( */}
                <Popover
                className="portfolio-item-options-popup"
                open={Boolean(hoveredItem) || Boolean(popoverHovered)}
                anchorEl={anchorEl}
                // onClose={onClose}
                onMouseEnter={handlePopoverEnter}
                onMouseLeave={handlePopoverLeave}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
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
                        <DeleteIcon />
                    </IconButton>
                </div>
            </Popover>
            {/* )} */}
        </>
    );
};

export default PortfolioItemOptionsPopup;