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
import TemplatesContent from "../portfolio-menu_content/LayoutsContent";
import BasicLayout from "../portfolio-layouts/BasicLayout";
import Layout2 from "../portfolio-layouts/Layout2";
import Layout3 from "../portfolio-layouts/Layout3";

function LeftMenu({onTemplateSelected}) {

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
                <Button onClick={() => menuButtonClicked("templates")} id="templates_button" className="portfolio-left_button" sx={{color:'black', textTransform:'none', padding: '0'}}>
                    <img src={templatesIcon} alt="Templates" />
                    <p>Templates</p>
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
                <AddSectionContent />
            </div>
            )}
            {showPopout && selectedButton === "templates" && (
            <div id="portfolio-popout_section" >
                <TemplatesContent onTemplateSelected={onTemplateSelected} />
            </div>
            )}
        </>
    )
}



export default function PortfolioPage() {


    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const handleTemplateSelected = (template) => {
        setSelectedTemplate(template);
    };



    console.log("selectedTemplate: ", selectedTemplate)

    return (
        <div id='PortfolioPage_content'>
            <div id='portfolio_left_menu_section'>
                <LeftMenu onTemplateSelected={handleTemplateSelected}/>
            </div>
            <div id="portfolio-backdrop">
                <div id="portfolio-actual">
                    {selectedTemplate === "layout_basic_button" && (
                        <BasicLayout />
                    )}
                    {selectedTemplate === "layout_2_button" && (
                        <Layout2 />
                    )}
                    {selectedTemplate === "layout_3_button" && (
                        <Layout3 />
                    )}
                    {selectedTemplate === "layout_custom_button" && (
                        <div>Custom template layout</div>
                    )}
                </div>
            </div>
        </div>
    )
}