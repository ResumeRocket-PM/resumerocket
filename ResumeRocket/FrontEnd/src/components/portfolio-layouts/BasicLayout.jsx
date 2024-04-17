import "./PortfolioLayouts.css";
import { useState, useRef, useEffect } from "react";


export default function BasicLayout({children}) {

    return (
        <div id='portfolio-basic_layout' className="portfolio-basic_layout column">
            {children}
        </div>
    )
}