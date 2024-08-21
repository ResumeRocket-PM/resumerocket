// Networking: ------
// GET /api/networking/<search params>
[
    {
        "name": "John Doe",
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
            "duration": "2 years",
            "type": "<<Full-time/part-time/Internship>>",
            "startDate": "01/01/2019",
            "endDate": "01/01/2021",
            },
            {...},
        ],
        "education": [
            {
            "schoolName": "University of Utah",
            "degree": "BS",
            "major": "Computer Science",
            "minor": "Music",
            "graduationDate": "01/01/2019",
            "courses": ["Data Structures", "Algorithms", "Computer Networks"], // maybe
            },
            {...},
        ],
    },
    {
        "name": "Larry Page",
        ...
    }
];

// Account: ------
// GET /api/account/details 

// Response: the same information as the networking response, just for one user. 

{
    "name": "John Doe",
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
        "duration": "2 years",
        "type": "<<Full-time/part-time/Internship>>",
        "startDate": "01/01/2019",
        "endDate": "01/01/2021",
        },
        {...},
    ],
    "education": [
        {
        "schoolName": "University of Utah",
        "degree": "BS",
        "major": "Computer Science",
        "minor": "Music",
        "graduationDate": "01/01/2019",
        "courses": ["Data Structures", "Algorithms", "Computer Networks"], // maybe
        },
        {...},
    ],
}