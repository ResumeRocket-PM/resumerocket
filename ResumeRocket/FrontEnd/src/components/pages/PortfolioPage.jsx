import "../../styles/PortfolioPage.css";
import LeftBarPortfolio from "../LeftBarPortfolio.jsx";
import { Card, CardContent} from '@mui/material/';

export default function PortfolioPage() {
    return (
        <div id='PortfolioPage_content'>
            <div id='portfolio_left_menu_section'>
                <LeftBarPortfolio/>
            </div>
            <div id='portfolio_section'>
                <Card sx={{height:'80vh', width:'60vh'}}>
                    <CardContent>
                        portfolio goes here idk
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}