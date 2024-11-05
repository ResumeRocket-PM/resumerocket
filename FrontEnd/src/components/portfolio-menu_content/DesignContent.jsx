import React, { useState, useEffect, useRef } from 'react';
import { ColorPicker, useColor } from 'react-color-palette';
import "react-color-palette/css";


const ColorItem = ({ colorType, colorValue, onColorChange, onTextChange, changePortfolioColors }) => {
    const [showPicker, setShowPicker] = useState(false);
    const [color, setColor] = useColor(colorValue);
    const pickerRef = useRef(null);


    const handleColorChange = (newColor) => {
        setColor(newColor);
        onColorChange(colorType, newColor.hex);
    };

    const handleClickOutside = (event) => {
        if (pickerRef.current && !pickerRef.current.contains(event.target)) {
            setShowPicker(false);
        }
    };

    useEffect(() => {
        if (showPicker) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
            changePortfolioColors();
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showPicker]);
    
    // useEffect(() => {
    //     if (colorValue) {
    //         setColor({ hex: colorValue });
    //     }
    // }, [colorValue, setColor]);

    console.log('color', color);    

    return (
        <div className='v-center-start'>
            <span style={{ marginRight: '10px' }}>{colorType}</span>
            <div className='hz-left'>
                <div
                    onClick={() => setShowPicker(!showPicker)}
                    style={{
                        width: '20px',
                        height: '20px',
                        backgroundColor: colorValue,
                        border: '1px solid #000',
                        cursor: 'pointer',
                        marginRight: '10px'
                    }}
                ></div>
                <input
                    type="text"
                    value={colorValue}
                    onChange={(e) => onTextChange(colorType, e)}
                    style={{ width: '80px' }}
                />
            </div>
            {showPicker && (
                <div className="color-picker-container" ref={pickerRef}>
                    <ColorPicker width={250} height={150} color={color} onChange={handleColorChange} hideHSV dark />
                </div>
            )}
        </div>
    );
};

const DesignContent = ({portfolioContent, setPortfolioContent}) => {
    const [colors, setColors] = useState({
        background: portfolioContent.styles.backgroundColor,
        text: portfolioContent.styles.color,
        link: portfolioContent.styles.linkColor
    });

    const handleColorChange = (colorType, colorValue) => {
        setColors(prevColors => ({
            ...prevColors,
            [colorType]: colorValue
        }));
    };

    const handleTextChange = (colorType, event) => {
        const value = event.target.value;
        if (/^#[0-9A-F]{6}$/i.test(value)) {
            handleColorChange(colorType, value);
        }
    };

    const changePortfolioColors = () => {
        setPortfolioContent(prevContent => ({
            ...prevContent,
            styles: {
                ...prevContent.styles,
                backgroundColor: colors.background,
                color: colors.text,
                linkColor: colors.link
            }
        }));
    }

    console.log('colors', colors);

    return (
        <div id='portfolio-lm-design'>
            {Object.entries(colors).map(([colorType, colorValue]) => (
                <ColorItem
                    key={colorType}
                    colorType={colorType}
                    colorValue={colorValue}
                    onColorChange={handleColorChange}
                    onTextChange={handleTextChange}
                    changePortfolioColors={changePortfolioColors}
                />
            ))}
        </div>
    );
};

export default DesignContent;