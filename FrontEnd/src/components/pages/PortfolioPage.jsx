import "../../styles/PortfolioPage.css";
// import LeftBarPortfolio from "../LeftBarPortfolio.jsx";
import { Button, makeStyles } from '@mui/material/';
import openAI_Icon from '../../assets/openAI.jpg';
import linkIcon from '../../assets/link.png';
import SaveIcon from '@mui/icons-material/Save'; // Import the Save icon component
import penToSquareIcon from '../../assets/pen-to-square-solid.svg';
import arrangeIcon from '../../assets/arrange.png';
import templatesIcon from '../../assets/templates.png';
import siteMapIcon from '../../assets/sitemap-solid.svg';
import { useState, useEffect, useContext } from 'react';
import AddSectionContent from "../portfolio-menu_content/AddSectionContent";
import LayoutsContent from "../portfolio-menu_content/LayoutsContent";
import PagesContent from "../portfolio-menu_content/PagesContent";
import PortfolioContent from "../PortfolioContent";
import * as ph from "../../utils/portfolioHelpers"
import { useApi } from "../../hooks";
import {portfolioContentDefault} from "../../example_responses/portfolioContent";
import Switch from '@mui/material/Switch';
import { useNavigate } from 'react-router-dom';
import { UserInfoContext } from "../../context/UserInfoProvider";
import PortfolioStylesBar from "../portfolio-styles-bar/PortfolioStylesBar";    
import { PortfolioEditContext } from "../../context/PortfolioEditProvider";
import PaletteIcon from '@mui/icons-material/Palette';
import DesignContent from "../portfolio-menu_content/DesignContent";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';



function LeftMenu({
    handlePortfolioContentChange, 
    handleSavePortfolioContent,
    setSelectedPage,
    portfolioContent,
    setPortfolioContent,
    setShowLinkDialog
}) {

    const [showPopout, setShowPopout] = useState(false);
    const [selectedButton, setSelectedButton] = useState(null);

    const menuButtonClicked = (buttonID) => {

        if(buttonID === "save") {
            handleSavePortfolioContent();
            return;
        }

        if (buttonID === "add" || buttonID === "layouts" || buttonID === "pages" || buttonID === "design") {
            if(showPopout){
                if(selectedButton === buttonID){
                    setShowPopout(false);
                    setSelectedButton(null);
                    return;
                }
                setSelectedButton(buttonID);
                return;
            }
            setShowPopout(!showPopout); // Toggle the showPopout state
            // if (showPopout) {
            //     setShowPopout(false);
            // } else {    
            //     setShowPopout(true);
            // }
        }

        if(buttonID === "link") {
            setShowLinkDialog(true);
        }


        setSelectedButton(buttonID);
    }

    const buttonStyles = {
        '&:hover': {
            backgroundColor: 'lightgreen',
            // color: '#3c52b2',
        },
    };


    return (
        <>
            <div id="portfolio-left_menu_buttons_container">
                <Button 
                    onClick={() => menuButtonClicked("pages")} 
                    id="pages_button" classes={buttonStyles} 
                    className="portfolio-left_button" 
                    sx={{ ...buttonStyles, color:'black',
                    textTransform:'none', padding: '0',
                    }}
                >
                    <img src={siteMapIcon} alt="Pages" />
                    <p>Pages</p>
                </Button>
                <Button onClick={() => menuButtonClicked("design")} id="layouts_button" className="portfolio-left_button" sx={{...buttonStyles, color:'black', textTransform:'none', padding: '0'}}>
                    <PaletteIcon />
                    <p>Design</p>
                </Button>
                {/* <Button onClick={() => menuButtonClicked("add")} id="add_section_button" className="portfolio-left_button" sx={{ ...buttonStyles, color:'black', textTransform:'none', padding: '0'}}>
                    <img src={penToSquareIcon} alt="Add section" />
                    <p>Add section</p>
                </Button> */}
                {/* <Button onClick={() => menuButtonClicked("arrange")} id="arrange_button" className="portfolio-left_button" sx={{...buttonStyles, color:'black', textTransform:'none', padding: '0'}}>
                    <img src={arrangeIcon} alt="Rearange" />
                    <p>Rearange</p>
                </Button> */}
                {/* <Button onClick={() => menuButtonClicked("layouts")} id="layouts_button" className="portfolio-left_button" sx={{...buttonStyles, color:'black', textTransform:'none', padding: '0'}}>
                    <img src={templatesIcon} alt="Layouts" />
                    <p>Layouts</p>
                </Button> */}
                {/* <Button onClick={() => menuButtonClicked("ai")} id="ai_button" className="portfolio-left_button" sx={{...buttonStyles, color:'black', textTransform:'none', padding: '0'}}>
                    <img src={openAI_Icon} alt="OpenAI" />
                    <p>AI assistant</p>
                </Button> */}
                <Button onClick={() => menuButtonClicked("link")} id="share_button" className="portfolio-left_button" sx={{...buttonStyles, color:'black', textTransform:'none', padding: '0'}}>
                    <img src={linkIcon} alt="Share" />
                    <p>Share</p>
                </Button>
                <Button onClick={() => menuButtonClicked("save")} id="save_button" className="portfolio-left_button" sx={{...buttonStyles, color:'black', textTransform:'none', padding: '0'}}>
                    <SaveIcon />
                    <p>Save</p>
                </Button>
            </div>

            {showPopout &&
                <>
                    {selectedButton === "pages" && (
                        <div id="portfolio-popout_section" >
                            <PagesContent
                                handlePortfolioContentChange={handlePortfolioContentChange} 
                                setSelectedPage={setSelectedPage}
                                portfolioPages={portfolioContent.pages}
                                setPortfolioContent={setPortfolioContent}
                            />
                        </div>
                    )}
                    {selectedButton === "design" && (
                        <div id="portfolio-popout_section" >
                            <DesignContent
                                portfolioContent={portfolioContent}
                                setPortfolioContent={setPortfolioContent}
                            />
                        </div>
                    )}                                
                    {selectedButton === "add" && (
                        <div id="portfolio-popout_section" >
                            <AddSectionContent 
                                handlePortfolioContentChange={handlePortfolioContentChange}
                            />
                        </div>
                    )}                                                 
                </>
            }
        </>
    )
}

