import { useEffect, useState, useRef, useContext } from "react";
import { IpynbRenderer } from "react-ipynb-renderer";
import "react-ipynb-renderer/dist/styles/gruvboxd.css";
import { VisuallyHiddenInput } from "../../../utils/muiHelpers";
import { Button } from "@mui/material";
import { PortfolioEditContext } from "../../../context/PortfolioEditProvider";

const ChangeNotebookButton = ({fileInputRef, setIpynb, setProject, sectionIndex}) => {

    const changeNotebookInProject = (newIpynb) => {
        setProject(prevProject => {
            const updatedSections = prevProject.sections.map((section, index) => {
                if (section.type === 'jupyter' && index === sectionIndex) {
                    return { ...section, content: { ...section.content, notebook: newIpynb } };
                }
                return section;
            });
            return { ...prevProject, sections: updatedSections };
        });
    };

    return (
        <Button 
            variant="contained" 
            tabIndex={-1}
            onClick={() => fileInputRef.current.click()}
        >
            choose notebook file
            <VisuallyHiddenInput
                type="file"
                accept=".ipynb"
                multiple={false}
                ref={fileInputRef}
                onChange={(e) => {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const result = JSON.parse(e.target.result);
                        setIpynb(result);
                        changeNotebookInProject(result);
                    };
                    reader.readAsText(e.target.files[0]);
                }}
        />
        </Button>
    );
}

const themes = [
    'atomDark',
    'cb',
    'coy',
    'darcula',
    'dark',
    'duotoneDark',
    'duotoneEarth',
    'duotoneForest',
    'duotoneLight',
    'duotoneSea',
    'duotoneSpace',
    'funky',
    'ghcolors',
    'hopscotch',
    'okaidia',
    'pojoaque',
    'prism',
    'solarizedlight',
    'tomorrow',
    'twilight',
    'vscDarkPlus',
    'xonokai',
  ];

const ProjectJupyter = ({project, setProject, content, sectionIndex, styles, type}) => {
    const [theme, setTheme] = useState(null);
    const [ipynb, setIpynb] = useState(null);
    const fileInputRef = useRef(null);
    const { editMode } = useContext(PortfolioEditContext);

    useEffect(() => {
        if (content) {
            setIpynb(content.notebook);
            setTheme(content.theme);
        }
    }, [content]);

    return (
        <>

                <div className={[
                    'portfolio-jupyter-root',
                    'v-center-center',
                    ipynb ? 'has-content' : 'no-content'
                    ].join(' ')}
                >
                        {editMode && 
                            <div className='portfolio-jupyter-ctrl-buttons' style={{ height: 50, width: '95%' }}>
                                <div>
                                    Syntax theme: 
                                    <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                                        {themes.map((theme) => (
                                            <option key={theme} value={theme}>{theme}</option>
                                        ))}
                                    </select>
                                </div>
                                <ChangeNotebookButton 
                                    fileInputRef={fileInputRef} 
                                    setIpynb={setIpynb} 
                                    setProject={setProject}
                                    sectionIndex={sectionIndex}
                                />
                            </div>                        
                        }

                        {ipynb &&
                            <div className='portfolio-jupyter-container'>
                                <IpynbRenderer ipynb={ipynb} syntaxTheme={theme} />
                            </div>
                        }


                </div>
        </>
    );
};

export default ProjectJupyter;