import "../../../styles/HomePage.css";
import { Tabs, Tab } from "@mui/material";
import { useState } from "react";    
import About from "./sections/About";
import TheTeam from "./sections/TheTeam";
import UserTutorial from "./sections/UserTutorial";                                                                                                 


export default function HomePage() {
    const [sectionSelected, setSectionSelected ] = useState('about');

    const handleChange = (event, newValue) => {
        setSectionSelected(newValue);
    };


    return (
        <div id="home-page-root">
                <Tabs value={sectionSelected} onChange={handleChange} aria-label="section picker for about page">
                    <Tab sx={{ fontSize: '12px'}} label="About" value="about" disableRipple />
                    <Tab sx={{ fontSize: '12px'}} label="Meet the team" value="meet the team" disableRipple />
                    <Tab sx={{ fontSize: '12px'}} label="User Tutorial" value="user tutorial" disableRipple />
                </Tabs>

                <div id='home-page-main-content'>
                    {sectionSelected === 'about' && <About />}
                    {sectionSelected === 'meet the team' && <TheTeam />}
                    {sectionSelected === 'user tutorial' && <UserTutorial />}
                </div>
        </div>
    )
}