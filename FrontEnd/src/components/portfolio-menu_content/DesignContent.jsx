import { set } from 'date-fns';
import React, { useState, useEffect, useRef } from 'react';
import { ColorPicker, useColor } from 'react-color-palette';
import "react-color-palette/css";
import chroma from 'chroma-js';



const ColorItem = ({ colorType, colorValue, onColorChange, changePortfolioColors }) => {
    const [showPicker, setShowPicker] = useState(false);
    const [pickerColor, setPickerColor] = useColor(colorValue);
    const pickerRef = useRef(null);
    const [tempColor, setTempColor] = useState(colorValue);

    const handleInputChange = (event) => {
        setTempColor(event.target.value);
    };

    const handleBlur = () => {
        // setColor(tempColor);
        //use chroma to validate color
        // if (chroma.valid(tempColor)) {
        //     onColorChange(colorType, tempColor);
        // }else{
        //     onColorChange(colorType, '#INVALID!');
        // }
        onColorChange(colorType, tempColor);
        changePortfolioColors();
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            onColorChange(colorType, tempColor);
            setShowPicker(false);
        }
    };

    const handleClickOutside = (event) => {
        if (pickerRef.current && !pickerRef.current.contains(event.target)) {
            setShowPicker(false);
        }
    };

    const handleColorPickerChange = (newColor) => {
        onColorChange(colorType, newColor.hex);
    }

    // const handleColorBoxClick = () => {
    //     setShowPicker(true);
    // };   


    useEffect(() => {
        if (showPicker) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
            changePortfolioColors();
            setTempColor(colorValue);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showPicker]);
    


    // console.log('color', color);  
    console.log('tempColor', tempColor);
    console.log('colorValue', colorValue);  

    return (
        <div className='v-center-start'>
            <span style={{ marginRight: '10px' }}>{colorType}</span>
            <div className='hz-left'>
                <div
                    onClick={() => setShowPicker(true)}
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
                    value={tempColor}
                    // onChange={(e) => onTextChange(colorType, e)}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    style={{ width: '80px' }}
                />
            </div>
            {showPicker && (
                <div className="color-picker-container" ref={pickerRef} style={{marginTop: '1rem'}}>
                    <ColorPicker 
                        width={250} 
                        height={150} 
                        color={pickerColor} 
                        onChange={handleColorPickerChange}
                        hideHSV 
                        dark 
                    />
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

    // const handleTextChange = (colorType, value) => {
    //     // const value = event.target.value;
    //     if (/^#[0-9A-F]{6}$/i.test(value)) {
    //         handleColorChange(colorType, value);
    //     }
    // };

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
                    changePortfolioColors={changePortfolioColors}
                />
            ))}
        </div>
    );
};

export default DesignContent;