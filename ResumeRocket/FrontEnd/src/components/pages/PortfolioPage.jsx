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
import BasicLayout from "../portfolio-layouts/BasicLayout";


function LeftMenu() {

    const [showPopout, setShowPopout] = useState(false);
    const togglePopout = () => setShowPopout(!showPopout);

    return (
        <>
            <div id="portfolio-left_menu_buttons_container">
                <Button onClick={togglePopout} className="portfolio-left_button" sx={{ color:'black', textTransform:'none', padding: '0'}}>
                    <img src={penToSquareIcon} alt="Add section" />
                    <p>Add section</p>
                </Button>
                <Button onClick={togglePopout} className="portfolio-left_button" sx={{color:'black', textTransform:'none', padding: '0'}}>
                    <img src={arrangeIcon} alt="Rearange" />
                    <p>Rearange</p>
                </Button>
                <Button onClick={togglePopout} className="portfolio-left_button" sx={{color:'black', textTransform:'none', padding: '0'}}>
                    <img src={templatesIcon} alt="Templates" />
                    <p>Templates</p>
                </Button>
                <Button onClick={togglePopout} className="portfolio-left_button" sx={{color:'black', textTransform:'none', padding: '0'}}>
                    <img src={openAI_Icon} alt="OpenAI" />
                    <p>AI assistant</p>
                </Button>
                <Button onClick={togglePopout} className="portfolio-left_button" sx={{color:'black', textTransform:'none', padding: '0'}}>
                    <img src={linkIcon} alt="Share" />
                    <p>Share</p>
                </Button>
            </div>
            {showPopout && (
            <div id="portfolio-popout_section" >
                {/* <Button onClick={togglePopout}>Toggle Content</Button> */}

                <AddSectionContent />
            </div>
            )}
        </>
    )
}



export default function PortfolioPage() {
    return (
        <div id='PortfolioPage_content'>
            <div id='portfolio_left_menu_section'>
                <LeftMenu />
            </div>
            <div id="portfolio_backdrop">
                <div id="portfolio_actual">
                    <BasicLayout>
                        
                    </BasicLayout>
                </div>
            </div>
        </div>
    )
}