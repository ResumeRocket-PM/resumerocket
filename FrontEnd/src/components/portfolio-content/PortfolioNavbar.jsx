import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/PortfolioNavbarDefault.css';
import { PortfolioEditContext } from '../../context/PortfolioEditProvider';

const PortfolioNavbarDefault = ({ portfolioContent, setSelectedPage }) => {
    const { editMode } = useContext(PortfolioEditContext);
    const navigate = useNavigate();

    const pages = Object.keys(portfolioContent.pages).filter(page => page !== 'projectsPreview');

    const [navContent, setNavContent] = useState(portfolioContent.navbar);

    const portfolioStyles = portfolioContent.styles;

    const handleClick = (page) => {
        if (editMode) {
            setSelectedPage(page);
        } else {
            navigate(`/portfolio/preview/${page.toLowerCase()}`);
        }
    };

    return (
        <div id='portfolio-nav-container' style={navContent.styles.container}>
            {pages.map((page, index) => (
                page !== 'projectsPreview' && (
                    <React.Fragment key={index}>
                        <Link 
                            style={{
                                ...navContent.styles.links,
                                ...(portfolioStyles.linkColor && { color: portfolioStyles.linkColor }),
                            }}
                            onClick={() => handleClick(page)}
                        >
                            {page.charAt(0).toUpperCase() + page.slice(1)}
                        </Link>
                        {index < pages.length - 1 && <span className="separator" style={{ backgroundColor: portfolioStyles.linkColor }}></span>}
                    </React.Fragment>
                )
            ))}
        </div>
    );
};

export default PortfolioNavbarDefault;