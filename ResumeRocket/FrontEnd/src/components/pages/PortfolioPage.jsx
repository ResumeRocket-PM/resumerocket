import "../../styles/PortfolioPage.css";
// import LeftBarPortfolio from "../LeftBarPortfolio.jsx";
import { Button } from '@mui/material/';
import openAI_Icon from '../../assets/openAI.jpg';
import linkIcon from '../../assets/link.png';
import penToSquareIcon from '../../assets/pen-to-square-solid.svg';
import arrangeIcon from '../../assets/arrange.png';
import templatesIcon from '../../assets/templates.png';
import { useState } from 'react';
import AddSectionContent from "../portfolio-menu_content/AddSectionContent";
import LayoutsContent from "../portfolio-menu_content/LayoutsContent";
import PortfolioContent from "../PortfolioContent";
import * as ph from "../../utils/portfolioHelpers"
import { useApi } from "../../hooks";

function LeftMenu({handleLayoutSelected, handlePortfolioContentChange}) {

    const [showPopout, setShowPopout] = useState(false);
    const [selectedButton, setSelectedButton] = useState(null);

    const menuButtonClicked = (buttonID) => {
        if (showPopout) {
            setShowPopout(false);
        } else {    
            setShowPopout(true);
        }
        setSelectedButton(buttonID);
    }



    return (
        <>
            <div id="portfolio-left_menu_buttons_container">
                <Button onClick={() => menuButtonClicked("add")} id="add_section_button" className="portfolio-left_button" sx={{ color:'black', textTransform:'none', padding: '0'}}>
                    <img src={penToSquareIcon} alt="Add section" />
                    <p>Add section</p>
                </Button>
                <Button onClick={() => menuButtonClicked("arrange")} id="arrange_button" className="portfolio-left_button" sx={{color:'black', textTransform:'none', padding: '0'}}>
                    <img src={arrangeIcon} alt="Rearange" />
                    <p>Rearange</p>
                </Button>
                <Button onClick={() => menuButtonClicked("layouts")} id="layouts_button" className="portfolio-left_button" sx={{color:'black', textTransform:'none', padding: '0'}}>
                    <img src={templatesIcon} alt="Layouts" />
                    <p>Layouts</p>
                </Button>
                <Button onClick={() => menuButtonClicked("ai")} id="ai_button" className="portfolio-left_button" sx={{color:'black', textTransform:'none', padding: '0'}}>
                    <img src={openAI_Icon} alt="OpenAI" />
                    <p>AI assistant</p>
                </Button>
                <Button onClick={() => menuButtonClicked("link")} id="share_button" className="portfolio-left_button" sx={{color:'black', textTransform:'none', padding: '0'}}>
                    <img src={linkIcon} alt="Share" />
                    <p>Share</p>
                </Button>
            </div>
            {showPopout && selectedButton === "add" && (
            <div id="portfolio-popout_section" >
                <AddSectionContent 
                    handlePortfolioContentChange={handlePortfolioContentChange}
                />
            </div>
            )}
            {showPopout && selectedButton === "layouts" && (
            <div id="portfolio-popout_section" >
                <LayoutsContent 
                    handleLayoutSelected={handleLayoutSelected} 
                    handlePortfolioContentChange={handlePortfolioContentChange}
                />
            </div>
            )}
        </>
    )
}



export default function PortfolioPage() {
    const api = useApi();

    const [selectedLayout, setSelectedLayout] = useState(null);
    const handleLayoutSelected = (layout) => {
        setSelectedLayout(layout);
    };

    const [portfolioContent, setPortfolioContent] = useState({});
    const handlePortfolioContentChange = (content) => {
        content = ph.formatNewContent(portfolioContent, content);
        api.post(
            "/portfolio", 
            { 
                ...portfolioContent,
                ...content 
            }
        );

        setPortfolioContent(prevContent => {
            // content = ph.formatNewContent(prevContent, content);
            console.log("from portfolio page, new content:", content)
            console.log("from portfolio page, prev content:", prevContent)
            return {
                ...prevContent,
                ...content
            };
        });
    };
    

    // console.log(selectedLayout)
    // console.log(newPortfolioContent)
    // console.log(portfolioContent)
    
    return (
        <div id='PortfolioPage_content'>
            <div id='portfolio_left_menu_section'>
                <LeftMenu 
                    handleLayoutSelected={handleLayoutSelected} 
                    handlePortfolioContentChange={handlePortfolioContentChange}
                />
            </div>
            <div id="portfolio-backdrop">
                <div id="portfolio-actual">
                    <PortfolioContent 
                        portfolioContent={portfolioContent}
                    />
                </div>
            </div>
        </div>
    )
}