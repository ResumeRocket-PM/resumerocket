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
        "links": [
            {
                "url": "/portfolio/preview",
                "label": "About"
            },
            {
                "url": "#",
                "label": "Projects"
            },
            {
                "url": "/portfolio/preview/experience",
                "label": "Experience"
            },
            {
                "url": "#",
                "label": "Education"
            }
        ],
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
        "projects": [
            {},
            {}
        ],
        "experience": experienceExample,
        "education": educationExample
    }
};

const portfolioContentDefault = {
    "navbar": {
        "links": [
            {
                "url": "/portfolio/preview",
                "label": "About"
            },
        ],
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
        "projects": [
            {},
            {}
        ],
        "experience": experienceExample,
        "education": educationExample
    }
};


export { portfolioContentExample, portfolioContentDefault };