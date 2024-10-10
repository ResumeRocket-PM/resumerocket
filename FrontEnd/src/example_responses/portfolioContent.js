import { 
    aboutExample,
    projectsPreviewExample,
    projectExample,
    experienceExample,
    educationExample
} from "./portfolioBodies.js";

import stockProfilePhoto from "../assets/user-solid-orange.svg";

// see portfolioBodies for examples of each body type

const portfolioContentExample = {
    "navbar": {
        "styles": {
            "container": {
                "display": "flex",
                "justifyContent": "flex-end",
                "alignItems": "flex-start",

                "gap": ".5rem",
            },
            "links": {
                "textDecoration": "none",
                "color": "white",
                "backgroundColor": "red"
            },
        }
    },
    "pages": {
        "about": aboutExample,
        "projectsPreview": projectsPreviewExample,
        "projects": {
            "projectsData": [
                {
                    ...projectExample
                },
                {
                    ...projectExample,
                }
            ],
            "styles": {
                "header": {
                    // "color": "white",
                    // "backgroundColor": "black"
                },
            }
        },
        "experience": experienceExample,
        "education": educationExample
    }
};

const portfolioContentDefault = {
    "navbar": {
        "styles": {
            "container": {
                "display": "flex",
                "justifyContent": "flex-end",
                "alignItems": "flex-start",
                "gap": ".5rem",
            },
            "links": {
                "textDecoration": "none",
                "color": "white",
                "backgroundColor": "red"
            },
        }
    },
    "pages": {
        "about": {
            "name": "",
            "title": "",
            "personalSummary": "",
            "profilePicture": "",
            "backgroundPicture": "", //../assets/code-background.jpg
            "contactInfo": {
            },
            "styles": {
                "contactLogos": {
                    "width": "2rem",
                    "height": "2rem",
                }
            }
        },
    }
};

const projectsDefault = {
        "projectsData": [],
        "styles": {
            "header": {
                // "color": "white",
                // "backgroundColor": "black"
            },
        }
};

const projectColumnsContentDefault = [
    {
        "title": "",
        "text": ""
    },
    {
        "title": "",
        "text": ""
    },
    {
        "title": "",
        "text": ""
    }
]


const projectDefault = {
    "name": "",
    "description": "",
    "styles": {},
    "sections": [],
};

const projectsPreviewDefault = {
    "styles": {
        "header": {
            // "color": "white",
            // "backgroundColor": "black"
        },
    }
};

// const projectPreviewDefault = {
//     "name": "",
//     "description": "",
//     "image": "",
//     "link": ""
// };

const experienceDefault = {
    "experienceList": [],
    "styles": {
        "header": {
            // "color": "white",
            // "backgroundColor": "black"
        },
    }
};

const experienceItemDefault = {
    "company": "",
    "position": "",
    "type": "",
    "description": "",
    "startDate": "",
    "endDate": ""
};

const educationDefault = {
    "educationList": [],
    "styles": {
        "header": {
            // "color": "white",
            // "backgroundColor": "black"
        },
    }
};

const educationItemDefault = {
    "schoolName": "",
    "degree": "",
    "major": "",
    "minor": "",
    "graduationDate": "",
    "courses": []   
};


export { 
    portfolioContentExample, 
    portfolioContentDefault, 
    projectsDefault, 
    projectsPreviewDefault, 
    // projectPreviewDefault, 
    projectDefault,
    projectColumnsContentDefault,

    experienceDefault,
    experienceItemDefault,
    educationDefault,
    educationItemDefault,
};