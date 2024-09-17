import React from 'react';
import '../../../styles/ProjectBodyDefault.css';
import PortfolioNavbar from '../PortfolioNavbar';

const ProjectBody = ({editMode, portfolioContent, setPortfolioContent}) => {

// either pass in the project name or the project id
// idk you'll probs have to manage this from both the navbar and the left menu... 

    return (
        <div id="portfolio-project-root">
            <PortfolioNavbar portfolioContent={portfolioContent}/>
            <h1>Project Title: </h1>
            <p>This is the content of the project body.</p>
        </div>
    );
};

export default ProjectBody;