import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import DiffMatchPatch from 'diff-match-patch';
import { Buffer } from 'buffer';

const EditResumeSection = () => {
    const [file, setFile] = useState(null);
    const [fileBytes, setFileBytes] = useState(null);
    const [docContent, setDocContent] = useState('');
    const [comparisonDocContent, setComparisonDocContent] = useState('');
    const [diffHtml, setDiffHtml] = useState('');

    const handleFileChange = (event) => {
        const uploadedFile = event.target.files[0];
        setFile(uploadedFile);
    };

    const handleUpload = () => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const arrayBuffer = e.target.result; // ArrayBuffer
                const byteArray = new Uint8Array(arrayBuffer);
                const simulatedResponse = {
                    result: {
                        resumeContent: {
                            FileBytes: Buffer.from(byteArray).toString('base64'), // base64 encoded string
                            Recommendations: "Sample recommendation text\nAnother recommendation"
                        }
                    }
                };
                setFileBytes(simulatedResponse.result.resumeContent.FileBytes);
                setDocContent(Buffer.from(simulatedResponse.result.resumeContent.FileBytes, 'base64').toString());
            };
            reader.readAsArrayBuffer(file);
        }
    };

    const handleDownload = () => {
        if (fileBytes) {
            const binaryString = Buffer.from(fileBytes, 'base64').toString('binary');
            const byteNumbers = new Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                byteNumbers[i] = binaryString.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'application/pdf' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'custom_filename.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);
        }
    };

    const handleEditorChange = (content) => {
        setDocContent(content);
        const encodedContent = Buffer.from(content).toString('base64');
        setFileBytes(encodedContent);
    };

    const handleComparisonEditorChange = (content) => {
        setComparisonDocContent(content);
    };

    const compareDocuments = () => {
        const dmp = new DiffMatchPatch();
        const diff = dmp.diff_main(docContent, comparisonDocContent);
        dmp.diff_cleanupSemantic(diff);
        const diffHtml = dmp.diff_prettyHtml(diff);
        setDiffHtml(diffHtml);
    };

    return (
        <div style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box', padding: '0 6rem 0 6rem' }}>
            <h2>Edit Resume Section</h2>
            <input type="file" accept=".pdf" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload Resume</button>
            <button onClick={handleDownload}>Download Resume</button>
            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                <div style={{ width: '45%' }}>
                    <h3>Document 1</h3>
                    <Editor
                        apiKey='3gq33pyhpnc13v47yaafsogn5868lr512o1hx0pqvho0deu2'
                        value={"&lt;object type=&quot;application/pdf&quot; data=&quot;data:application/pdf;base64,JVBERi0xLjUKJYCBgoMKMSAwIG9iago8PC9GaWx0ZXIvRmxhdGVEZWNvZGUvRmlyc3QgMTQxL04gMjAvTGVuZ3==&quot;&gt;&lt;/object&gt;"}
                        init={{
                            height: 700,
                            menubar: false,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar:
                                'undo redo | formatselect | bold italic backcolor | \
                                alignleft aligncenter alignright alignjustify | \
                                bullist numlist outdent indent | removeformat | help'
                        }}
                        onEditorChange={handleEditorChange}
                    />
                </div>
                <div style={{ width: '45%' }}>
                    <h3>Document 2</h3>
                    <Editor
                        apiKey='3gq33pyhpnc13v47yaafsogn5868lr512o1hx0pqvho0deu2'
                        value={comparisonDocContent}
                        init={{
                            height: 700,
                            menubar: false,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar:
                                'undo redo | formatselect | bold italic backcolor | \
                                alignleft aligncenter alignright alignjustify | \
                                bullist numlist outdent indent | removeformat | help'
                        }}
                        onEditorChange={handleComparisonEditorChange}
                    />
                </div>
            </div>
            <button onClick={compareDocuments}>Compare Documents</button>
            <div dangerouslySetInnerHTML={{ __html: diffHtml }} />
        </div>
    );
};

export default EditResumeSection;