export default function PortfolioPage() {
    const {
        // userDetails,
        // setUserDetails,
        userPortfolioContent,
        setUserPortfolioContent
    } = useContext(UserInfoContext);

    const {
        editMode,
        setEditMode, 
        selectedPage, 
        setSelectedPage,
    } = useContext(PortfolioEditContext);

    const api = useApi();
    const navigate = useNavigate();

    const [userDetails, setUserDetails] = useState('none');

    useEffect(() => {
        if (userDetails === 'none') {
            api.get("/account/details").then(response => {
                if (response.ok) {
                    response.json().then(data => {
                        setUserDetails(data.result);
                    });
                } else {
                    console.error("Failed to get account details:", response);
                }
            });
        }
    }, [userDetails]);


    const [userHasNoPortfolio, setUserHasNoPortfolio] = useState(false);
    const [portfolioContent, setPortfolioContent] = useState();
    const [showLinkDialog, setShowLinkDialog] = useState(false);

    const handleSavePortfolioContent = () => {
        const content = portfolioContent
        // console.log("final content from handlePortfolioContentChange, stringified:", JSON.stringify(content))
        api.post(
            "/portfolio", 
            {"content": JSON.stringify(content)}
        ).then(response => {
            if (response.ok) {
                response.json().then((data) => {
                    console.log("data from post /portfolio:", data)
                    // setPortfolioContent(data.result.content);
                    alert("Portfolio saved successfully!"); // Show an alert
                });
            } else {
                console.error("Failed to update portfolio content:", response);
            }
        })        
    };

    const fetchPortfolioContent = async () => {
        try {
            const response = await api.get("/portfolio/details");
            if (response.ok) {
                const data = await response.json();
                if (data.result.content) {
                    console.log("data from fetchPortfolioContent:", data);
                    console.log("data.result.content:", JSON.parse(data.result.content));
                    setPortfolioContent(JSON.parse(data.result.content));
                } else {
                    // If no portfolio content, set default content
                    // handleCreatePortfolio();
                }
            } else {
                console.error("Failed to fetch portfolio content:", response);
            }
        } catch (error) {
            console.error("Failed to fetch portfolio content:", error);
                setUserHasNoPortfolio(true);
                setSelectedPage("about");
        }
    };

    // I think there's a better way to do this, with the .then callback and whatnot
    // (Austin)-> see pony express chats page for example, or devexpo listing users 
    useEffect(() => {
        fetchPortfolioContent();
    }, []); // Empty dependency array to only run once on mount

    const mergeAccountDetailsIntoPortfolioContent = (accountDetails) => {
        const updatedPortfolioContent = { ...portfolioContentDefault };
    
        // Update name and title
        updatedPortfolioContent.pages.about.nameAndTitle.content[0].text = `${accountDetails.firstName} ${accountDetails.lastName}`;
        updatedPortfolioContent.pages.about.nameAndTitle.content[1].text = accountDetails?.title || '';
    
        // Update profile picture
        updatedPortfolioContent.pages.about.profilePicture = accountDetails?.profilePhotoLink || '';

        // Extract and update profile picture ID
        const profilePictureId = accountDetails.profilePhotoLink?.split('/').pop();
        updatedPortfolioContent.pages.about.profilePictureId = profilePictureId || '';    
        // Update contact info
        updatedPortfolioContent.pages.about.contactInfo.email = accountDetails.email;
    
        return updatedPortfolioContent;
    };

    const handleCreatePortfolio = async () => {
        let accountDetails = null;
        try {
            const response = await api.get("/account/details"); 
            if (!response.ok) {
                throw new Error("Failed to get account details");
            }
            const data = await response.json();
            accountDetails = data.result;
            console.log("data from get account details:", data);
        } catch (error) {
            console.error("Error:", error); 
        }

        try {
            let portfolioContent = portfolioContentDefault;
            if (accountDetails) {
                portfolioContent = mergeAccountDetailsIntoPortfolioContent(accountDetails);
            }

            const response = await api.post("/portfolio", { "content": JSON.stringify(portfolioContent) });
            if (!response.ok) {
                throw new Error("Failed to set default portfolio content");
            }
            const data = await response.json();
            console.log("data from set default portfolio content:", data);
            // setPortfolioContent(JSON.parse(data.result.content));
            setUserHasNoPortfolio(false);

            await fetchPortfolioContent();
        } catch (error) {
            console.error("Error:", error);
        }
    };


    const handlePortfolioContentChange = (content) => {
        // content = ph.formatNewContent(portfolioContent, content);
        // console.log("new content from handlePortfolioContentChange:", content)
        // console.log("old content from handlePortfolioContentChange:", portfolioContent)
        // content = {
        //     ...portfolioContent,
        //     ...content
        // }
        // console.log("final content from handlePortfolioContentChange:", content)
        // // console.log("final content from handlePortfolioContentChange, stringified:", JSON.stringify(content))
        // api.post(
        //     "/portfolio", 
        //     {"content": JSON.stringify(content)}
        // ).then(response => {
        //     if (response.ok) {
        //         response.json().then((data) => {
        //             console.log("data from handlePortfolioContentChange:", data)
        //             // setPortfolioContent(data.result.content);
        //         });
        //     } else {
        //         console.error("Failed to update portfolio content:", response);
        //     }
        // })

        setPortfolioContent(prevContent => {
            // content = ph.formatNewContent(prevContent, content);
            // console.log("from portfolio page, new content:", content)
            // console.log("from portfolio page, prev content:", prevContent)
            return {
                ...prevContent,
                ...content
            };
        });
    };
    
    const handlePreviewClick = () => {
        window.open('/portfolio/preview/about');
    };

    console.log('portfolioContent', portfolioContent);
    console.log('userDetails', userDetails);    

    
    return (
        <div id='PortfolioPage-root'>
            <div id='portfolio_left_menu_section'>
                <LeftMenu 
                    handlePortfolioContentChange={handlePortfolioContentChange}
                    handleSavePortfolioContent={handleSavePortfolioContent}
                    setSelectedPage={setSelectedPage}
                    portfolioContent={portfolioContent}
                    setPortfolioContent={setPortfolioContent}
                    setShowLinkDialog={setShowLinkDialog}
                />
            </div>

            <div id="portfolio-backdrop">
                <div id='portfolio-top-right-options'>
                    <div id="portfolio-top-right-options-inner" className="hz-center">
                        {/* { !portfolioContent && (
                            <Button 
                                variant="contained" 
                                size="small"
                                onClick={handleCreatePortfolio}
                            >
                                Create Portfolio
                            </Button>
                        )} */}
                        <Button
                            variant="contained"
                            size="small"
                            onClick={handlePreviewClick}
                        >
                            See Preview
                        </Button>
                        <div className='hz-center'>
                            <p>
                                {editMode ? 'Edit Mode' : 'View Mode'}
                            </p>
                            <Switch 
                                // id="portfolio-editMode-switch"
                                // sx={{position: 'absolute', top: '1rem', right: '1rem'}}
                                checked={editMode}
                                onChange={(event) => setEditMode(event.target.checked)}
                                startdecorator={editMode ? 'Edit Mode' : 'View Mode'}
                                slotprops={{
                                    startDecorator: {
                                    sx: {
                                        minWidth: 24,
                                    },
                                    },
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* </FormControl> */}
                <div 
                    id="portfolio-actual" 
                    // style={{backgroundColor: portfolioContent?.styles?.backgroundColor}}
                >
                        <PortfolioContent 
                            portfolioContent={portfolioContent}
                            setPortfolioContent={setPortfolioContent}
                            userHasNoPortfolio={userHasNoPortfolio}
                            selectedPage={selectedPage}
                            setSelectedPage={setSelectedPage}
                            handleCreatePortfolio={handleCreatePortfolio}
                        />
                </div>
            </div>

                <Dialog open={showLinkDialog} onClose={() => setShowLinkDialog(false)}>
                    <DialogContent>
                        <TextField
                            label="Link to your portfolio"
                            value={userDetails.portfolioLink}
                            style={{width: '25rem'}}
                        />
                    </DialogContent>
                </Dialog>

        </div>
    )
}