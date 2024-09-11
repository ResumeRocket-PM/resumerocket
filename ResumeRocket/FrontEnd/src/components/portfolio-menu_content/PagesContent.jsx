import { useState } from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';  
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ellipsisIcon from '../../assets/ellipsis-solid.svg';



const projects = ['project1', 'project2']

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} {...props} />
  ))(({ theme }) => ({
    // border: `1px solid ${theme.palette.divider}`,
    // borderRadius: '4px',
    // '& .MuiAccordion-root': {
    //     borderRadius: '4px',
    // },
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&::before': {
      display: 'none',
    }
  }));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor: 'white',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
    ...theme.applyStyles('dark', {
      backgroundColor: 'rgba(255, 255, 255, .05)',
    }),
  }));

// const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
//     // padding: theme.spacing(2),
//     // borderTop: '1px solid rgba(0, 0, 0, .125)',
//     width: '100%',

// }));

const cardStyles = {
    paddingLeft: '39px',
    '&:hover': {
        // backgroundColor: 'rgba(0, 0, 0, .03)',
        cursor: 'pointer',
    },
}

const buttonStyles = {
    backgroundColor: 'white', 
    '&:hover': {
        backgroundColor: 'lightblue',
    },

}

const possiblePages = ['Projects', 'Education', 'Experience', 'Custom'];

const PagesContent = (handlePortfolioContentChange, setSelectedPage) => {
    const [pagesAccordionExpanded, setPagesAccordionExpanded] = useState(false);
    const [userPages, setUserPages] = useState([]);
    const [addPageAnchorEl, setAddPageAnchorEl] = useState(null);
    const [optionsAnchorEl, setOptionsAnchorEl] = useState(null);

    const handleAddPageClick = (event) => {
        setAddPageAnchorEl(event.currentTarget);
    };

    const handleAddPageClose = () => {
        setAddPageAnchorEl(null);
    };

    const handleImageClick = (event) => {
        setOptionsAnchorEl(event.currentTarget);
    };

    const handleOptionsClose = () => {
        setOptionsAnchorEl(null);
    };

    const addPageOpen = Boolean(addPageAnchorEl);
    const addPageId = addPageOpen ? 'add-page-popover' : undefined;

    const optionsOpen = Boolean(optionsAnchorEl);
    const optionsId = optionsOpen ? 'options-popover' : undefined;

    return (
        <div id='portfolio-lm-pages'>
            <Button 
                startIcon={<AddIcon />} 
                sx={{...buttonStyles}} 
                onClick={handleAddPageClick}
            >
                Add Page
            </Button>
            <Popover
                id={addPageId}
                open={addPageOpen}
                anchorEl={addPageAnchorEl}
                onClose={handleAddPageClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                sx={{ marginTop: '10px' }}
                disableEnforceFocus
                disableAutoFocus
            >
                <div id='portfolio-lm-pages-addpage-options'>
                    <div className='portfolio-lm-pages-option' onClick={() => setUserPages([...userPages, 'Projects'])}>
                        <p>Projects</p>
                    </div>
                    <div className='portfolio-lm-pages-option' onClick={() => setUserPages([...userPages, 'Education'])}>
                        <p>Education</p>
                    </div>
                    <div className='portfolio-lm-pages-option' onClick={() => setUserPages([...userPages, 'Experience'])}>
                        <p>Experience</p>
                    </div>
                    <div className='portfolio-lm-pages-option' onClick={() => setUserPages([...userPages, 'Custom'])}>
                        <p>Custom</p>
                    </div>                                        
                </div>
            </Popover>

            <Card sx={{...cardStyles}}>
                <div className='portfolio-lm-user-page'>
                    <Typography>About</Typography>
                </div>
            </Card>

            <Accordion expanded={pagesAccordionExpanded} onChange={() => setPagesAccordionExpanded(!pagesAccordionExpanded)}>
                <AccordionSummary aria-controls="pages-button-content" id="pages-button-header">
                <Typography>Projects</Typography>
                </AccordionSummary>
                <MuiAccordionDetails>
                {/* <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                    sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                    sit amet blandit leo lobortis eget.
                </Typography> */}
                {projects.map((project, index) => {
                    return (
                        <div key={index} className='portfolio-lm-pages-project'>
                            <Typography>{project}</Typography>
                        </div>
                    )
                })}
                </MuiAccordionDetails>
            </Accordion> 

            {userPages.map((page, index) => (
                <Card onClick={() => setSelectedPage(page)} key={index} sx={{...cardStyles}}>
                    <div className='portfolio-lm-user-page'>
                        <Typography>{page}</Typography>
                        <img 
                            src={ellipsisIcon} 
                            alt="options" 
                            onClick={handleImageClick} 
                            style={{ cursor: 'pointer' }}
                        />
                    </div>
                </Card>
            ))}

            <Popover
                id={optionsId}
                open={optionsOpen}
                anchorEl={optionsAnchorEl}
                onClose={handleOptionsClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                sx={{ marginTop: '10px' }}
                disableEnforceFocus
                disableAutoFocus
            >
                <List>
                    <ListItem button>
                        <ListItemText primary="Option 1" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Option 2" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Delete" />
                    </ListItem>
                </List>
            </Popover>
        </div>
    );
};

export default PagesContent;