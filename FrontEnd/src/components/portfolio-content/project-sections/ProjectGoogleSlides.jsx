import { useContext, useEffect, useState } from 'react';
import ProjectSectionWrapper from '../ProjectSectionWrapper';
import { PortfolioEditContext } from '../../../context/PortfolioEditProvider';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';


const ChangeSlidesButton = ({setSlidesUrl, setProject, sectionIndex}) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [newSlidesUrl, setNewSlidesUrl] = useState('');

    const changeSlidesInProject = (newSlidesUrl) => {
        setProject(prevProject => {
            const updatedSections = prevProject.sections.map((section, index) => {
                if (section.type === 'google slides' && index === sectionIndex) {
                    return { ...section, content: { ...section.content, slidesUrl: newSlidesUrl } };
                }
                return section;
            });
            return { ...prevProject, sections: updatedSections };
        });
    };

    return (
        <>
            <Button
                variant="contained"
                onClick={() => setDialogOpen(true)}
            >
                upload slides url
            </Button>
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogContent>
                    <div className='v-center-end' style={{gap: '1rem'}}>
                        <TextField
                            label="Google Slides URL"
                            value={newSlidesUrl}
                            onChange={(e) => setNewSlidesUrl(e.target.value)}
                            style={{width: '25rem'}}
                        />
                        <Button
                            variant="contained"
                            onClick={() => {
                                // setSlidesUrl(newSlidesUrl);
                                changeSlidesInProject(newSlidesUrl);
                                setDialogOpen(false);
                            }}
                        >
                            Save
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

const ProjectGoogleSlides = ({project, setProject, content, sectionIndex}) => {
    const { editMode } = useContext(PortfolioEditContext);
    const [slidesUrl, setSlidesUrl] = useState(null);

    useEffect(() => {
        setSlidesUrl(content.slidesUrl);
    }, [content.slidesUrl]);

    return (
        // <ProjectSectionWrapper project={project} setProject={setProject} sectionIndex={sectionIndex}>
        <>
                <div className={[
                    'portfolio-gslides-root',
                    'v-center-center',
                    slidesUrl ? 'has-content' : 'no-content'
                    ].join(' ')}
                >
                        {editMode && 
                            <div className='portfolio-google-ctrl-buttons'>
                                <ChangeSlidesButton 
                                    setSlidesUrl={setSlidesUrl}
                                    setProject={setProject}
                                    sectionIndex={sectionIndex}
                                />
                            </div>                        
                        }

                        {slidesUrl &&
                            <iframe 
                                src={slidesUrl} 
                                frameBorder="0" 
                                width="960" 
                                height="569" 
                                allowFullScreen={true} 
                                mozallowfullscreen="true" 
                                webkitallowfullscreen="true"
                            ></iframe>
                        }
                </div>    
        </>
        // </ProjectSectionWrapper>
    );
};

export default ProjectGoogleSlides;