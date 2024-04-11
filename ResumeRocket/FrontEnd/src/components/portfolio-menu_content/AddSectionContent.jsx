import "../../styles/AddSectionContent.css";


export default function AddSectionContent() {
    // const [selectedButton, setSelectedButton] = useState("");
    const buttonClicked = (e) => {
        if (e.target.id === "introduction_button") {
            console.log("Introduction button clicked");
        }else if (e.target.id === "projects_button") {
            console.log("Projects button clicked");
        }else if (e.target.id === "contact_button") {
            console.log("Contact button clicked");
        }else if (e.target.id === "jupyter_button") {
            console.log("Jupyer button clicked");
        }

        // when clicked I want a pale image of the section to follow the mouse while the mouse is down
        // once mouse is up we'll create the section in the new location
    }


    return (
    <>
        <div id="introduction_button"className="AddSection-box" onClick={buttonClicked}>
            Introduction 
        </div>
        <div id="projects_button" className="AddSection-box" onClick={buttonClicked}>
            Projects
        </div>
        <div id="contact_button" className="AddSection-box" onClick={buttonClicked}>
            Contact
        </div>
        <div id="jupyter_button" className="AddSection-box" onClick={buttonClicked}>
            Jupyter Notebook
        </div>
    </>
    )


}