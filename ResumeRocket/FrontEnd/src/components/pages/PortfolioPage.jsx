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
import { useState, useEffect } from 'react';
import AddSectionContent from "../portfolio-menu_content/AddSectionContent";
import LayoutsContent from "../portfolio-menu_content/LayoutsContent";
import PagesContent from "../portfolio-menu_content/PagesContent";
import PortfolioContent from "../PortfolioContent";
import * as ph from "../../utils/portfolioHelpers"
import { useApi } from "../../hooks";
import {portfolioContentExample} from "../../example_responses/portfolioContent";
import Switch from '@mui/material/Switch';
import { useNavigate } from 'react-router-dom';




function LeftMenu({
    handleLayoutSelected, 
    handlePortfolioContentChange, 
    handleSavePortfolioContent,
    setSelectedPage,
}) {

    const [showPopout, setShowPopout] = useState(false);
    const [selectedButton, setSelectedButton] = useState(null);

    const menuButtonClicked = (buttonID) => {

        if(buttonID === "save") {
            handleSavePortfolioContent();
            return;
        }

        if (buttonID === "add" || buttonID === "layouts" || buttonID === "pages") {
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
                <Button onClick={() => menuButtonClicked("pages")} id="pages_button" classes={buttonStyles} className="portfolio-left_button" sx={{ ...buttonStyles, color:'black', textTransform:'none', padding: '0'}}>
                    <img src={siteMapIcon} alt="Pages" />
                    <p>Pages</p>
                </Button>
                <Button onClick={() => menuButtonClicked("add")} id="add_section_button" className="portfolio-left_button" sx={{ ...buttonStyles, color:'black', textTransform:'none', padding: '0'}}>
                    <img src={penToSquareIcon} alt="Add section" />
                    <p>Add section</p>
                </Button>
                <Button onClick={() => menuButtonClicked("arrange")} id="arrange_button" className="portfolio-left_button" sx={{...buttonStyles, color:'black', textTransform:'none', padding: '0'}}>
                    <img src={arrangeIcon} alt="Rearange" />
                    <p>Rearange</p>
                </Button>
                <Button onClick={() => menuButtonClicked("layouts")} id="layouts_button" className="portfolio-left_button" sx={{...buttonStyles, color:'black', textTransform:'none', padding: '0'}}>
                    <img src={templatesIcon} alt="Layouts" />
                    <p>Layouts</p>
                </Button>
                <Button onClick={() => menuButtonClicked("ai")} id="ai_button" className="portfolio-left_button" sx={{...buttonStyles, color:'black', textTransform:'none', padding: '0'}}>
                    <img src={openAI_Icon} alt="OpenAI" />
                    <p>AI assistant</p>
                </Button>
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
                    {selectedButton === "layouts" && (
                        <div id="portfolio-popout_section" >
                            <LayoutsContent 
                                handleLayoutSelected={handleLayoutSelected} 
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
    const api = useApi();
    const navigate = useNavigate();

    const [selectedLayout, setSelectedLayout] = useState(null);
    const handleLayoutSelected = (layout) => {
        setSelectedLayout(layout);
    };

    const [selectedPage, setSelectedPage] = useState("About");
    const [editMode, setEditMode] = useState(true);

    const [portfolioContent, setPortfolioContent] = useState(portfolioContentExample);
    const handleSavePortfolioContent = () => {
        const content = portfolioContent
        // console.log("final content from handlePortfolioContentChange, stringified:", JSON.stringify(content))
        api.post(
            "/portfolio", 
            {"content": JSON.stringify(content)}
        ).then(response => {
            if (response.ok) {
                response.json().then((data) => {
                    console.log("data from handlePortfolioContentChange:", data)
                    // setPortfolioContent(data.result.content);
                    alert("Portfolio saved successfully!"); // Show an alert
                });
            } else {
                console.error("Failed to update portfolio content:", response);
            }
        })        
    }
    // I think there's a better way to do this, with the .then callback and whatnot
    // (Austin)-> see pony express chats page for example, or devexpo listing users 
    useEffect(() => {
        const fetchPortfolioContent = async () => {
            try {
                const response = await api.get("/portfolio/details");
                if (response.ok) {
                    response.json().then((data) => {
                        console.log("data from fetchPortfolioContent:", data)
                        console.log("data.result.content:", JSON.parse(data.result.content))
                        setPortfolioContent(JSON.parse(data.result.content));
                    });
                } else {
                    console.error("Failed to fetch portfolio content:", response);
                }
            } catch (error) {
                console.error("Failed to fetch portfolio content:", error);
            }
        };

        fetchPortfolioContent();
    }, []); // Empty dependency array to only run once on mount


    const handlePortfolioContentChange = (content) => {
        content = ph.formatNewContent(portfolioContent, content);
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
        window.open('/portfolio/preview');
    };

    // console.log(selectedLayout)
    // console.log(newPortfolioContent)
    // console.log(portfolioContent)
    
    return (
        <div id='PortfolioPage-root'>
            <div id='portfolio_left_menu_section'>
                <LeftMenu 
                    handleLayoutSelected={handleLayoutSelected} 
                    handlePortfolioContentChange={handlePortfolioContentChange}
                    handleSavePortfolioContent={handleSavePortfolioContent}
                    setSelectedPage={setSelectedPage}
                />
            </div>
            <div id="portfolio-backdrop">
                {/* <FormControl
                    orientation="horizontal"
                    sx={{ width: 300, justifyContent: 'space-between' }}    
                > */}
                <div id='portfolio-top-right-options'>
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
                            startDecorator={editMode ? 'Edit Mode' : 'View Mode'}
                            slotProps={{
                                startDecorator: {
                                sx: {
                                    minWidth: 24,
                                },
                                },
                            }}
                        />
                    </div>

                </div>

                {/* </FormControl> */}
                <div id="portfolio-actual">
                    <PortfolioContent 
                        portfolioContent={portfolioContentExample}
                        setPortfolioContent={setPortfolioContent}
                        selectedPage={selectedPage}
                        editMode={editMode}
                    />
                </div>
            </div>
        </div>
    )
}