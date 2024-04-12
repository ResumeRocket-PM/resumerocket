import "../../styles/Portfolio-LeftMenuContent.css";
import PortfolioData from "../..";
import { useState } from "react";

export default function LayoutsContent({onTemplateSelected}) {

    const buttonClicked = (e) => {
        const buttonID = e.target.id;
        onTemplateSelected(buttonID);
        if (onTemplateSelected) {
            onTemplateSelected(buttonID);
        }
    };

    return ( 
        <>
            <div id="layout_basic_button"className="portfolio-LeftMenuBox LayoutsButton" onClick={buttonClicked}>
                 basic
            </div>
            <div id="layout_2_button" className="portfolio-LeftMenuBox LayoutsButton" onClick={buttonClicked}>
                template 2
            </div>
            <div id="layout_3_button" className="portfolio-LeftMenuBox LayoutsButton" onClick={buttonClicked}>
                template 3
            </div>
            <div id="layout_custom_button" className="portfolio-LeftMenuBox LayoutsButton" onClick={buttonClicked}>
                custom
            </div>
        </>

    )
}