import "../../../styles/CreateResume.css";
import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { CardContent, Button, Card } from '@mui/material/';
import { useApi } from "../../../hooks";
import { ClipLoader } from "react-spinners";

export default function ShowResume({ resumeId = null, onBackClick }) {
    let { id } = useParams();
    id = resumeId || id; // use resumeId if provided, otherwise use id from URL
    const api = useApi();

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
        if (id !== undefined) {
            api.get(`/resume/${id}`)
                .then(response => response.json())
                .then(data => {
                    console.log('data', data);
                    setResume(removePageContainer(data.result));

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
        loadPage();
    }, []);

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
        <div id='ShowResume_content'>
            <Button onClick={onBackClick} variant="contained" style={{ marginBottom: '20px' }}>
                Back to Version History
            </Button>
            <div id='resume_section'>
                {resumeLoading ? (
                    <ClipLoader />
                ) : (
                    <Card>
                        <CardContent>
                            <div id='resume-html-container'
                                contentEditable={false}
                                dangerouslySetInnerHTML={{ __html: resume }}
                            />
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}

ShowResume.propTypes = {
    resumeId: PropTypes.number,
    onBackClick: PropTypes.func.isRequired,
};