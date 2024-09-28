import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
// import './ProjectSectionWrapper.css'; // Assuming you have some CSS for this component
import { PortfolioEditContext } from '../../../context/PortfolioEditProvider';
import PortfolioItemWithPopupWrapper from '../PortfolioItemWithPopupWrapper';  

const ProjectSectionWrapper = ({ children, id }) => {

    // const { handleMouseEnterPI, handleMouseLeavePI } = useContext(PortfolioEditContext);

    return (
        <div 
            id={id} 
            className="project-section"
        >
            <PortfolioItemWithPopupWrapper type="add" popupLocation="bottom">
                {children}
            </PortfolioItemWithPopupWrapper>
        </div>
    );
};

ProjectSectionWrapper.propTypes = {
    children: PropTypes.node.isRequired,
    id: PropTypes.string.isRequired,
};

export default ProjectSectionWrapper;