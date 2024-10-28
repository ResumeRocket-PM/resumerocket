import "../../styles/CreateResume.css";
import PropTypes from 'prop-types';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import LeftBarResume from '../LeftBarResume.jsx';
import { Card, CardContent, Dialog, Button} from '@mui/material/';
import Chat from '../Chat.jsx';
import { useApi } from "../../hooks";
import Bubble from "../Effects/Bubble.jsx"
import { ClipLoader } from "react-spinners";
import { debounce, set } from 'lodash';
import AddVersionToResumeHistoryButton from './ResumePages/AddVersionToResumeHistoryButton.jsx';


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


export default function CreateResume({resumeId=null}) {

    let { id } = useParams();
    id = resumeId || id;
    const api = useApi();

    const [resume, setResume] = useState(null);
    const iframeRef = useRef(null);
    const [targetRect, setTargetRect] = useState(null);

    const [resumeLoading, setResumeLoading] = useState(true);
    const [error, setError] = useState(null);

    const [resumeDoneEditing, setResumeDoneEditing] = useState(true);

    const handleResize = () => {
        if (iframeRef.current) {
          setTargetRect(iframeRef.current.getBoundingClientRect());
        }
      };
      
    const loadPage = () => 
    {
        if(id !== undefined)
        {
            api.get(`/resume/${id}/suggestions`)
            .then(response => response.json())
            .then(data => {
                console.log('data', data);
                setResume(removePageContainer(data.result.resumeHTML));

                setTimeout(() => {
                    handleResize();
                  }, 100); 
                setResumeLoading(false);
            })
            .catch(error => {
                console.error("Failed to fetch data:", error);
                setError(error.message);
                setResumeLoading(false);
            });
        }

        window.addEventListener('resize', handleResize);
        handleResize()
    
        return () => window.removeEventListener('resize', handleResize);
    }

    useEffect(() => {
        loadPage()
    }, []); 

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

    const downloadPdf = () => {
        api.get(`/resume/${id}/pdf`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            console.log('response', response)
            return response.blob(); 
        })
        .then(pdfBlob => {
            const blobUrl = URL.createObjectURL(pdfBlob);

            const link = document.createElement('a');
            
            link.href = blobUrl;

            link.download = 'resume.pdf'; 

            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);

            URL.revokeObjectURL(blobUrl);
        })
        .catch(error => {
            console.error("Error downloading PDF:", error);
        });
    };

    const removePageContainer = (html) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
    
        const styleTags = tempDiv.querySelectorAll('style');
        const styles = Array.from(styleTags).map(style => style.outerHTML).join('\n');
    
        const pageContainer = tempDiv.querySelector('#page-container');
    
        if (pageContainer) {
            return `${styles}\n${pageContainer.innerHTML}`;
        } else {
            console.warn('No #page-container found in the HTML');
            return null; 
        }
    };

    const debouncedSetResume = useCallback(
        debounce((newHtml) => {
            setResume(newHtml);
        }, 1000),
        []
    );
    
    const handleResumeHtmlContentChange = (event) => {
        setResumeDoneEditing(false);
        debouncedSetResume(event.target.innerHTML);
        setResumeDoneEditing(true); 
    };

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
                <Button 
                style={{ marginLeft: '20px' }}
                variant="contained" 
                onClick={downloadPdf} 
                disabled={!resume}>Download Pdf
                </Button>
                <div style={{marginLeft: '20px'}}>
                    <AddVersionToResumeHistoryButton
                    resume={resume}
                    resumeLoading={resumeLoading}
                    resumeDoneEditing={resumeDoneEditing}
                    originalResumeId={id}
                    />
                </div>

            </div>

            <div id='resume_section'>
                {resumeLoading ? (
                    <ClipLoader />
                ) : (
                    <>

                {!versionHistoryOpen &&
                    <Card className="ResumeFull" sx={{}}>

                        <CardContent>
                            <div id='resume-html-container'
                                contentEditable={true}
                                dangerouslySetInnerHTML={{ __html: resume }}
                                onInput={handleResumeHtmlContentChange}
                            />
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
                    </>
                )}
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