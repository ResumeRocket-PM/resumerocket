import BasicLayout from "./portfolio-layouts/BasicLayout";
import Layout2 from "./portfolio-layouts/Layout2";
import Layout3 from "./portfolio-layouts/Layout3";
import AboutBody from "./portfolio-content/body/AboutBody";
import ProjectsPreviewBody from "./portfolio-content/body/ProjectsPreviewBody";
import ExperienceBody from "./portfolio-content/body/ExperienceBody";
import { ClipLoader } from 'react-spinners'; 
import { useState, useEffect, useContext } from "react";
import { useApi } from "../hooks";



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
    editMode, 
    previewMode = null
}) {
    // console.log("portfolioContent:", portfolioContent);    
    // console.log("selectedPage:", selectedPage);

    // const [portfolioContent, setPortfolioContent] = useState(null);
    // useState(() => {
    //     setPortfolioContent(initialPortfolioContent);
    // }, [initialPortfolioContent]);

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
                {selectedPage === "About" && (
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
                            />
                        )}
                    </>
                )}
                {selectedPage === "Experience" && (
                    <ExperienceBody 
                        editMode={editMode}
                        portfolioContent={contentToRender}
                        setPortfolioContent={setPortfolioContent}
                    />
                )}
            </>                
            )}        
        </>
    )
}
