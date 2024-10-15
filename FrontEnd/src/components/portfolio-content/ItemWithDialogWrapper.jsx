import { useState, useContext, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import Checkbox from '@mui/material/Checkbox';
// import FormControlLabel from '@mui/material/FormControlLabel';
import { PortfolioEditContext } from '../../context/PortfolioEditProvider';

// isOpen and setIsOpen are optional props that can be passed to control the dialog from outside the component
const ItemWithDialogWrapper = ({children, dialogContent, onClose=null, isOpen=null, setIsOpen=null, title=null}) => {
    const { editMode } = useContext(PortfolioEditContext);

    const [open, setOpen] = useState(isOpen !== null ? isOpen : false);

    const toggleDialogOpen = (event) => {
        event.stopPropagation(); // Stop event propagation
        setOpen(!open);
        if(open && onClose){
            onClose();
        }

        if(setIsOpen){
            setIsOpen(!open);
        }
    }

    // useEffect(() => {
    //     if(isOpen){
    //         setOpen(isOpen);
    //     } else {
    //         setOpen(false);
    //         if(onClose){
    //             onClose();
    //         }
    //     }
    // }, [isOpen])


    return (
        <>
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
                        {dialogContent}
                </DialogContent>
            </Dialog>  
            {children && (
                <div onClick={toggleDialogOpen}>
                    {children}
                </div>
            )    
            }        
      </>
    );
}

export default ItemWithDialogWrapper;