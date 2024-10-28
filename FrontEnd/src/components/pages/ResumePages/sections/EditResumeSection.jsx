import React, { useState, useRef } from 'react';
// import { Editor } from '@tinymce/tinymce-react';
// import DiffMatchPatch from 'diff-match-patch';
// import { Buffer } from 'buffer';
import CreateResume from '../../CreateResume';

import { useApi } from "../../../../hooks";

const EditResumeSection = ({resumeId}) => {
    const [file, setFile] = useState(null);
    const [fileBytes, setFileBytes] = useState(null);
    const [docContent, setDocContent] = useState('');
    const [comparisonDocContent, setComparisonDocContent] = useState('');
    const [diffHtml, setDiffHtml] = useState('');

    const api = useApi();
    const [resume, setResume] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const iframeRef = useRef(null);
    const [targetRect, setTargetRect] = useState(null);

    const handleResize = () => {
        if (iframeRef.current) {
          setTargetRect(iframeRef.current.getBoundingClientRect());
        }
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
      
    const loadResume = () => 
    {
        if(resumeId !== undefined)
        {
            api.get(`/resume/${resumeId}`)
            .then(response => response.json())
            .then(data => {
                setResume(removePageContainer(data.result));

                setTimeout(() => {
                    handleResize();
                  }, 100); 
            })
            .catch(error => {
                console.error("Failed to fetch data:", error);
                setError(error.message);
                setIsLoading(false);
            });
        }

        window.addEventListener('resize', handleResize);
        handleResize()
    
        return () => window.removeEventListener('resize', handleResize);
    }

    return (
        // <div>
            <CreateResume resumeId={resumeId}/>
        // </div>
    );
};

export default EditResumeSection;