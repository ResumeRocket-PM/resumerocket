import "../../styles/CreateResume.css";
import PropTypes from 'prop-types';
import { useState, version } from 'react';
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
    const [versionHistoryOpen, setVersionHistoryOpen] = useState(false);

    const handleShareDialogOpen = () => {
        setShareDialogOpen(true);
    }   

    const handleShareDialogClose = () => {
        setShareDialogOpen(false);
    }

    const handleChatOpen = () => {
        setChatOpen(!chatOpen);
    }

    const handleVersionHistoryOpen = () => {
        setVersionHistoryOpen(!versionHistoryOpen);
    }

    return (
        <div id='CreateResume_content' 
        className=
            {versionHistoryOpen && chatOpen ? "versionHistoryOpen_chatOpen" : 
            versionHistoryOpen ? "versionHistoryOpen" : 
            chatOpen ? "chatOpen" : ""}
        >
            <div id='left_menu_section'>
                <LeftBarResume 
                    handleShareDialogOpen={handleShareDialogOpen} 
                    handleChatOpen={handleChatOpen} 
                    handleVersionHistoryOpen={handleVersionHistoryOpen}
                />
                {chatOpen && <Chat/>}
            </div>
            <div id='resume_section'>
                {!versionHistoryOpen &&
                    <Card className="ResumeFull" sx={{}}>
                        <CardContent>
                            pretend this is a resume okay
                        </CardContent>
                    </Card>                
                }

                {versionHistoryOpen && 
                    <>
                        <Card className="ResumeSmaller" sx={{}}>
                            <CardContent>
                                pretend this is a version history okay
                            </CardContent>
                        </Card>
                        <Card className="ResumeSmaller" sx={{}}>
                            <CardContent>
                                pretend this is a version history okay
                            </CardContent>
                        </Card>                
                    </>
                }
            </div>
            <ShareDialog open={shareDialogOpen} onClose={handleShareDialogClose}/>
            <div id="col3">
                {[...Array(6).keys()].map((num) => (
                    versionHistoryOpen && <div key={num} className="version_block">Version {num + 1}</div>
                ))}
                {versionHistoryOpen && <div className="version_block">Original</div>}
            </div>


        </div>
    )
}