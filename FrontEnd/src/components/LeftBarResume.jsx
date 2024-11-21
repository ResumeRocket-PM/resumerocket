import {Card, Button} from '@mui/material/';
import openAI_Icon from '../assets/openAI.jpg';
import '../styles/LeftBarResume.css';

export default function LeftBarResume({handleChatOpen}) {
    return (
        <Card
            className='leftBarResume'
            sx={
                {marginLeft: '1rem',}
            }
        >
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
                Resume Assistant
            </Button>
        </Card>
    )
}