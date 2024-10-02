import React from 'react';

const ProjectTextArea = ({ value, onChange }) => {
    return (
        <div className="project-text-area">
            <textarea 
                value={value} 
                onChange={onChange} 
                placeholder="Enter project details here..."
                rows="10"
                cols="50"
            />
        </div>
    );
};

export default ProjectTextArea;