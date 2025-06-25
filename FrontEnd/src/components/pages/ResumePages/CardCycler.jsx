import React, { useState, useEffect, useRef } from 'react';
import { Box, Button } from '@mui/material';


const CardCycler = ({ manuallyHighlightOriginalText, classPairs, resume, displayResume, cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);
  
  useEffect(() => {
    console.log('displayResume changed:', displayResume);
  }, [displayResume]);

  useEffect(() => {
    console.log('CardCycler mounted or updated');
    if(!cards || cards.length === 0 || !resume) return;

    if (!isUpdated && classPairs && classPairs.length > 0) {
        if (prevIndex === null) {
            let replacedText = manuallyHighlightOriginalText([currentIndex]);
            if(replacedText) {
                setIsUpdated(true);
            }
            return;
        }else {
            let replacedText = manuallyHighlightOriginalText([currentIndex, prevIndex]);
            if(replacedText) {
                setIsUpdated(true);
            }
        }

    }
  }, [currentIndex, classPairs, resume, displayResume]);

  const handleNext = () => {
    setPrevIndex(currentIndex);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
    setIsUpdated(false);
  };

  const handleBack = () => {
    setPrevIndex(currentIndex);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    setIsUpdated(false);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
        <Box>
            <Button onClick={handleBack} variant="outlined" sx={{ mr: 1 }} className='base-button-colors-transparent-w-outline'>
            Back
            </Button>
            <Button onClick={handleNext} variant="contained" className='base-button-colors'>
            Next
            </Button>
        </Box>
        <Box mb={2}>
            {cards[currentIndex]}
        </Box>
    </Box>
  );
};

export default CardCycler;
