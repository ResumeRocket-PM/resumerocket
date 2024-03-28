import "../../styles/ResumeListPage.css";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';



export default function ResumeListPage() {

    const dummyData = [
        {
            id: 1,
            appliedDate: '2022-01-01',
            company: 'Company A',
            position: 'Position A',
            status: 'Applied',
            resume: 'Link to Resume A'
        },
        {
            id: 2,
            appliedDate: '2022-01-02',
            company: 'Company B',
            position: 'Position B',
            status: 'Under Review',
            resume: 'Link to Resume B'
        },
        {
            id: 3,
            appliedDate: '2022-01-03',
            company: 'Company C',
            position: 'Position C',
            status: 'Rejected',
            resume: 'Link to Resume C'
        },
        {
            id: 4,
            appliedDate: '2022-01-04',
            company: 'Company D',
            position: 'Position D',
            status: 'Offer Extended',
            resume: 'Link to Resume D'
        }
    ];

    return (
        <div id="resume_entry_list">
            <div id="resume_entry_list_header">
                <h2>Applied date</h2>
                <h2>Company</h2>
                <h2>Position</h2>
                <h2>Status</h2>
                <h2>Resume</h2>
            </div>
            {dummyData.map((result) => ( 
                        //map over results and display each result in a card
                        <Card
                            sx={{
                                // width: { xs: '400px', sm: '400px', md: '400px', lg: '400px' }
                            }}                      
                            key={result.username}
                            style={{ cursor: 'pointer' }} // Add this style for cursor change
                        >
                            <CardContent
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between'
                                }}
                            > 
                                <Typography>
                                    {result.appliedDate}
                                </Typography>
                                <Typography>
                                    {result.company}
                                </Typography>
                                <Typography>
                                    {result.position}
                                </Typography>
                                <Typography>
                                    {result.status}
                                </Typography>
                                <Typography>
                                    {result.resume}
                                </Typography>
                            </CardContent>
                        </Card>
            ))}
        </div>
    )
}