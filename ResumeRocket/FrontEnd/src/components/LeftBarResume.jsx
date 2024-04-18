import {Card, Button} from '@mui/material/';
import openAI_Icon from '../assets/openAI.jpg';
import linkIcon from '../assets/link.png';
import penToSquareIcon from '../assets/pen-to-square-solid.svg';
// import arrangeIcon from '../assets/arrange.png';
// import templatesIcon from '../assets/templates.png';
import versionIcon from '../assets/version-control.png';


import '../styles/LeftBarResume.css'



export default function LeftBarResume({handleShareDialogOpen, handleChatOpen}) {

    const onShareClick = () => {
        handleShareDialogOpen();
    }

    return (
        <Card className='leftBarResume' sx={{
            width: 'fit-content',
            marginLeft: "20px"
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
                    width: '100%',
                }}
            >
                Edit
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
                onClick={handleChatOpen}
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    padding: '10px 15px',
                    borderBottom: '1px solid black',
                    color: 'black',
                    textTransform: 'none',
                    width: '100%',
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
                    width: '100%',
                }}
            >
                Version history
            </Button>
            <Button
                variant='text'
                startIcon={<img src={linkIcon} alt="Share" />}
                onClick={onShareClick}
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    padding: '10px 15px',
                    color: 'black',
                    textTransform: 'none',
                    width: '100%',
                }}                
            >
                Share
            </Button>
        </Card>
    )
}