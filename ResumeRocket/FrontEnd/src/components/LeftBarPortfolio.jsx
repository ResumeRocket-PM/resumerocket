import {Card, CardContent} from '@mui/material/';
import openAI_Icon from '../assets/openAI.jpg';
import linkIcon from '../assets/link.png';
import penToSquareIcon from '../assets/pen-to-square-solid.svg';
import arrangeIcon from '../assets/arrange.png';
import templatesIcon from '../assets/templates.png';


import '../styles/LeftBarPortfolio.css'



export default function LeftBarPortfolio() {
    return (
        <Card className='leftBarPortfolio' sx={{
            width: 'fit-content',
            }}
        >
            <CardContent
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 15px',
                    borderBottom: '1px solid black'
                }}
            >
                <img src={penToSquareIcon} alt="Add section" />
                <p>Add section</p>
            </CardContent>
            <CardContent
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 15px',
                    borderBottom: '1px solid black'
                }}
            >
                <img src={arrangeIcon} alt="Rearrange" />
                <p>Rearange</p>
            </CardContent>
            <CardContent
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 15px',
                    borderBottom: '1px solid black'
                }}
            >
                <img src={templatesIcon} alt="Templates" />
                <p>Templates</p>
            </CardContent>                                    
            <CardContent
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 15px',
                    borderBottom: '1px solid black'
                }}
            >
                <img src={openAI_Icon} alt="openAI logo" />
                <p>AI assistant</p>
            </CardContent>
            <CardContent
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 15px 10px 15px',
                    // paddingTop: '10px',
                    // paddingRight: '15px',
                    // paddingBottom: '10px',
                    // paddingLeft: '15px'
                }}
                id='sharePortfolio'                
            >
                <img src={linkIcon} alt="share resume" />
                <p>Share</p>
            </CardContent>
        </Card>
    )
}