export function formatNewContent(portfolioContent, content) {   
    if(content.layout){
        const newContent = formatLayoutContent(portfolioContent, content);
        // console.log("layout newContent: ", newContent)
        return newContent;
    }
    if(content.component){
        const newContent = formatComponentsContent(portfolioContent, content);
        // console.log("component newContent: ", newContent)
        return newContent;
    }
}

function formatLayoutContent(portfolioContent, content) {
    if (content.layout === "basic") {
        content = 
        {
            ...content,
            section1: {
                components: []
            }
        }
    }
    else {
        content = 
        {
            ...content,
            section1: {
                components: []
            },
            section2: {
                components: []
            }
        }
    }
    return content;
}

function formatComponentsContent(portfolioContent, content) {
    if (portfolioContent.layout === "basic") {
        portfolioContent.section1.components.push(content);
        return portfolioContent.components;
    }
    // we're going to need to figure out what section it goes in here 
}