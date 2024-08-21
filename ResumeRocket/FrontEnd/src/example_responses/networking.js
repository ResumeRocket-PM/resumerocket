// Networking: ------
// GET /api/networking/<search params>
const exampleNetworkingGetResults = [
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
            "type": "<<Full-time/part-time/Internship>>",
            "description": "I worked on the Google Search team, where I helped improve the search algorithm.",  
            "startDate": "01/01/2019",
            "endDate": "01/01/2021",
            },
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
        ],
    },
];

// Account: ------
// GET /api/account/details 

// Response: the same information as the networking response, just for one user. 
const exampleUserDetails = {
    "name": "John Doe",
    "profilePhotoUrl": "https://us.123rf.com/450wm/tuktukdesign/tuktukdesign1805/tuktukdesign180500044/100913847-user-icon-vector-male-person-symbol-profile-circle-avatar-sign-in-flat-color-glyph-pictogram.jpg",  
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
        "type": "<<Full-time/part-time/Internship>>",
        "description": "I worked on the Google Search team, where I helped improve the search algorithm.",  
        "startDate": "01/01/2019",
        "endDate": "01/01/2021",
        },
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
    ],
}

export { exampleNetworkingGetResults, exampleUserDetails };