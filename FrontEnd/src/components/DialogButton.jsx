import { useState, useContext, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import Checkbox from '@mui/material/Checkbox';
// import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';

// isOpen and setIsOpen are optional props that can be passed to control the dialog from outside the component
const DialogButton = ({text, content, buttonStyles=null, title=null, startIcon=null, icon=null, onClose=null, isOpen=null, setIsOpen=null}) => {


    const [open, setOpen] = useState(isOpen !== null ? isOpen : false);

    const toggleDialogOpen = () => {
        setOpen(!open);
        if(open && onClose){
            onClose();
        }

        if(setIsOpen){
            setIsOpen(!open);
        }
    }

    useEffect(() => {
        if(isOpen){
            setOpen(isOpen);
        } else {
            setOpen(false);
            if(onClose){
                onClose();
            }
        }
    }, [isOpen])


    return (
        <>
            {startIcon && (
                <Button 
                    variant="outlined" 
                    onClick={toggleDialogOpen}
                    startIcon={startIcon}
                    sx={{
                        // minWidth: 'fit-content', 
                        // backgroundColor: '#A1D7F5',
                        // fontWeight: 'inherit',
                        // color: 'currentColor',
                        // borderRadius: '16px',
                        // width: '10rem',
                        // height: '10rem',
                        ...buttonStyles
                    }}
                >{text}
                </Button>
            )}

            {icon && (
                <Button
                    variant="outlined"
                    sx={{...buttonStyles, minWidth: 'fit-content', padding: "5px"}}
                >
                    {icon}
                </Button>
            )}

            <Dialog
            open={open}
            onClose={toggleDialogOpen}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            {title && <DialogTitle id="alert-dialog-title">{title}</DialogTitle>}
            <DialogContent 
                // sx={{'&& .MuiDialogContent-root': {display: 'flex', flexDirection: 'column', alignItems: 'center'}}}
                sx={{maxHeight: 'fit-content'}}
            >
                {/* <DialogContentText id="alert-dialog-description">
                Let Google help apps determine location. This means sending anonymous
                location data to Google, even when no apps are running.
                </DialogContentText> */}
                {/* <div className='v-center'>  */}
                    {content}
                {/* </div> */}
            </DialogContent>
            {/* <DialogActions>
                <Button onClick={handleDialogChange}>Disagree</Button>
                <Button onClick={handleDialogChange} autoFocus>
                Agree
                </Button>
            </DialogActions> */}
            </Dialog>          
      </>
    );
}

export default DialogButton;