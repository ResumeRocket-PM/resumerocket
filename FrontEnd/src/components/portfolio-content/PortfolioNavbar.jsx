import React, { useState, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../../styles/PortfolioNavbarDefault.css';
import { PortfolioEditContext } from '../../context/PortfolioEditProvider';

const PortfolioNavbarDefault = ({ portfolioContent, setSelectedPage, viewMode }) => {
    const { editMode } = useContext(PortfolioEditContext);
    const navigate = useNavigate();

    const pages = Object.keys(portfolioContent.pages).filter(page => page !== 'projectsPreview');
    const [navContent, setNavContent] = useState(portfolioContent.navbar);
    const portfolioStyles = portfolioContent.styles;

    const { portfolioId, projectNum } = useParams();

    const handleClick = (page) => {
        if (editMode && !viewMode) {
            setSelectedPage(page);
        } else if(viewMode) {
            navigate(`/${portfolioId}/portfolio/about`);
            // setSelectedPage('about');  
            // window.location.href = `/${portfolioId}/portfolio/about`;
        }
        else {
            navigate(`/portfolio/preview/${page.toLowerCase()}`);
        }
    };

    return (
        <div id='portfolio-nav-container' style={navContent.styles.container}>
            {pages.map((page, index) => (
                page !== 'projectsPreview' && (
                    <React.Fragment key={index}>
                        <div 
                            style={{
                                ...navContent.styles.links,
                                ...(portfolioStyles.linkColor && { color: portfolioStyles.linkColor }),
                            }}
                            onClick={() => handleClick(page)}
                            className='portfolio-nav-link'  
                        >
                            {page.charAt(0).toUpperCase() + page.slice(1)}
                        </div>
                        {index < pages.length - 1 && <span className="separator" style={{ backgroundColor: portfolioStyles.linkColor }}></span>}
                    </React.Fragment>
                )
            ))}
        </div>
    );
};

export default PortfolioNavbarDefault;