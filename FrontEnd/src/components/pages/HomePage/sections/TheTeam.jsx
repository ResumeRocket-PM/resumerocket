import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email'; // Import the Email icon
import PhoneIcon from '@mui/icons-material/Phone'; // Import the Phone icon

import "../../../../styles/HomePage.css";

import TylerImage from '../../../../assets/about/tyler.png';
import AustinImage from '../../../../assets/About/austin.png';
import YinghuaImage from '../../../../assets/About/yinghua.png';
import NathanImage from '../../../../assets/About/nathan.png';

const teamMembers = [
    {
        name: 'Tyler DeBruin',
        image: TylerImage,
        bio: 'Tyler DeBruin is a Computer Science Major at the University of Utah, where he has demonstrated a strong commitment to expanding his technical expertise across various specialized fields. Throughout his academic journey, Tyler has focused on elective tracks such as Robotics, Artificial Intelligence, Visual Computing, and Data Information. His academic journey includes courses in Natural Language Processing, Artificial Intelligence, Computer Vision, Machine Learning, and Database Systems, all of which align with his passion for cutting-edge technologies and problem-solving. Outside of school, Tyler is passionate about working on personal projects and has developed a strong proficiency in technologies like Docker, Large Language Models (such as Llama 3), and Python. He also has significant experience with the Microsoft stack, including C#, SQL, TypeScript, and Angular. Additionally, Tyler is well-versed in Apache Spark and Databricks. One day, he hopes to become a data scientist. ',
        linkedin: 'https://www.linkedin.com/in/tyler-debruin-0393b472/',
        resumerocket: null,
        email: 'tylerjdebruin@gmail.com',
        phone: '801-636-8221', 
        github: 'https://github.com/TylerDeBruin'
    },
    {
        name: 'Austin Godfrey',
        image: AustinImage,
        bio: 'Austin is a Software Development major, specializing in Web Development. He is responsible for a large amount of the frontend for this site, and is solely responsible for the portfolio editor. Other parts of the site worked on include the resume version history feature (front/back) and showing/highlighting/applying resume suggestions (frontend). A notable personal project he has worked on recently is “ActivityFinder” (name in progress). This site, using largely the same languages and frameworks as ResumeRocket, returns activity ideas for users based on parameters like “indoor/outdoor”, “duration”, and “activity level”, then shows recommendations for all of those ideas simultaneously on an interactable google map.  Though particularly experienced in frontend development, he is initially looking for a career in full stack web development. He enjoys full stack development because it offers the opportunity to work on both the user experience and the underlying systems, allowing him to create cohesive and well-rounded applications. In his free time, Austin is an avid snowboarder and enjoys mountain biking, boating, and playing guitar. ',
        linkedin: 'https://www.linkedin.com/in/austin-godfrey1560/', 
        resumerocket: null,
        email: '17agodfrey@gmail.com',
        phone: '801-803-8406',
        github: '17agodfrey'
    },
    {
        name: 'Yinghua Yin',
        image: YinghuaImage,
        bio: null,
        linkedin: null,
        resumerocket: null,
        email: null,
        phone: null,
        github: null
    },
    {
        name: 'Nathan Weston',
        image: NathanImage,
        bio: null,
        linkedin: null, 
        resumerocket: null,
        email: null,
        phone: null,
        github: null
    },
];

const TheTeam = () => {
    return (
        <section>
            <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Meet Our Team</h2>
            <Grid container spacing={4} justifyContent="center">
                {teamMembers.map((member, index) => (
                    <Grid item key={index} xs={12} sm={6} md={3}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                component="img"
                                image={member.image}
                                alt={member.name}
                                sx={{
                                    height: 200,
                                    objectFit: 'contain',
                                    width: '100%',
                                }}
                            />
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {member.name}
                                </Typography>

                                <ul style={{ paddingLeft: '20px', marginBottom: '10px' }}>
                                    {member.linkedin && (
                                        <li>
                                            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                                LinkedIn
                                            </a>
                                        </li>
                                    )}
                                    {member.resumerocket && (
                                        <li>
                                            <a href={member.resumerocket} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                                ResumeRocket
                                            </a>
                                        </li>
                                    )}
                                    {member.github && (
                                        <li>
                                            <a href={member.github} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                                GitHub
                                            </a>
                                        </li>
                                    )}

                                    {member.email && (
                                        <li>
                                            <Typography variant="body2" color="text.secondary" style={{ fontWeight: 'bold' }}>Contact:</Typography>
                                            <div style={{ display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                                                <EmailIcon sx={{ marginRight: '8px' }} />
                                                <a 
                                                    href={`mailto:${member.email}`} 
                                                    style={{ 
                                                        textDecoration: 'none', 
                                                        overflow: 'hidden', 
                                                        textOverflow: 'ellipsis', 
                                                        whiteSpace: 'nowrap', 
                                                        fontSize: '10pt', // Default font size
                                                        minWidth: 0, // Ensures text can shrink
                                                        maxWidth: '100%', // Prevents text from going out of bounds
                                                        display: 'inline-block', // Allows the element to shrink
                                                        fontSize: 'clamp(8pt, 10pt, 100%)' // Ensures a minimum font size of 8pt
                                                    }}
                                                >
                                                    {member.email}
                                                </a>
                                            </div>
                                        </li>
                                    )}

                                    {member.phone && (
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <PhoneIcon sx={{ marginRight: '8px' }} />
                                        <span>{member.phone}</span>
                                    </div>
                                    )}
                                </ul>

                                <Typography variant="body2" color="text.secondary" paragraph>
                                    {member.bio}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </section>
    );
};

export default TheTeam;
