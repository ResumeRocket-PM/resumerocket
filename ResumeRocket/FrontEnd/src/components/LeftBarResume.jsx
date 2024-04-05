import {Card, CardContent} from '@mui/material/';
import openAI_Icon from '../assets/openAI.jpg';
import linkIcon from '../assets/link.png';
import versionIcon from '../assets/version-control.png';

import '../styles/LeftBarResume.css'



export default function LeftBarResume() {
    return (
        <Card sx={{
            }}
        >
            <CardContent
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '10px',
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
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '10px',
                    borderBottom: '1px solid black'
                }}                
            >
                <img src={linkIcon} alt="share resume" />
                <p>Share</p>
            </CardContent>
            <CardContent
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '10px',
                    borderBottom: '1px solid black'
                }}
            >
                <img src={versionIcon} alt="version control" />
                <p>Version History</p>
            </CardContent>
        </Card>
    )
}