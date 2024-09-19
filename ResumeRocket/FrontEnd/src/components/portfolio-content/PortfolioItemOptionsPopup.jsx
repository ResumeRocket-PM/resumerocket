import React from 'react';
import PropTypes from 'prop-types';
import './PortfolioItemOptionsPopup.css'; // Assuming you will have some styles

const PortfolioItemOptionsPopup = ({ options, onOptionSelect }) => {
    return (
        <div className="portfolio-item-options-popup">
            <ul>
                {options.map((option, index) => (
                    <li key={index} onClick={() => onOptionSelect(option)}>
                        {option}
                    </li>
                ))}
            </ul>
        </div>
    );
};