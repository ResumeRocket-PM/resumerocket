import { useState } from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';  
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ellipsisIcon from '../../assets/ellipsis-solid.svg';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'; // **** THIS IS ELLIPSIS ICON ****
import DeleteIcon from '@mui/icons-material/Delete';
import { 
    projectsDefault,
    projectsPreviewDefault, 
    experienceDefault, 
    educationDefault
} from '../../example_responses/portfolioContent';



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

const PagesContent = ({handlePortfolioContentChange, setSelectedPage, portfolioPages, setPortfolioContent}) => {
    const [pagesAccordionExpanded, setPagesAccordionExpanded] = useState(false);
    const [addPageAnchorEl, setAddPageAnchorEl] = useState(null);
    const [optionsAnchorEl, setOptionsAnchorEl] = useState(null);

    const handleAddPageToPortfolio = (page) => {

        let newPage = {};
        let additionalPages = {};
        switch (page) {
            case 'projects':
                newPage = projectsDefault;
                additionalPages = {
                    projectsPreview: projectsPreviewDefault,
                };
                break;
            case 'education':
                newPage = educationDefault;
                break;
            case 'experience':
                newPage = experienceDefault;
                break;
            // case 'custom':
            //     newPage = aboutDefault;
            //     break;
        }


        setPortfolioContent((prevContent) => ({
            ...prevContent,
            pages: {
                ...prevContent.pages,
                [page]: newPage,
                ...additionalPages,
            }
        }));
    }

    const handleAddPageButtonClick = (event) => {
        setAddPageAnchorEl(event.currentTarget);
    };

    const handleAddPageClose = () => {
        setAddPageAnchorEl(null);
    };

    const handlePageOptionsClick = (event) => {
        setOptionsAnchorEl(event.currentTarget);
    };

    const handleOptionsClose = () => {
        setOptionsAnchorEl(null);
    };

    const handlePageDelete = (page) => () => {
        //remove page from portfolio    
        setPortfolioContent((prevContent) => {
            const newPages = {...prevContent.pages};
            delete newPages[page];
            return {
                ...prevContent,
                pages: newPages,
            }
        });
        handleOptionsClose(); // Close the popover after deleting the page
    }

    const handlePageChange = (page) => () => {
        console.log('page:', page);
        setSelectedPage(page);
        handleOptionsClose();
    }


    const addPageOpen = Boolean(addPageAnchorEl);
    const addPageId = addPageOpen ? 'add-page-popover' : undefined;

    const optionsOpen = Boolean(optionsAnchorEl);
    const optionsId = optionsOpen ? 'options-popover' : undefined;

    return (
        <div id='portfolio-lm-pages'>
            <Button 
                startIcon={<AddIcon />} 
                sx={{...buttonStyles}} 
                onClick={handleAddPageButtonClick}
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
                    <div className='portfolio-lm-pages-option' onClick={() => handleAddPageToPortfolio('projects')}>
                        <p>Projects</p>
                    </div>
                    <div className='portfolio-lm-pages-option' onClick={() => handleAddPageToPortfolio('education')}>
                        <p>Education</p>
                    </div>
                    <div className='portfolio-lm-pages-option' onClick={() => handleAddPageToPortfolio('experience')}>
                        <p>Experience</p>
                    </div>
                    <div className='portfolio-lm-pages-option' onClick={() => handleAddPageToPortfolio('custom')}>
                        <p>Custom</p>
                    </div>                                        
                </div>
            </Popover>

            {/* <Card sx={{...cardStyles}}>
                <div className='portfolio-lm-user-page'>
                    <Typography>About</Typography>
                </div>
            </Card> */}

            {portfolioPages && Object.keys(portfolioPages).map((page, index) => (
                <div key={index}>
                    {page === 'projects' ? (
                        <Accordion expanded={pagesAccordionExpanded} onChange={() => setPagesAccordionExpanded(!pagesAccordionExpanded)}>
                            <AccordionSummary aria-controls="pages-button-content" id="pages-button-header">
                                <Typography>{page.charAt(0).toUpperCase() + page.slice(1)}</Typography>
                            </AccordionSummary>
                            <MuiAccordionDetails>
                                {Object.keys(page).map((item, idx) => (
                                    <div key={idx} className='portfolio-lm-pages-project'>
                                        <Typography>{JSON.stringify(item)}</Typography>
                                    </div>
                                ))}
                            </MuiAccordionDetails>
                        </Accordion>
                    ) : (
                        page !== 'projectsPreview' && (
                        <>
                            <Card sx={{...cardStyles}}>
                                <div className='portfolio-lm-user-page'>
                                    <Typography>{page.charAt(0).toUpperCase() + page.slice(1)}</Typography>
                                    <img 
                                        src={ellipsisIcon} 
                                        alt="options" 
                                        onClick={handlePageOptionsClick} 
                                        style={{ cursor: 'pointer' }}
                                    />
                                    {/* <IconButton
                                        sx={{ '&:hover': { backgroundColor: 'transparent' } }}
                                        onClick={() => handlePageOptionsClick(page)}
                                    >
                                        <DeleteIcon />
                                    </IconButton> */}
                                </div>
                            </Card>

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
                                    <ListItem button onClick={handlePageChange(page)}>
                                        <ListItemText primary="Go to page" />
                                    </ListItem>
                                    {page !== "about" && (
                                        <ListItem button onClick={handlePageDelete(page)}>
                                            <ListItemText primary="Delete" />
                                        </ListItem>                                        
                                    )}
                                </List>
                            </Popover>   
                        </>
                        )
                    )}
                </div>
            ))}


        </div>
    );
};

export default PagesContent;