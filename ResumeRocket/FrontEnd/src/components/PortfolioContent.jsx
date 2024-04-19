import BasicLayout from "./portfolio-layouts/BasicLayout";
import Layout2 from "./portfolio-layouts/Layout2";
import Layout3 from "./portfolio-layouts/Layout3";



function Layout({layout, sectionSelected, portfolioContent, isMouseDown, setIsMouseDown}) {
    return (
        <>
            {layout && layout === "basic" && (
                <BasicLayout 
                    sectionSelected={sectionSelected} 
                    portfolioContent={portfolioContent}
                    isMouseDown={isMouseDown}
                    setIsMouseDown={setIsMouseDown}
                />
            )}           
            {layout && layout === "2" && (
                <Layout2 
                    sectionSelected={sectionSelected} 
                    portfolioContent={portfolioContent}
                    isMouseDown={isMouseDown}
                    setIsMouseDown={setIsMouseDown}                    
                />
            )}  
            {layout && layout === "3" && (
                <Layout3 
                    sectionSelected={sectionSelected} 
                    portfolioContent={portfolioContent}
                    isMouseDown={isMouseDown}
                    setIsMouseDown={setIsMouseDown}                    
                />
            )}                                               
        </>
    )
}


export default function PortfolioContent({portfolioContent, sectionSelected, isMouseDown, setIsMouseDown}) {
    console.log("portfolioContent:", portfolioContent);

    return (
        <>
            {portfolioContent.layout && (
                <Layout 
                    layout={portfolioContent.layout} 
                    sectionSelected={sectionSelected} 
                    portfolioContent={portfolioContent} 
                    isMouseDown={isMouseDown} 
                    setIsMouseDown={setIsMouseDown}>

                    {/* {portfolioContent.section1.components && (
                        portfolioContent.section1.components.map((component) => {
                            return (
                                <Component component={component.component} />
                            ) 
                        })
                    )} */}
                </Layout>
            )}
        </>
    )
}
