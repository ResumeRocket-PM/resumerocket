import React, { useState } from 'react';
import {portfolioContentExample} from '../../example_responses/portfolioContent';
import {Link} from 'react-router-dom';
import '../../styles/PortfolioNavbarDefault.css';

const PortfolioNavbarDefault = ({portfolioContent}) => {
    console.log("portfolioContent:", portfolioContent); 

    const [navContent, setNavContent] = useState(portfolioContent.navbar);
    // const [pages, setPages] = useState(portfolioContent.pages);

    // useState(() => {
    //     setNavContent(portfolioContent.navbar);
    //     setPages(portfolioContent.pages);
    // }, [portfolioContent]);

    console.log("navContent:", navContent);
    // console.log("pages:", pages);

    return (
        <div id='portfolio-nav-container' style={navContent.styles.container}>
            {Object.keys(portfolioContent.pages).map((page, index) => (
                page !== 'projectsPreview' && (
                    <Link 
                        style={navContent.styles.links} 
                        key={index} 
                        to={`/portfolio/preview/${page.toLowerCase()}`}
                    >
                        {page.charAt(0).toUpperCase() + page.slice(1)}
                    </Link>
                )
            ))}
        </div>
    );
};

export default PortfolioNavbarDefault;