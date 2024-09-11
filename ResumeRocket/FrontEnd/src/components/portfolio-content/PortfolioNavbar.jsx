import React, { useState } from 'react';
import {portfolioContentExample} from '../../example_responses/portfolioContent';
import {Link} from 'react-router-dom';
import '../../styles/PortfolioNavbarDefault.css';

const PortfolioNavbar = ({navContent}) => {
    const [portfolioNavbar, setPortfolioNavbar] = useState(navContent);
    console.log("portfolioNavbar:", portfolioNavbar);

    return (
        <div id='portfolio-nav-container' style={portfolioNavbar.styles.container}>
            {portfolioNavbar.links.map((link, index) => (
                <Link style={portfolioNavbar.styles.links} key={index} to={link.url}>
                    {link.label}
                </Link>
            ))}
        </div>
    );
};

export default PortfolioNavbar;