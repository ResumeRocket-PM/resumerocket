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
    let components = null;
    if (portfolioContent.layout === "basic") {
        components = portfolioContent.section1.components;
        content.component.styles = {
            display: "flex",
            "flex-direction": "column",
            "align-items": "center",
            "justify-content": "center",
            height: "fit-content",
            width: "50%",
            padding: "10px 20px",
            backgroundColor: "tomato"
        };
        if (content.component.type === "introduction") {
            content.component.text = "Write your introduction here";
        }

        if (content.component.type === "jupyter") {
            content.component.styles.backgroundColor = "lightblue";
        }


        if (components.length === 0) {
            components.push(content);
            return portfolioContent;
        }
        for (let i = 0; i < components.length; i++) {
            console.log('new component:', content.component.position.y)
            console.log('current component:', components[i].component.position.y)
            //if content.component.position.y 
            //is less than the current component's position.y, insert the new component before the current component
            // we actually need to 
            if (content.component.position.y < components[i].component.position.y) {
                components.splice(i, 0, content);
                return portfolioContent.components;
            }
        // if we've reached the end of the loop, we need to add the new 
        // component to the end of the array
        }
        components.push(content);
        return portfolioContent.components;
    }
}