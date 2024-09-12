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
                "justify-content": "flex-end",
                "align-items": "flex-start",

                "gap": ".5rem",
            },
            "links": {
                "text-decoration": "none",
                "color": "white",
                "background-color": "red"
            },
        }
    },
    "pages": {
        "about": aboutExample,
        "projectsPreview": projectsPreviewExample,
        "projects": {
            "projectsData": [
                {},
                {}
            ],
            "styles": {
                "header": {
                    // "color": "white",
                    // "background-color": "black"
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
                "justify-content": "flex-end",
                "align-items": "flex-start",
                "gap": ".5rem",
            },
            "links": {
                "text-decoration": "none",
                "color": "white",
                "background-color": "red"
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
                // "background-color": "black"
            },
        }
};

const projectDefault = {
    "name": "",
    "description": "",
    "image": "",
    "video": "",
    "projectLink": "",
    "githubLink": "",
    "technologies": [],
    "features": []
};

const projectsPreviewDefault = {
    "projects": [],
    "styles": {
        "header": {
            // "color": "white",
            // "background-color": "black"
        },
    }
};

const projectPreviewDefault = {
    "name": "",
    "description": "",
    "image": "",
    "link": ""
};

const experienceDefault = {
    "experienceList": [],
    "styles": {
        "header": {
            // "color": "white",
            // "background-color": "black"
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
            // "background-color": "black"
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
    projectPreviewDefault, 
    projectDefault,
    experienceDefault,
    experienceItemDefault,
    educationDefault,
    educationItemDefault,
};