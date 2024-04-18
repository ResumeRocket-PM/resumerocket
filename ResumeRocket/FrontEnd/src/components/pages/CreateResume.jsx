import "../../styles/CreateResume.css";
import PropTypes from 'prop-types';
import { useState } from 'react';
import LeftBarResume from '../LeftBarResume.jsx';
import { Card, CardContent, Dialog} from '@mui/material/';
import Chat from '../Chat.jsx';


function ShareDialog(props) {
    const { onClose, open } = props;

    const handleClose = () => {
        onClose();
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <div id='share_dialog_content'>
                <input type='text' value='https://resumerocket.com/username/resume'/>
            </div>
        </Dialog>
    )
}

ShareDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
  };


export default function CreateResume() {
    const [shareDialogOpen, setShareDialogOpen] = useState(false);
    const [chatOpen, setChatOpen] = useState(false);

    const handleShareDialogOpen = () => {
        setShareDialogOpen(true);
    }   

    const handleShareDialogClose = () => {
        setShareDialogOpen(false);
    }

    const handleChatOpen = () => {
        setChatOpen(!chatOpen);
    }

    return (
        <div id='CreateResume_content'>
            <div id='left_menu_section'>
                <LeftBarResume handleShareDialogOpen={handleShareDialogOpen} handleChatOpen={handleChatOpen}/>
                {chatOpen && <Chat/>}
            </div>
            <div id='resume_section'>
                <Card sx={{height:'85vh', width:'70vh'}}>
                    <CardContent>
                        pretend this is a resume okay
                    </CardContent>
                </Card>
            </div>
            <ShareDialog open={shareDialogOpen} onClose={handleShareDialogClose}/>
            <div id="col3"></div>
        </div>
    )
}