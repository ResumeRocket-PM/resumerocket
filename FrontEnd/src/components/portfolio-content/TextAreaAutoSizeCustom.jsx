import React, { useState, useEffect, useRef, useContext } from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { textareaSectionContentDefault } from '../../example_responses/portfolioContent';
import TextSizeOptionsMenu from './TextSizeOptionsMenu'; // Import the menu component
import PortfolioItemWithPopupWrapper from './PortfolioItemWithPopupWrapper';
import { PortfolioEditContext } from '../../context/PortfolioEditProvider';

const TextAreaAutoSizeCustom = ({ 
    sections, 
    setSections, 
    textAreaStyles, 
    setTextAreaStyles, 
    placeholder,
    editMode,
    changeVerticalAlign, 
    portfolioStyles
}) => {    
    const { theme } = useContext(PortfolioEditContext);

    const [isSelected, setIsSelected] = useState(false);
    const [selectedSectionIndex, setSelectedSectionIndex] = useState(null);
    const textAreaRef = useRef(null);
    const textAreaRefs = useRef([]);

    const [currentTagType, setCurrentTagType] = useState([]);
    const [tempValues, setTempValues] = useState(sections ? sections.map(section => section.text) : []);

    // useEffect(() => {
    //     setTempValues(sections?.map(section => section.text));
    // }, [sections]);

    const handleTempChange = (index, event) => {
        const newTempValues = [...tempValues];
        newTempValues[index] = event.target.value;
        setTempValues(newTempValues);
    };

    const handleTextChange = (index) => {
        const newSections = [...sections];
        newSections[index].text = tempValues[index];
        setSections(newSections);
    };

    const handleKeyPress = (index, event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            // handleTempChange(index, event);
            const newSections = [...sections];
            newSections.splice(index + 1, 0, { ...textareaSectionContentDefault });
            setSections(newSections);
            setCurrentTagType('p');

            // Focus on the new text area
            setTimeout(() => {
                if (textAreaRefs.current[index + 1]) {
                    textAreaRefs.current[index + 1].focus();
                }
            }, 0);
        }

    };

    const handleKeyDown = (index, event) => {
        if (event.key === 'Backspace' && tempValues[index] === '') {
            if (sections.length === 1) {
                return;
            }

            event.preventDefault();
            const newSections = sections.filter((_, i) => i !== index);
            setSections(newSections);
            setTempValues(newSections.map(section => section.text));

            // Focus on the previous text area
            setTimeout(() => {
                if (textAreaRefs.current[index - 1]) {
                    textAreaRefs.current[index - 1].focus();
                }
            }, 0);
        }
        // if down arrow key is pressed, focus on the next text area
        else if(event.key === 'Tab' && !event.shiftKey) {
            event.preventDefault();
            if (textAreaRefs.current[index + 1]) {
                textAreaRefs.current[index + 1].focus();
            }
        }
        // if up arrow key is pressed, focus on the previous text area
        else if(event.key === 'Tab' && event.shiftKey) {
            event.preventDefault();
            if (textAreaRefs.current[index - 1]) {
                textAreaRefs.current[index - 1].focus();
            }
        }
    };

    const handleClickTextArea = (index, event) => {
        setIsSelected(true);
        setSelectedSectionIndex(index);
        setCurrentTagType(sections[index].styles.tagType);
    };

    const handleTagTypeChange = (newTag) => {
        if (selectedSectionIndex !== null) {
            const newSections = sections.map((section, index) => {
                if (index === selectedSectionIndex) {
                    return {
                        ...section,
                        styles: {
                            ...section.styles,
                            tagType: newTag
                        }
                    };
                }
                return section;
            });
            setSections(newSections);
        }
        setCurrentTagType(newTag);
    };

    const changeTextAlign = (newAlign) => {
        // change the horizontal text align for the text area, using setTextAreaStyles
        const newStyles = { textAlign: newAlign };
        setTextAreaStyles(newStyles);
    };


    // console.log('currentTagType', currentTagType);
    // console.log('sections', sections);
    // console.log('tempValues', tempValues);
    // console.log('textAreaStyles', textAreaStyles);

    return (
        <PortfolioItemWithPopupWrapper
            popoverOpen={isSelected}
            setPopoverOpen={setIsSelected}
            popupLocation="top"
            useContentClick={true}
            // wrapperStyles={{ width: '100%' }}
            // childrenContainerStyles={{ width: '100%' }}
            popoverContent={
                <div onMouseDown={(e) => e.preventDefault()}> {/* Prevent default to keep focus on text area */}
                    <TextSizeOptionsMenu
                        fontSelected={currentTagType}
                        changeFontSize={handleTagTypeChange}
                        setPopoverOpen={setIsSelected}
                        changeTextAlign={changeTextAlign}
                        changeVerticalAlign={changeVerticalAlign}
                    />
                </div>
            }
        >
            <div
                ref={textAreaRef}
                style={{ paddingTop: '4px' }}
                className={[
                    'portfolio-textarea-container',
                    isSelected ? 'selected' : '',
                ].join(' ')}
            >
                {sections && tempValues && sections.map((section, index) => (
                    <TextareaAutosize
                        key={index}
                        ref={(el) => (textAreaRefs.current[index] = el)}
                        className={[
                            'portfolio-textarea',
                            section.styles.tagType || '',
                            textAreaStyles?.textAlign || '',
                            !editMode ? 'disabled-textarea' : '',
                        ].join(' ')}
                        style={{
                            fontSize: section.styles.fontSize,
                            fontWeight: section.styles.fontWeight,
                            color: portfolioStyles.color,
                            width: '100%',
                            border: 'none',
                            padding: '0',
                        }}
                        value={tempValues[index]}
                        onChange={(event) => handleTempChange(index, event)}
                        onBlur={() => handleTextChange(index)}
                        onKeyPress={(event) => handleKeyPress(index, event)}
                        onKeyDown={(event) => handleKeyDown(index, event)}
                        onClick={(event) => handleClickTextArea(index, event)}
                        aria-label="minimum height"
                        minRows={1}
                        placeholder={index===0 ? placeholder : ''}
                    />
                ))}
            </div>
        </PortfolioItemWithPopupWrapper>
    );
};

export default TextAreaAutoSizeCustom;