import "../../../styles/CreateResume.css";
import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { CardContent, Button, Card } from '@mui/material/';
import { useApi } from "../../../hooks";
import { ClipLoader } from "react-spinners";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

export default function ResumeDisplayDialog({ resumeId, resumeDisplayDialogOpen, setResumeDisplayDialogOpen }) {

    const api  = useApi();
    const [resume, setResume] = useState(null);
    const iframeRef = useRef(null);
    const [targetRect, setTargetRect] = useState(null);

    const [resumeLoading, setResumeLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleResize = () => {
        if (iframeRef.current) {
            setTargetRect(iframeRef.current.getBoundingClientRect());
        }
    };

    const loadPage = () => {
        if (resumeId) {
            if (!api || !api.get) {
                console.error("API is not defined or does not have a 'get' method");
                return;
            }

            api.get(`/resume/${resumeId}`)
                .then(response => response.json())
                .then(data => {
                    console.log('data', data);
                    setResume(removePageContainer(data.result));
                    // setResume(data.resutlt);

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
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    };

    useEffect(() => {
        if(resumeId) {
            loadPage();
        }
    }, [resumeId]);

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

    return (
        <Dialog 
            open={resumeDisplayDialogOpen} 
            onClose={() => setResumeDisplayDialogOpen(false)} 
            maxWidth={false}
        >
            <DialogContent>
                    <div id='resume_section' >
                        {resumeLoading ? (
                            <ClipLoader />
                        ) : (

                                    <div id='resume-html-container' 
                                        contentEditable={false}
                                        dangerouslySetInnerHTML={{ __html: resume }}
                                    />

                        )}
                    </div>
            </DialogContent>
        </Dialog>
    );
}