import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email'; 
import PhoneIcon from '@mui/icons-material/Phone';

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
        bio: 'Yinghua is a Computer Science student at the University of Utah with a strong focus on backend development and a solid foundation in computer science principles.   He is proficient in multiple programming languages, including Java, Python, C#, and JavaScript, and has expertise in developing algorithms, handling databases, and designing secure systems.   On this project, Yinghua primarily contributed to backend tasks, including developing a robust web scraping feature to extract and process data efficiently.   Additionally, he played a significant role in designing and implementing the website’s chat functionality, ensuring seamless communication and data integrity.Yinghuas diverse project experience highlights his ability to tackle complex technical challenges.  His knowledge extends to cybersecurity, where he has simulated various attacks and designed strategies to protect systems.   This blend of technical expertise and hands-on experience makes him well-equipped to handle both backend and frontend challenges effectively, while his strong understanding of computer security adds an extra layer of reliability to his work.', 
        linkedin: 'www.linkedin.com/in/yinghua-yin-b54697240', 
        resumerocket: null, 
        email: 'yinyinghua737@gmail.com', 
        phone: '3852164867', 
        github: 'Desublimation',
    },
    {
        name: 'Nathan Weston',
        image: NathanImage,
        bio: 'Nathan is a Computer Science and Information Systems double major at the University of Utah with a focus on backend development, algorithms, and service applications. In this project he primarily worked in the backend to provide API endpoints for the frontend to use, resume conversion and transfer through the app, and OpenAI integration to get job details and change suggestions. Additionally, he worked on one of the service application containers to extract job postings from certain websites. Apart from the project his personal unpublished projects include image hash comparison to find duplicate images in a set of directories using Python, a terminal password generator that can be used to convert easy to remember text into secure passwords locally in both Python and Bash, several local website to serve Multimedia  (Reflex) and inventory tracking (ASP.NET), and a local file locker for encrypting and storing files..Currently he is working as a Junior Data Engineer where he can leverage his knowledge of algorithms and data flow, and would either like to progress down the data engineering path or move into either Machine Learning or backend development to solve business problems from the backend.',
        linkedin: 'https://www.linkedin.com/in/nathan-n-weston/', 
        resumerocket: null,
        email: 'meganootsupreme@gmail.com',
        phone: '8014521941',
        github: 'meganootsupreme'
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
                                                        minWidth: 0,
                                                        maxWidth: '100%',
                                                        display: 'inline-block',
                                                        fontSize: 'clamp(8pt, 10pt, 100%)'
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
