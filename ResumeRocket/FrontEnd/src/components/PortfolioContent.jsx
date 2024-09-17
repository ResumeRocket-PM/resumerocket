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
import { useLocation } from "react-router-dom";


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
    selectedPage, 
    setSelectedPage,
    editMode, 
    previewMode = null
}) {
    // console.log("portfolioContent:", portfolioContent);    
    // console.log("selectedPage:", selectedPage);

    // const [portfolioContent, setPortfolioContent] = useState(null);
    // useState(() => {
    //     setPortfolioContent(initialPortfolioContent);
    // }, [initialPortfolioContent]);

    const location = useLocation();
    const projectsRef = useRef(null);

    useEffect(() => {
        if (location.state && location.state.scrollToProjects && projectsRef.current) {
            projectsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [location]);

    const [previewPortfolioContent, setPreviewPortfolioContent] = useState(null);
    const api = useApi();

    useEffect(() => {
        if (previewMode && !previewPortfolioContent) {
            const fetchPortfolioContent = async () => {
                try {
                    const response = await api.get("/portfolio/details");
                    if (response.ok) {
                        const data = await response.json();
                        console.log("data from fetchPortfolioContent:", data);
                        console.log("data.result.content:", JSON.parse(data.result.content));
                        setPreviewPortfolioContent(JSON.parse(data.result.content));
                    } else {
                        console.error("Failed to fetch portfolio content:", response);
                    }
                } catch (error) {
                    console.error("Failed to fetch portfolio content:", error);
                }
            };

            fetchPortfolioContent();
        }
    }, [previewMode, previewPortfolioContent, api]);

    const contentToRender = previewMode ? previewPortfolioContent : portfolioContent;

    useEffect(() => {
        console.log("selectedPage changed:", selectedPage);
    }, [selectedPage]);

    console.log("selectedPage:", selectedPage); 

    return (
        <>
            {!contentToRender ? (
                <div style={{height: '100%'}} className='hz-center'>
                    <ClipLoader size={'15em'} color={"#123abc"} loading={!contentToRender} />
                </div>
            ) : (
            <>
                {/* {portfolioContent.layout && (
                    <Layout 
                        layout={portfolioContent.layout} 
                        portfolioContent={portfolioContent} 
                    />
                )} */}
                {selectedPage === "about" && (
                    <>
                        <AboutBody 
                            userAbout={contentToRender.pages.about}
                            editMode={editMode}
                            portfolioContent={contentToRender}
                            setPortfolioContent={setPortfolioContent}
                        />
                        {contentToRender.pages.projectsPreview && (
                            <ProjectsPreviewBody 
                                editMode={editMode}
                                portfolioContent={contentToRender}
                                setPortfolioContent={setPortfolioContent}
                                setSelectedPage={setSelectedPage}
                                projectsRef={projectsRef}
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
                {selectedPage.startsWith("project") && (
                    <ProjectBody 
                        editMode={editMode}
                        portfolioContent={contentToRender}
                        setPortfolioContent={setPortfolioContent}
                        projectNum={selectedPage.slice('project'.length)}
                    />
                )}
            </>                
            )}        
        </>
    )
}
