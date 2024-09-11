import BasicLayout from "./portfolio-layouts/BasicLayout";
import Layout2 from "./portfolio-layouts/Layout2";
import Layout3 from "./portfolio-layouts/Layout3";
import AboutBody from "./portfolio-content/body/AboutBody";
import ProjectsPreviewBody from "./portfolio-content/body/ProjectsPreviewBody";
import ExperienceBody from "./portfolio-content/body/ExperienceBody";
import { ClipLoader } from 'react-spinners'; 
import { useState } from "react";



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


export default function PortfolioContent({portfolioContent, setPortfolioContent, selectedPage, editMode}) {
    console.log("portfolioContent:", portfolioContent);    
    console.log("selectedPage:", selectedPage);

    return (
        <>
            {!portfolioContent ? (
                <div style={{height: '100%'}} className='hz-center'>
                    <ClipLoader size={'15em'} color={"#123abc"} loading={!portfolioContent} />
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
                            userAbout={portfolioContent.pages.about}
                            editMode={editMode}
                            setPortfolioContent={setPortfolioContent}
                            navContent={portfolioContent.navbar}
                        />
                        {portfolioContent.pages.projectsPreview && (
                            <ProjectsPreviewBody 
                                userProjectsPreview={portfolioContent.pages.projectsPreview}
                                editMode={editMode}
                                setPortfolioContent={setPortfolioContent}
                            />
                        )}
                    </>
                )}
                {selectedPage === "Experience" && (
                    <ExperienceBody 
                        userExperience={portfolioContent.pages.experience}
                        editMode={editMode}
                        setPortfolioContent={setPortfolioContent}
                        navContent={portfolioContent.navbar}
                    />
                )}
            </>                
            )}        
        </>
    )
}
