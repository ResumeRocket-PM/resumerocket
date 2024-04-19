import "./PortfolioLayouts.css";
import { useState, useRef, useEffect } from "react";
import Component from "../Component";


export default function BasicLayout({sectionSelected, portfolioContent, isMouseDown, setIsMouseDown}) {

    // useEffect(() => {
    //     if(isMouseDown) {
    //         const onMouseUpPortfolio = () => {
    //             // setIsMouseDown(false);
    //             window.removeEventListener("mouseup", onMouseUpPortfolio);
    //             sectionSelected('section1');
    //         };
    //         window.addEventListener("mouseup", onMouseUpPortfolio);
    //         return () => { // this will only be called when the component unmounts or isMouseDown or imageSize changes
    //             // document.body.style.userSelect = ""; // Re-enable text selection
    //             window.removeEventListener("mouseup", onMouseUpPortfolio);
    //         };
    //     }
    // }, [isMouseDown, setIsMouseDown, sectionSelected]);

    // const handleMouseUp = (sectionName) => {
    //     console.log("well frigg")
    //     if (sectionSelected) {
    //         console.log("layout basic sectionName:", sectionName)
    //         sectionSelected(sectionName);
    //     }
    // };

    return (
        <div id='section1' className="portfolio-basic_layout column" >
            {portfolioContent.section1 && portfolioContent.section1.components && (
                portfolioContent.section1.components.map((component) => {
                    return (
                        <Component component={component.component} />
                    ) 
                })
            )}
        </div>
    )
}