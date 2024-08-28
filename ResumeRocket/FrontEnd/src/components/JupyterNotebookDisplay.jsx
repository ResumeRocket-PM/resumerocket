// JupyterNotebookDisplay.jsx
import JupyterViewer from 'react-jupyter-notebook/dist/JupyterViewer.d.ts';
import { ClipLoader } from 'react-spinners';


const JupyterNotebookDisplay = ({ notebookData }) => {
  if (!notebookData) {
    return <div>{ClipLoader}</div>;
  }

  return (
    <div>
      <JupyterViewer rawIpynb={notebookData} />
    </div>
  );
};

export default JupyterNotebookDisplay;
