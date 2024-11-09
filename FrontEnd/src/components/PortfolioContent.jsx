import BasicLayout from "./portfolio-layouts/BasicLayout";
import Layout2 from "./portfolio-layouts/Layout2";
import Layout3 from "./portfolio-layouts/Layout3";
import AboutBody from "./portfolio-content/body/AboutBody";
import ProjectsPreviewBody from "./portfolio-content/body/ProjectsPreviewBody";
import ExperienceBody from "./portfolio-content/body/ExperienceBody";
import ProjectBody from "./portfolio-content/body/ProjectBody";
import { ClipLoader } from 'react-spinners'; 
import { useState, useEffect, useContext, useRef } from "react";
import { useApi } from "../hooks";
import { useLocation, useParams } from "react-router-dom";
// import PortfolioItemOptionsPopup from "./portfolio-content/PortfolioItemOptionsPopup";
import { PortfolioEditContext } from "../context/PortfolioEditProvider";
import PortfolioNavbar from "./portfolio-content/PortfolioNavbar";
import "../styles/PortfolioContent.css"
import { Button } from "@mui/material";

function Layout({layout, portfolioContent}) {
    return (
        <>
            {layout && layout === "basic" && (
                <BasicLayout 
                    portfolioContent={portfolioContent}
                />
            )}           
            {layout && layout === "2" && (
                <Layout2 
                    portfolioContent={portfolioContent}                 
                />
            )}  
            {layout && layout === "3" && (
                <Layout3 
                    portfolioContent={portfolioContent}                
                />
            )}                                               
        </>
    )
}


export default function PortfolioContent({
    portfolioContent = null, 
    setPortfolioContent = null, 
    userHasNoPortfolio = false,
    selectedPage, 
    setSelectedPage,
    viewMode = null,
    handleCreatePortfolio=null,
}) {

    const { 
        editMode,
        setEditMode,
    } = useContext(PortfolioEditContext);

    const location = useLocation();
    const projectsRef = useRef(null);

    const [previewPortfolioContent, setPreviewPortfolioContent] = useState(null);
    const api = useApi();

    const {portfolioId} = useParams();

    // const contentToRender = viewMode ? previewPortfolioContent : portfolioContent;

    const [contentToRender, setContentToRender] = useState(portfolioContent);

    if(userHasNoPortfolio) {
        handleCreatePortfolio();
    }

    useEffect(() => {
        if (viewMode) {
            setContentToRender(previewPortfolioContent);
        } else {
            setContentToRender(portfolioContent);
        }
    }, [viewMode, previewPortfolioContent, portfolioContent]);

    useEffect(() => {
        if (location.state && location.state.scrollToProjects && projectsRef.current) {
            projectsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [location]);

    // useEffect(() => {
    //     if (viewMode && !previewPortfolioContent) {
    //         const fetchPortfolioContent = async () => {
    //             try {
    //                 const response = await api.get("/portfolio/details");
    //                 if (response.ok) {
    //                     const data = await response.json();
    //                     console.log("data from fetchPortfolioContent:", data);
    //                     console.log("data.result.content:", JSON.parse(data.result.content));
    //                     setPreviewPortfolioContent(JSON.parse(data.result.content));
    //                     setEditMode(false);

    //                 } else {
    //                     console.error("Failed to fetch portfolio content:", response);
    //                 }
    //             } catch (error) {
    //                 console.error("Failed to fetch portfolio content:", error);
    //             }
    //         };

    //         fetchPortfolioContent();
    //     }
    // }, [viewMode, previewPortfolioContent, api]);

    useEffect(() => {
        if (viewMode && !previewPortfolioContent) {
            const fetchPortfolioContent = async () => {
                try {
                    const response = await api.get(`/portfolio/${portfolioId}/details`);
                    if (response.ok) {
                        const data = await response.json();
                        console.log("data from fetchPortfolioContent:", data);
                        console.log("data.result.content:", JSON.parse(data.result.content));
                        setPreviewPortfolioContent(JSON.parse(data.result.content));
                        setEditMode(false);

                    } else {
                        console.error("Failed to fetch portfolio content:", response);
                    }
                } catch (error) {
                    console.error("Failed to fetch portfolio content:", error);
                }
            };

            fetchPortfolioContent();
        }
    }, [viewMode, previewPortfolioContent, api]);

    useEffect(() => {
        console.log("selectedPage changed:", selectedPage);
    }, [selectedPage]);

    console.log("selectedPage:", selectedPage); 
    // console.log("hoveredItem:", Boolean(hoveredItem));
    // console.log("popoverHovered: ", popoverHovered);
    console.log("portfolioContent:", portfolioContent);
    console.log("contentToRender:", contentToRender);
    console.log('userHasNoPortfolio:', userHasNoPortfolio);
    console.log('selectedPage:', selectedPage);

    // setHoveredItem('')

    return (
        <>

            {(
                !contentToRender ? (
                    <div style={{ height: '100%' }} className='hz-center'>
                        <ClipLoader size={'15em'} color={"#123abc"} loading={!contentToRender} />
                    </div>
                ) : (
                    <div id='portfolio-content' style={{ backgroundColor: contentToRender?.styles?.backgroundColor }}>
                        {/* {portfolioContent.layout && (
                            <Layout 
                                layout={portfolioContent.layout} 
                                portfolioContent={portfolioContent} 
                            />
                        )} */}
                        <PortfolioNavbar portfolioContent={contentToRender} setSelectedPage={setSelectedPage}/>
                        {selectedPage === "about" && (
                            <>
                                <AboutBody 
                                    userAbout={contentToRender.pages.about}
                                    editMode={editMode}
                                    portfolioContent={contentToRender}
                                    setPortfolioContent={setPortfolioContent}
                                />

                                {contentToRender.pages.projects && (
                                    <ProjectsPreviewBody 
                                        editMode={editMode}
                                        portfolioContent={contentToRender}
                                        setPortfolioContent={setPortfolioContent}
                                        setSelectedPage={setSelectedPage}
                                        projectsRef={projectsRef}
                                        viewMode={viewMode}
                                    />
                                )}
                            </>
                        )}
                        {selectedPage === "projects" && (
                            <>
                                <AboutBody 
                                    userAbout={contentToRender.pages.about}
                                    editMode={editMode}
                                    portfolioContent={contentToRender}
                                    setPortfolioContent={setPortfolioContent}
                                />

                                {contentToRender.pages.projects && (
                                    <ProjectsPreviewBody 
                                        editMode={editMode}
                                        portfolioContent={contentToRender}
                                        setPortfolioContent={setPortfolioContent}
                                        setSelectedPage={setSelectedPage}
                                        projectsRef={projectsRef}
                                        viewMode={viewMode}
                                        scrollIntoView={true}
                                    />
                                )}
                            </>
                        )}
                        {selectedPage === "experience" && (
                            <ExperienceBody 
                                editMode={editMode}
                                portfolioContent={contentToRender}
                                setPortfolioContent={setPortfolioContent}
                            />
                        )}
                        {/* if starts with project followed by a number */}
                        {/^project\d+$/.test(selectedPage) && (
                            <ProjectBody 
                                editMode={editMode}
                                portfolioContent={contentToRender}
                                setPortfolioContent={setPortfolioContent}
                                projectNum={selectedPage.slice('project'.length)}
                                viewMode={viewMode}
                            />
                        )}
                        {/* <PortfolioItemOptionsPopup/> */}
                    </div>
                )
            )}
        </>
    );
}
