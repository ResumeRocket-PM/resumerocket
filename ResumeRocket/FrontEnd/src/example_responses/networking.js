// Account: ------
// GET /api/account/details 

// Response: the same information as the networking response, just for one user. 
const exampleUserDetails =     
{
    "name": "John Doe",
    "profilePhotoUrl": "",
    "title": "Software Engineer",
    "email": "JohnDoe@gmail.com",
    "location": "Salt Lake City, UT",
    "portfolioLink": "https://resume-rocket/u1234567/portfolio",
    "resume": "<<resume>>",
    "skills": ["Java", "Python", "C++"],
    "experience": [
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
    "education": [
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
    ]
}


// Networking: ------
// GET /api/networking/<search params>
const exampleNetworkingGetUserResults = [
    {
        "name": "John Doe",
        "profilePhotoUrl": "",
        "title": "Software Engineer",
        "email": "JohnDoe@gmail.com",
        "location": "Salt Lake City, UT",
        "portfolioLink": "https://resume-rocket/u1234567/portfolio",
        "resume": "<<resume>>",
        "skills": ["Java", "Python", "C++"],
        "experience": [
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
        "education": [
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
        ]
    },     
    {
        "name": "Jane Smith",
        "profilePhotoUrl": "",
        "title": "Data Scientist",
        "email": "JaneSmith@gmail.com",
        "location": "New York, NY",
        "portfolioLink": "https://resume-rocket/u1234568/portfolio",
        "resume": "<<resume>>",
        "skills": ["Python", "R", "SQL"],
        "experience": [
            {
            "company": "Facebook",
            "position": "Data Scientist",
            "type": "<<Full-time/part-time/Internship>>",
            "description": "I worked on the data analysis team, where I helped improve data-driven decision making.",  
            "startDate": "02/01/2018",
            "endDate": "02/01/2020",
            },
        ],
        "education": [
            {
            "schoolName": "Harvard University",
            "degree": "MS",
            "major": "Data Science",
            "minor": "Statistics",
            "graduationDate": "02/01/2018",
            "courses": ["Machine Learning", "Data Mining", "Big Data"], // maybe
            },
        ],
    },
    // Add 8 more user objects with unique details
    {
        "name": "Alice Johnson",
        "profilePhotoUrl": "",
        "title": "Product Manager",
        "email": "AliceJohnson@gmail.com",
        "location": "San Francisco, CA",
        "portfolioLink": "https://resume-rocket/u1234569/portfolio",
        "resume": "<<resume>>",
        "skills": ["Product Management", "Agile", "Scrum"],
        "experience": [
            {
            "company": "Apple",
            "position": "Product Manager",
            "type": "<<Full-time/part-time/Internship>>",
            "description": "I worked on the product development team, where I helped launch new products.",  
            "startDate": "03/01/2017",
            "endDate": "03/01/2019",
            },
        ],
        "education": [
            {
            "schoolName": "Stanford University",
            "degree": "MBA",
            "major": "Business Administration",
            "minor": "Marketing",
            "graduationDate": "03/01/2017",
            "courses": ["Product Management", "Marketing Strategy", "Business Analytics"], // maybe
            },
        ],
    },
    {
        "name": "Bob Brown",
        "profilePhotoUrl": "",
        "title": "UX Designer",
        "email": "BobBrown@gmail.com",
        "location": "Austin, TX",
        "portfolioLink": "https://resume-rocket/u1234570/portfolio",
        "resume": "<<resume>>",
        "skills": ["UX Design", "UI Design", "Prototyping"],
        "experience": [
            {
            "company": "Microsoft",
            "position": "UX Designer",
            "type": "<<Full-time/part-time/Internship>>",
            "description": "I worked on the UX design team, where I helped improve user interfaces.",  
            "startDate": "04/01/2016",
            "endDate": "04/01/2018",
            },
        ],
        "education": [
            {
            "schoolName": "MIT",
            "degree": "BS",
            "major": "Design",
            "minor": "Human-Computer Interaction",
            "graduationDate": "04/01/2016",
            "courses": ["UX Design", "UI Design", "Prototyping"], // maybe
            },
        ],
    },
    {
        "name": "Charlie Davis",
        "profilePhotoUrl": "",
        "title": "DevOps Engineer",
        "email": "CharlieDavis@gmail.com",
        "location": "Seattle, WA",
        "portfolioLink": "https://resume-rocket/u1234571/portfolio",
        "resume": "<<resume>>",
        "skills": ["DevOps", "AWS", "Docker"],
        "experience": [
            {
            "company": "Amazon",
            "position": "DevOps Engineer",
            "type": "<<Full-time/part-time/Internship>>",
            "description": "I worked on the DevOps team, where I helped improve deployment processes.",  
            "startDate": "05/01/2015",
            "endDate": "05/01/2017",
            },
        ],
        "education": [
            {
            "schoolName": "University of Washington",
            "degree": "MS",
            "major": "Computer Science",
            "minor": "Cloud Computing",
            "graduationDate": "05/01/2015",
            "courses": ["Cloud Computing", "DevOps", "Distributed Systems"], // maybe
            },
        ],
    },
    {
        "name": "David Evans",
        "profilePhotoUrl": "",
        "title": "Cybersecurity Analyst",
        "email": "DavidEvans@gmail.com",
        "location": "Chicago, IL",
        "portfolioLink": "https://resume-rocket/u1234572/portfolio",
        "resume": "<<resume>>",
        "skills": ["Cybersecurity", "Network Security", "Penetration Testing"],
        "experience": [
            {
            "company": "IBM",
            "position": "Cybersecurity Analyst",
            "type": "<<Full-time/part-time/Internship>>",
            "description": "I worked on the cybersecurity team, where I helped improve network security.",  
            "startDate": "06/01/2014",
            "endDate": "06/01/2016",
            },
        ],
        "education": [
            {
            "schoolName": "University of Chicago",
            "degree": "BS",
            "major": "Cybersecurity",
            "minor": "Information Technology",
            "graduationDate": "06/01/2014",
            "courses": ["Network Security", "Penetration Testing", "Cryptography"], // maybe
            },
        ],
    },
    {
        "name": "Eve Foster",
        "profilePhotoUrl": "",
        "title": "Machine Learning Engineer",
        "email": "EveFoster@gmail.com",
        "location": "Boston, MA",
        "portfolioLink": "https://resume-rocket/u1234573/portfolio",
        "resume": "<<resume>>",
        "skills": ["Machine Learning", "Deep Learning", "TensorFlow"],
        "experience": [
            {
            "company": "Tesla",
            "position": "Machine Learning Engineer",
            "type": "<<Full-time/part-time/Internship>>",
            "description": "I worked on the machine learning team, where I helped improve autonomous driving algorithms.",  
            "startDate": "07/01/2013",
            "endDate": "07/01/2015",
            },
        ],
        "education": [
            {
            "schoolName": "MIT",
            "degree": "PhD",
            "major": "Machine Learning",
            "minor": "Artificial Intelligence",
            "graduationDate": "07/01/2013",
            "courses": ["Machine Learning", "Deep Learning", "Neural Networks"], // maybe
            },
        ],
    },
    {
        "name": "Frank Green",
        "profilePhotoUrl": "",
        "title": "Blockchain Developer",
        "email": "FrankGreen@gmail.com",
        "location": "Denver, CO",
        "portfolioLink": "https://resume-rocket/u1234574/portfolio",
        "resume": "<<resume>>",
        "skills": ["Blockchain", "Ethereum", "Smart Contracts"],
        "experience": [
            {
            "company": "Consensys",
            "position": "Blockchain Developer",
            "type": "<<Full-time/part-time/Internship>>",
            "description": "I worked on the blockchain development team, where I helped develop smart contracts.",  
            "startDate": "08/01/2012",
            "endDate": "08/01/2014",
            },
        ],
        "education": [
            {
            "schoolName": "University of Colorado",
            "degree": "BS",
            "major": "Computer Science",
            "minor": "Blockchain Technology",
            "graduationDate": "08/01/2012",
            "courses": ["Blockchain", "Cryptography", "Smart Contracts"], // maybe
            },
        ],
    },
    {
        "name": "Grace Harris",
        "profilePhotoUrl": "",
        "title": "Cloud Architect",
        "email": "GraceHarris@gmail.com",
        "location": "Houston, TX",
        "portfolioLink": "https://resume-rocket/u1234575/portfolio",
        "resume": "<<resume>>",
        "skills": ["Cloud Architecture", "AWS", "Azure"],
        "experience": [
            {
            "company": "Oracle",
            "position": "Cloud Architect",
            "type": "<<Full-time/part-time/Internship>>",
            "description": "I worked on the cloud architecture team, where I helped design cloud solutions.",  
            "startDate": "09/01/2011",
            "endDate": "09/01/2013",
            },
        ],
        "education": [
            {
            "schoolName": "Rice University",
            "degree": "MS",
            "major": "Cloud Computing",
            "minor": "Information Technology",
            "graduationDate": "09/01/2011",
            "courses": ["Cloud Computing", "Distributed Systems", "Network Security"], // maybe
            },
        ],
    },
    {
        "name": "Henry Johnson",
        "profilePhotoUrl": "",
        "title": "Full Stack Developer",
        "email": "HenryJohnson@gmail.com",
        "location": "Los Angeles, CA",
        "portfolioLink": "https://resume-rocket/u1234576/portfolio",
        "resume": "<<resume>>",
        "skills": ["Full Stack Development", "JavaScript", "React"],
        "experience": [
            {
            "company": "Netflix",
            "position": "Full Stack Developer",
            "type": "<<Full-time/part-time/Internship>>",
            "description": "I worked on the full stack development team, where I helped develop web applications.",  
            "startDate": "10/01/2010",
            "endDate": "10/01/2012",
            },
        ],
        "education": [
            {
            "schoolName": "UCLA",
            "degree": "BS",
            "major": "Computer Science",
            "minor": "Web Development",
            "graduationDate": "10/01/2010",
            "courses": ["Web Development", "JavaScript", "React"], // maybe
            },
        ],
    },
];


export { exampleNetworkingGetUserResults, exampleUserDetails };