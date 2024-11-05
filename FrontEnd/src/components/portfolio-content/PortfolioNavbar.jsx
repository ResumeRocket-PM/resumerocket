import React, { useState } from 'react';
// import {portfolioContentExample} from '../../example_responses/portfolioContent';
import {Link} from 'react-router-dom';
import '../../styles/PortfolioNavbarDefault.css';

const PortfolioNavbarDefault = ({portfolioContent}) => {
    // console.log("portfolioContent:", portfolioContent); 

    const pages = Object.keys(portfolioContent.pages).filter(page => page !== 'projectsPreview');

    const [navContent, setNavContent] = useState(portfolioContent.navbar);
    // const [pages, setPages] = useState(portfolioContent.pages);

    // useState(() => {
    //     setNavContent(portfolioContent.navbar);
    //     setPages(portfolioContent.pages);
    // }, [portfolioContent]);

    // console.log("navContent:", navContent);
    // console.log("pages:", pages);

    // console.log('portfolioContent:', portfolioContent);
    const portfolioStyles = portfolioContent.styles;
    // console.log('portfolioStyles:', portfolioStyles);

    return (
        <div id='portfolio-nav-container' style={navContent.styles.container}>
            {pages.map((page, index) => (
                page !== 'projectsPreview' && (
                    <>
                        <Link 
                            style={{
                                ...navContent.styles.links,
                                ...(portfolioStyles.linkColor && {color: portfolioStyles.linkColor}),
                            }}
                            key={index} 
                            to={`/portfolio/preview/${page.toLowerCase()}`}
                        >
                            {page.charAt(0).toUpperCase() + page.slice(1)}
                        </Link>
                        {index < pages.length - 1 && <span className="separator" style={{backgroundColor: portfolioStyles.linkColor}}></span>}                    
                    </>
                )
            ))}
        </div>
    );
};

export default PortfolioNavbarDefault;