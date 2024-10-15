import React from 'react';

const ImageOptions = ({ options, onSelect }) => {
    return (
        <div className="image-options">
            {options.map((option, index) => (
                <button key={index} onClick={() => onSelect(option)}>
                    {option.label}
                </button>
            ))}
        </div>
    );
};

export default ImageOptions;