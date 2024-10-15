import React from 'react';
import '../../../styles/ResumePage.css';
import { exampleResumeVersionHistoryResponse } from "../../../example_responses/resume";

const VersionHistory = ({ resume, setContentToShow }) => {

    return (
        <div>
            <div className="hz-space-btwn">
                <h2>Version History</h2>
                <p onClick={() => setContentToShow('saved-resumes')}>back</p>
            </div>
            <ul>
                {exampleResumeVersionHistoryResponse.versionHistory.map(version => (
                    <li key={version.id}>
                        <strong>{version.date}:</strong> {version.note}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VersionHistory;