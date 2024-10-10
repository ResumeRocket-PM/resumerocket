import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import '../styles/FilterButton.css';
import '../styles/index.css';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';
import Slider from '@mui/material/Slider';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
// import {AppStateContext} from "../../context/AppStateProvider";




const fontFamily = [
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  '"Helvetica Neue"',
  'Arial',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
].join(',');

const MenuProps = {
  PaperProps: {
    style: {
      // maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      // height: 'fit-content',
      // width: 'fit-content',
    },
  },
  disableAutoFocusItem: true,
  sx: {
    "&& .Mui-selected": {
      backgroundColor: "white"
    },
    "&& .MuiList-root": {
      paddingTop: '0px',
      paddingBottom: '0px',
    },
    "&& .MuiButtonBase-root": {
      // paddingTop: '0px',
      // paddingBottom: '0px',
      // paddingLeft: '0px',
    }
  }
};

const MenuPropsRadio = {
  PaperProps: {
    style: {
      // maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      // height: 'fit-content',
      // width: 'fit-content',
    },
  },
  disableAutoFocusItem: true,
  sx: {
    "&& .Mui-selected": {
      backgroundColor: "white"
    },
    "&& .MuiList-root": {
      paddingTop: '0px',
      paddingBottom: '0px',
    },
    "&& .MuiButtonBase-root": {
      // paddingTop: '0px',
      // paddingBottom: '0px',
      paddingLeft: '0px',
    },
    "&& .MuiMenuItem-root": {
      paddingRight: '0px',
      paddingBottom: '0px',
      minWidth: '100%',
    },
    "&& .MuiPaper-root": {
      maxWidth: '100%',
    },
  }
};

const NonHighlightedMenuItemStyles = {  
  '&&:hover': {
    backgroundColor: 'white',
  },
  '&& .MuiButtonBase-root': {
    // minWidth: '100%',
  },
  '&& .MuiFormGroup-root': {
    width: '100%',
  },
  padding: '0px',
}

const MenuItemProps = {
  '&&:hover': {
    backgroundColor: 'lightgreen',
  },
  padding: '0px',
}

function valuetext(value) {
  return `${value}`;
}

const calculateLabelWidth = (label) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  context.font = `400 14px ${fontFamily}`;
  const width = context.measureText(label).width;
  return width + 60;
};

const FilterButton = ({ label, variant, possibleValues, selectedValues, setSelectedValues }) => {
  // const {
  //   selectedDates,
  //   setSelectedDates
  // } = useContext(AppStateContext);

  const labelWidth = calculateLabelWidth(label);
  const marks = variant === 'slider' 
  ? possibleValues.filter(value => Number.isInteger(value)).map((value) => ({
      value,           // The value is a number from the possibleValues array
      label: String(value) // The label is a string representation of the value
    }))
  : [];


  const handleChange = (event) => {
    const { target: { value } } = event;
    setSelectedValues(typeof value === 'string' ? value.split(',') : value);
  };

  const handleSliderChange = (event, newValue) => {
    setSelectedValues(newValue);
  };

  const handleRadioChange = (event) => {
    setSelectedValues(event.target.value);
  };

  return (
    <div className='filter-button'>
        <FormControl size='small' sx={{minWidth: `${labelWidth}px`}}>
        <InputLabel 
              id="demo-customized-select-label" 
              shrink={false}
        >
          {label}
        </InputLabel>
        {variant === 'list' && (
          <Select
            autoWidth
            multiple
            value={selectedValues}
            renderValue={()=> ''}
            onChange={handleChange}
            MenuProps={MenuProps}
          >
          {possibleValues.map((value) => (
              <MenuItem 
                key={value} 
                value={value} 
                // MenuListProps={MenuItemProps} 
                className='internal-menu-item'
                sx={{'&&:hover': {backgroundColor: 'lightgreen'},}}
              >
                  <Checkbox  checked={selectedValues.indexOf(value) > -1}/>
                  <ListItemText primary={value} />
              </MenuItem>
          ))}
          </Select>
        )}
        {variant === 'slider' && (
            <Select
              fullWidth={true}
              MenuProps={MenuProps}
            >
              <MenuItem className={'slider-menu-item'} sx={{width: '300px', '&&:hover': {backgroundColor: 'white'}, }}>
                <Slider
                  getAriaLabel={() => 'Slider Value Range'}
                  value={selectedValues}
                  onChange={handleSliderChange}
                  valueLabelDisplay="off"
                  getAriaValueText={valuetext}
                  min={possibleValues[0]}
                  max={possibleValues[possibleValues.length - 1]}
                  marks={marks}
                  step={null}
                />            
              </MenuItem>
            </Select>
         )} 
         {variant === 'radio' && (
            <Select MenuProps={MenuProps}>
              <MenuItem 
                className={'radio-menu-item'} 
                sx={NonHighlightedMenuItemStyles} 
                selected={false}
                // MenuListProps={{ sx: { py: 0 } }
                // disableGutters={true}
              >
                <RadioGroup
                column="true"
                aria-labelledby="criteria-box-setting-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={selectedValues}
                onChange={handleRadioChange} // Update state on change
                >
                  {possibleValues.map((value) => (
                    <FormControlLabel
                    key={value}
                    value={value}
                    control={<Radio />}
                    label={label === 'Rating' ? value + '+' : value}
                    sx={{ padding: '0px', margin: '0px' }}
                    className='internal-menu-item'
                  />
                  ))}
                </RadioGroup>
              </MenuItem>
            </Select>
         )}       
        </FormControl>
    </div>
  );
};

FilterButton.propTypes = {
  label: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['list', 'slider', 'radio']).isRequired,
  possibleValues: PropTypes.array.isRequired,
  setSelectedValues: PropTypes.func.isRequired,
  children: PropTypes.node
};

export default FilterButton;
