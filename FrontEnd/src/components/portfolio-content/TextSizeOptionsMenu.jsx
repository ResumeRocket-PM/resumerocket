import React, { useEffect } from 'react'
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import IconButton from '@mui/material/IconButton'

// import MoreVertIcon from '@mui/icons-material/MoreVert' // three dots
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import SendIcon from '@mui/icons-material/Send'
// import ListItemIcon from '@mui/icons-material/ListItemIcon'
import ListItemIcon from '@mui/icons-material/TurnedIn';
// import ListItemText from '@mui/icons-material/ListItemText'
import ListItemText from '@mui/icons-material/Title';

import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import AlignHorizontalCenterIcon from '@mui/icons-material/AlignHorizontalCenter';
import AlignHorizontalRightIcon from '@mui/icons-material/AlignHorizontalRight';

import AlignVerticalBottomIcon from '@mui/icons-material/AlignVerticalBottom';
import AlignVerticalCenterIcon from '@mui/icons-material/AlignVerticalCenter';
import AlignVerticalTopIcon from '@mui/icons-material/AlignVerticalTop';

import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';

export default function TextSizeOptionsMenu({
    changeFontSize, 
    setPopoverOpen, 
    fontSelected,
    changeHorizontalAlign=null,
    changeVerticalAlign=null,   
    changeTextAlign=null,

}) {
    const [open, setOpen] = React.useState(false)
    const anchorRef = React.useRef(null)

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen)
    }


    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return
        }

        setOpen(false)
    }

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault()
            setOpen(false)
        }
    }

    const handleFontSizeItemClick = (newSize) => {
        changeFontSize(newSize)
        // setPopoverOpen(false)
        setOpen(false)
    }      
    
    const handleTextAlignItemClick = (newAlign) => {
        changeTextAlign(newAlign)
    }

    const handleVerticalAlignItemClick = (newAlign) => {
        changeVerticalAlign(newAlign)
    }

    return (
        <div>
            <div className='hz-center'>
                <IconButton
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                    size="small"
                >
                    <p>{fontSelected}</p>
                    <KeyboardArrowDownIcon fontSize="small" />
                </IconButton>
                {changeTextAlign && (    
                    <>
                        <IconButton onClick={() => handleTextAlignItemClick('text-align-left')}>
                            <FormatAlignLeftIcon/>
                        </IconButton>
                        <IconButton onClick={() => handleTextAlignItemClick('text-align-center')}>
                            <FormatAlignCenterIcon/>
                        </IconButton>
                        <IconButton onClick={() => handleTextAlignItemClick('text-align-right')}>
                            <FormatAlignRightIcon/>
                        </IconButton>                
                    </>
                )}
                {changeHorizontalAlign && (    
                    <>
                        <IconButton>
                            <AlignHorizontalLeftIcon/>
                        </IconButton>
                        <IconButton>
                            <AlignHorizontalCenterIcon/>
                        </IconButton>
                        <IconButton>
                            <AlignHorizontalRightIcon/>
                        </IconButton>                
                    </>
                )}
                {changeVerticalAlign && (    
                    <>
                        <IconButton onClick={() => handleVerticalAlignItemClick('vertical-align-top')}> 
                            <AlignVerticalTopIcon/>
                        </IconButton>
                        <IconButton onClick={() => handleVerticalAlignItemClick('vertical-align-center')}>
                            <AlignVerticalCenterIcon/>
                        </IconButton>
                        <IconButton onClick={() => handleVerticalAlignItemClick('vertical-align-bottom')}>
                            <AlignVerticalBottomIcon/>
                        </IconButton>                
                    </>
                )}
            </div>

            <Popper open={open} anchorEl={anchorRef.current} transition disablePortal placement='bottom-start'>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        // style={{ transformOrigin: placement === 'bottom-end' ? 'center top' : 'bottom-end' }}
                    >
                        <Paper style={{margin: '10px 0 0 -5px', '&& .MuiPaper-root': {zIndex: '2'}, width: '103.03px'}}>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown} style={{ padding: '0', zIndex: '1000' }}                                >
                                    <MenuItem  onClick={() => handleFontSizeItemClick('h1')}>
                                        <div className='bold'>h1</div>
                                    </MenuItem>
                                    <MenuItem onClick={() => handleFontSizeItemClick('h2')}>
                                        <div className='bold'>h2</div>
                                    </MenuItem>
                                    <MenuItem  onClick={() => handleFontSizeItemClick('h3')}>
                                        <div className='bold'>h3</div>
                                    </MenuItem>
                                    <MenuItem onClick={() => handleFontSizeItemClick('h4')}>
                                        <div className='bold'>h4</div>
                                    </MenuItem>
                                    <MenuItem  onClick={() => handleFontSizeItemClick('p')}>
                                        <div className='bold'>p</div>
                                    </MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    )
}