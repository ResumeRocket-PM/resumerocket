import "../../styles/CreateResume.css";

import LeftBar from '../LeftBar';
import { Card, CardContent} from '@mui/material/';

export default function CreateResume() {
    return (
        <div id='CreateResume_content'>
            <div id='left_menu_section'>
                <LeftBar/>
            </div>
            <div id='resume_section'>
                <Card sx={{height:'80vh', width:'60vh'}}>
                    <CardContent>
                        pretend this is a resume okay
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}