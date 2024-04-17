import BasicLayout from "./portfolio-layouts/BasicLayout";
import Layout2 from "./portfolio-layouts/Layout2";
import Layout3 from "./portfolio-layouts/Layout3";
import Introduction from "./portfolio-content/Introduction";


function Layout({layout, children}) {
    return (
        <>
            {layout && layout === "basic" && (
                <BasicLayout>
                    {children}
                </BasicLayout>
            )}           
            {layout && layout === "2" && (
                <Layout2>
                    {children}
                </Layout2>
            )}  
            {layout && layout === "3" && (
                <Layout3>
                    {children}
                </Layout3>
            )}                                               
        </>
    )
}

function Component({key, component}) {
    return (
        <>
            {component && component.type === "introduction" && (
                <Introduction />
           )}
        </>
    )

}


export default function PortfolioContent({portfolioContent}) {
    console.log("portfolioContent:", portfolioContent);

    return (
        <>
            {portfolioContent.layout && (
                <Layout layout={portfolioContent.layout}>
                    {portfolioContent.section1.components && (
                        portfolioContent.section1.components.map((component) => {
                            console.log('component.component.type:', component.component.type)
                            return (
                                <Component key={component.component.key} component={component.component} />
                            ) 
                        })
                    )}
                </Layout>
            )}
        </>
    )
}
