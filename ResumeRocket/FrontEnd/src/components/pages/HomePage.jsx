import "../../styles/HomePage.css";
import JupyterNotebookDisplay from "../JupyterNotebookDisplay";
import basicNB from "../../notebooks/basic.ipynb";


export default function HomePage() {
    return (
        <div id="yea">
            <h1>Home Page</h1>
            <JupyterNotebookDisplay notebookData={basicNB} />
        </div>
    )
}