import profilePic from '../assets/kermit-profile-pic.jpg';
import codeBackground from '../assets/portfolio/coding-background.jpg';



const aboutExample = 
{
    "name": "John Doe",
    "title": "Software Engineer",
    "personalSummary": "I am a software engineer with 5 years of experience in the field. I have worked on a variety of projects, including web applications, mobile apps, and backend services. I am passionate about technology and always looking for new challenges to tackle.",
    "profilePicture": profilePic,
    "backgroundPicture": codeBackground, //../assets/code-background.jpg
    "contactInfo": {
        "email": "coolemail.gmail.com",
        "instagram": "john_doe",
        "linkedin": "john117",
        "github": "bigjohn",
        "twitter": "bigjohn",
        "facebook": "bigjohn",
        "discord": "bigjohn"
    },
    "styles": {
        "contactLogos": {
            "width": "2rem",
            "height": "2rem",
        }
    }
}

const projectsPreviewExample = 
{
    "projects": [
        {
            "name": "Project 1",
            "description": "This is a description of project 1.",
            "image": "https://example.com/project1.jpg",
            "link": "https://example.com/project1"
        },
        {
            "name": "Project 2",
            "description": "This is a description of project 2.",
            "image": "https://example.com/project2.jpg",
            "link": "https://example.com/project2"
        }
    ],
    "stlyes": {
        "header": {
            // "color": "white",
            // "background-color": "black"
        },
    }
}

const projectExample = 
{
    "name": "Project 1",
    "description": "This is a description of project 1.",
    "projectLink": "https://example.com/project1",
    "githubLink": "",
    "styles": {},
    "sections": [
        {
            "type": "about",
            "content": {
                "overview": "This is an overview section.",
                "goal": "This is a goal section.",
                "role": "This is a role section.",
                "tools": "This is a tools section.",
                "team": "This is a team section.",
                "timeline": "This is a timeline section.",
                "features": [
                    "Feature 1",
                    "Feature 2",
                    "Feature 3"
                ],
            },
            "styles": {}
        },
        {
            "type": "text area",
            "content": "This is a text area section.",
            "styles": {}
        },
        {
            "type": "image and text",
            "content": {
                "image": "https://example.com/image1.jpg",
                "text": "This is an image and text section."
            },
            "styles": {}
        },
        {
            "type": "video",
            "content": "https://example.com/video1.mp4",
            "styles": {}
        },
        {
            "type": "image",
            "content": "https://example.com/image2.jpg",
            "styles": {}
        },
        {
            "type": "gallery",
            "content": [
                "https://example.com/image3.jpg",
                "https://example.com/image4.jpg",
                "https://example.com/image5.jpg"
            ],
            "styles": {}
        },
        {
            "type": "figma",
            "content": "https://example.com/figma1",
            "styles": {}
        },
        {
            "type": "jupyter",
            "content": "https://example.com/jupyter1",
            "styles": {}
        },
        {
            "type": "google slides",
            "content": "https://example.com/googleslides1",
            "styles": {}
        },
        {
            "type": "website preview",
            "content": "https://example.com/website1",
            "styles": {}
        },
        {
            "type": "columns",
            "content": [
                {
                    "title": "Column 1",
                    "text": "This is column 1."
                },
                {
                    "title": "Column 2",
                    "text": "This is column 2."
                }
            ],
            "styles": {}
        }
    ],
}

const experienceExample = 
{
    "experienceList": [
        {
            "company": "Google",
            "position": "Software Engineer",
            "type": "Full-time",
            "description": "I worked on the Google Search team, where I helped improve the search algorithm.",
            "startDate": "01/01/2019",
            "endDate": "01/01/2021"
        },
        {
            "company": "Microsoft",
            "position": "Software Engineer",
            "type": "Full-time",
            "description": "I developed features for Microsoft Azure, focusing on cloud storage solutions.",
            "startDate": "02/01/2021",
            "endDate": "12/31/2022"
        },
        {
            "company": "Amazon",
            "position": "Software Development Intern",
            "type": "Internship",
            "description": "I worked with the AWS team, contributing to the development of serverless computing services.",
            "startDate": "05/01/2018",
            "endDate": "08/31/2018"
        }
    ], 
    "styles": {
        "header": {
            // "color": "white",
            // "background-color": "black"
        },
    }
}


const educationExample = 
{
    "educationList": [
        {
            "schoolName": "University of Utah",
            "degree": "BS",
            "major": "Computer Science",
            "minor": "Music",
            "graduationDate": "05/01/2019",
            "courses": ["Data Structures", "Algorithms", "Computer Networks"]
        },
        {
            "schoolName": "Stanford University",
            "degree": "MS",
            "major": "Computer Science",
            "minor": "",
            "graduationDate": "06/01/2021",
            "courses": ["Machine Learning", "Advanced Algorithms", "Distributed Systems"]
        },
        {
            "schoolName": "MIT",
            "degree": "PhD",
            "major": "Artificial Intelligence",
            "minor": "Neuroscience",
            "graduationDate": "08/01/2023",
            "courses": ["Deep Learning", "Neural Networks", "Cognitive Computing"]
        }
    ], 
    "styles": {
        "header": {
            // "color": "white",
            // "background-color": "black"
        },
    }
}


export { aboutExample, projectsPreviewExample, projectExample, experienceExample, educationExample };

