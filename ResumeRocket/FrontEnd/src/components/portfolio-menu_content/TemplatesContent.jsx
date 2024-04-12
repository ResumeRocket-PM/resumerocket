import "../../styles/Portfolio-LeftMenuContent.css";
import { useState } from "react";

export default function TemplatesContent({onTemplateSelected}) {

    const [selectedTemplate, setSelectedTemplate] = useState(null);

    const buttonClicked = (e) => {
        const buttonID = e.target.id;
        setSelectedTemplate(buttonID);
        if (onTemplateSelected) {
            onTemplateSelected(buttonID);
        }
    };

    


    return ( 
        <>
            <div id="template_basic_button"className="portfolio-LeftMenuBox TemplatesButton" onClick={buttonClicked}>
                 basic
            </div>
            <div id="template_2_button" className="portfolio-LeftMenuBox TemplatesButton" onClick={buttonClicked}>
                template 2
            </div>
            <div id="template_3_button" className="portfolio-LeftMenuBox TemplatesButton" onClick={buttonClicked}>
                template 3
            </div>
            <div id="template_custom_button" className="portfolio-LeftMenuBox TemplatesButton" onClick={buttonClicked}>
                custom
            </div>
        </>

    )
}