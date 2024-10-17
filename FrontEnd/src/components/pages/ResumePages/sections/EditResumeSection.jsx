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

    // const handleFileChange = (event) => {
    //     const uploadedFile = event.target.files[0];
    //     setFile(uploadedFile);
    // };

    // const handleUpload = () => {
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onload = (e) => {
    //             const arrayBuffer = e.target.result; // ArrayBuffer
    //             const byteArray = new Uint8Array(arrayBuffer);
    //             const simulatedResponse = {
    //                 result: {
    //                     resumeContent: {
    //                         FileBytes: Buffer.from(byteArray).toString('base64'), // base64 encoded string
    //                         Recommendations: "Sample recommendation text\nAnother recommendation"
    //                     }
    //                 }
    //             };
    //             setFileBytes(simulatedResponse.result.resumeContent.FileBytes);
    //             setDocContent(Buffer.from(simulatedResponse.result.resumeContent.FileBytes, 'base64').toString());
    //         };
    //         reader.readAsArrayBuffer(file);
    //     }
    // };

    // const handleDownload = () => {
    //     if (fileBytes) {
    //         const binaryString = Buffer.from(fileBytes, 'base64').toString('binary');
    //         const byteNumbers = new Array(binaryString.length);
    //         for (let i = 0; i < binaryString.length; i++) {
    //             byteNumbers[i] = binaryString.charCodeAt(i);
    //         }
    //         const byteArray = new Uint8Array(byteNumbers);
    //         const blob = new Blob([byteArray], { type: 'application/pdf' });
    //         const link = document.createElement('a');
    //         link.href = URL.createObjectURL(blob);
    //         link.download = 'custom_filename.pdf';
    //         document.body.appendChild(link);
    //         link.click();
    //         document.body.removeChild(link);
    //         URL.revokeObjectURL(link.href);
    //     }
    // };

    // const handleEditorChange = (content) => {
    //     setDocContent(content);
    //     const encodedContent = Buffer.from(content).toString('base64');
    //     setFileBytes(encodedContent);
    // };

    // const handleComparisonEditorChange = (content) => {
    //     setComparisonDocContent(content);
    // };

    // const compareDocuments = () => {
    //     const dmp = new DiffMatchPatch();
    //     const diff = dmp.diff_main(docContent, comparisonDocContent);
    //     dmp.diff_cleanupSemantic(diff);
    //     const diffHtml = dmp.diff_prettyHtml(diff);
    //     setDiffHtml(diffHtml);
    // };

    // *********** NEW CODE ***********

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