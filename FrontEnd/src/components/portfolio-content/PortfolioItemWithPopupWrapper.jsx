import PropTypes from 'prop-types';
import { useEffect, useState, useContext, useRef } from 'react';
import { PortfolioEditContext } from '../../context/PortfolioEditProvider';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';


const PortfolioItemWithPopupWrapper = ({
    children, 
    popoverContent, 
    popoverOpen=null, 
    setPopoverOpen=null, 
    useContentClick=false,
    popupLocation="top",
    popupContentClasses="",
    childrenContainerClasses="",
    wrapperClasses="",
}) => {

    const { editMode } = useContext(PortfolioEditContext);

    const [hoveredItem, setHoveredItem] = useState('');
    const [popoverHovered, setPopoverHovered] = useState(false);
    const [popupDimensions, setPopupDimensions] = useState({ width: 0, height: 0 });
    const popupContentRef = useRef(null);
    const wrapperRef = useRef(null);
    const childrenContainerRef = useRef(null);

    const handleMouseEnterPI = (event, item) => {
        if (!editMode || useContentClick) return;
        setHoveredItem(item);
    };

    const handleMouseLeavePI = () => {
        if (!editMode || useContentClick) return;
        if (popoverHovered) return;
        setHoveredItem('');
    };

    const handlePopoverEnter = () => {
        if (!editMode || useContentClick) return;
        setPopoverHovered(true);
    };

    const handlePopoverLeave = () => {
        if (!editMode || useContentClick) return;
        setPopoverHovered(false);
    };

    const handleContentClick = (event) => {
        if (!editMode || !useContentClick) return;
        setPopoverOpen(true);
        event.stopPropagation();
    };

    const handleDocumentClick = (event) => {
        if (!editMode || !useContentClick) return;
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setPopoverOpen(false);
        }
    };

    const yeetThePopover = () => {
        setPopoverOpen(false);
    };

    useEffect(() => {
        if (!hoveredItem && !popoverHovered) {
            setPopoverOpen(false);
        }
        if (hoveredItem || popoverHovered) {
            setPopoverOpen(true);
        }
    }, [hoveredItem, popoverHovered]);

    useEffect(() => {
        if (popoverOpen === false) {
            setHoveredItem('');
            setPopoverHovered(false);
        }
    }, [popoverOpen]);

    useEffect(() => {
        if(popupContentRef.current) {
            const { width, height } = popupContentRef.current.getBoundingClientRect();
            setPopupDimensions({ width, height });
        }
    }, [popoverOpen]);

    useEffect(() => {
        if (useContentClick) {
            document.addEventListener('click', handleDocumentClick);
            return () => {
                document.removeEventListener('click', handleDocumentClick);
            };
        }
    }, [useContentClick]);

    const getPopoverPosition = (popupLocation) => {
        switch(popupLocation) {
            case 'top':
                return {
                    top: `-${popupDimensions.height + 6}px`,
                    left: '50%',
                    marginLeft: `-${popupDimensions.width / 2}px`,
                };
            case 'right':
                return {
                    top: '50%',
                    right: '0',
                    marginLeft: '6px',
                };
            case 'bottom':
                return {
                    top: '100%',
                    left: '50%',
                    transform: 'translate(-50%, 0)'
                };
            case 'left':
                return {
                    top: '50%',
                    left: '0',
                    transform: 'translate(-100%, -50%)'
                };
            case 'top-right':
                return {
                    top: '0',
                    left: '100%',
                };
            case 'top-right-over':
                return {
                    top: '0',
                    right: '0',
                    margin: '6px 6px 0 0'
                };
            default:
                return {
                    top: '0',
                    right: '0',
                    // margin: '6px 6px 0 0'
                };
        }
    };

    const popoverStyle = getPopoverPosition(popupLocation);

    return (
        <>
            <div
                className={'portfolio-item-with-popup-wrapper ' + wrapperClasses}
                onMouseEnter={(event) => handleMouseEnterPI(event, 'portfolio-item')}
                onMouseLeave={handleMouseLeavePI}
                ref={wrapperRef}
            >
                {editMode && (
                    <div 
                        className={`portfolio-popup-container ${!popoverOpen ? 'not-visible' : ''}`}
                        style={{ 
                            ...popoverStyle,
                            pointerEvents: 'auto',
                        }}
                        onMouseEnter={handlePopoverEnter}
                        onMouseLeave={handlePopoverLeave}
                    >
                        <div 
                            className={`portfolio-popup-content ` + popupContentClasses}
                            ref={popupContentRef}
                        >
                            {popoverContent}
                        </div>
                    </div>                        
                )}
                <div className={'portfolio-popup-children-content ' + childrenContainerClasses}  onClick={handleContentClick}>
                    {/* <ClickAwayListener mouseEvent="onMouseDown" onClickAway={() => setPopoverOpen}> */}
                        {children}
                    {/* </ClickAwayListener> */}
                </div>
            </div>
        </>
    );
};

PortfolioItemWithPopupWrapper.propTypes = {
    children: PropTypes.node.isRequired,
    popoverContent: PropTypes.node,
    popoverOpen: PropTypes.bool,
    setPopoverOpen: PropTypes.func,
    useContentClick: PropTypes.bool,
    popupLocation: PropTypes.string,
    popupContentClasses: PropTypes.string,
};

export default PortfolioItemWithPopupWrapper;