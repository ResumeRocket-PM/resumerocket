import "../../../styles/HomePage.css";
import { Tabs, Tab } from "@mui/material";
import { useState } from "react";
import About from "./sections/About";
import TheTeam from "./sections/TheTeam";
import UserTutorial from "./sections/UserTutorial";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export default function HomePage() {
    const [sectionSelected, setSectionSelected] = useState('about');

    const handleChange = (event, newValue) => {
        setSectionSelected(newValue);
    };

    const renderSection = () => {
        switch (sectionSelected) {
            case 'about':
                return <About />;
            case 'meet the team':
                return <TheTeam />;
            case 'user tutorial':
                return <UserTutorial />;
            default:
                return null;
        }
    };

    return (
        <div id="home-page-root">
            <Tabs value={sectionSelected} onChange={handleChange} aria-label="section picker for about page">
                <Tab sx={{ fontSize: '12px' }} label="About" value="about" disableRipple />
                <Tab sx={{ fontSize: '12px' }} label="Meet the team" value="meet the team" disableRipple />
                <Tab sx={{ fontSize: '12px' }} label="User Tutorial" value="user tutorial" disableRipple />
            </Tabs>

            <div id='home-page-main-content'>
                <TransitionGroup>
                    <CSSTransition
                        key={sectionSelected}
                        timeout={500}
                        classNames="fade"
                    >
                        {renderSection()}
                    </CSSTransition>
                </TransitionGroup>
            </div>
        </div>
    );
}