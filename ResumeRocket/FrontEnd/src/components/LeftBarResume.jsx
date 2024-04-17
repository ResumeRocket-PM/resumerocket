import {Card, Button} from '@mui/material/';
import openAI_Icon from '../assets/openAI.jpg';
import linkIcon from '../assets/link.png';
import penToSquareIcon from '../assets/pen-to-square-solid.svg';
// import arrangeIcon from '../assets/arrange.png';
// import templatesIcon from '../assets/templates.png';
import versionIcon from '../assets/version-control.png';


import '../styles/LeftBarResume.css'



export default function LeftBarResume({handleShareDialogOpen}) {

    const onClick = () => {
        handleShareDialogOpen();
    }

    return (
        <Card className='leftBarResume' sx={{
            width: 'fit-content',
            }}
        >
            <Button
                variant='text'
                startIcon={<img src={penToSquareIcon} alt="Add section" />}
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    padding: '10px 15px',
                    color: 'black',
                    textTransform: 'none',
                    borderBottom: '1px solid black',
                }}
            >
                Add section
            </Button>
            {/* <Button
                variant='text'
                startIcon={<img src={arrangeIcon} alt="Rearange" />}
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    padding: '10px 15px',
                    color: 'black',
                    textTransform: 'none',
                }}
            >
                Rearange                
            </Button>
            <Button
                variant='text'
                startIcon={<img src={templatesIcon} alt="Templates" />}
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    padding: '10px 15px',
                    borderBottom: '1px solid black',
                    color: 'black',
                    textTransform: 'none',
                }}
            >
                Templates
            </Button>                                     */}
            <Button
                variant='text'
                startIcon={<img src={openAI_Icon} alt="AI assistant" />}
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    padding: '10px 15px',
                    borderBottom: '1px solid black',
                    color: 'black',
                    textTransform: 'none',
                }}
            >
                AI assistant
            </Button>
            <Button
                variant='text'
                startIcon={<img src={versionIcon} alt="Version History" />}
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    padding: '10px 15px',
                    borderBottom: '1px solid black',
                    color: 'black',
                    textTransform: 'none',
                }}
            >
                Version history
            </Button>
            <Button
                variant='text'
                startIcon={<img src={linkIcon} alt="Share" />}
                onClick={onClick}
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    padding: '10px 15px',
                    color: 'black',
                    textTransform: 'none',
                }}                
            >
                Share
            </Button>
        </Card>
    )
}