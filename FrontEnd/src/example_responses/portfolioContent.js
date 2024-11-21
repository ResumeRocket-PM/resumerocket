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

// ################  Text area defaults  #########################

const textAreaAboutContentDefault = {
    type: "text area",
    content: [
            {
                text: "Project Name",
                styles: {
                    tagType: "h1",
                },
            },
            {
                text: "Project Description",
                styles: {
                    tagType: "p",
                }
            }
        ],
    styles: {
        textAlign: "text-align-center",
    }
};


// ##########################################

const projectsDefault = {
        "projectsData": [],
        "styles": {
            "header": {
                // "color": "white",
                // "backgroundColor": "black"
            },
        }
};

const projectDefault = {
    "name": "",
    "description": "",
    "styles": {},
    // "aboutStyles": {
    //     "name": {
    //         "font": "h1",
    //         "textAlign": "text-align-center",
    //     },
    //     "description": {
    //         "font": "p",
    //         "textAlign": "text-align-center",
    //     }
    // },
    "sections": [
        textAreaAboutContentDefault,
    ],
};

const projectsPreviewDefault = {
    "projects": [],
    "styles": {
        "header": {
            // "color": "white",
            // "backgroundColor": "black"
        },
    }
};



// const projectColumnsContentDefault = [
//     {
//         "title": {
//             "text": "",
//             styles: {
//                 "font": "h1",
//                 "textAlign": "text-align-center",
//             }
//         },
//         "description": {
//             "text": "",
//             styles: {
//                 "font": "p",
//                 "textAlign": "text-align-center",
//             }
//         }
//     },
//     {
//         "title": {
//             "text": "",
//             styles: {
//                 "font": "h1",
//                 "textAlign": "text-align-center",
//             }
//         },
//         "description": {
//             "text": "",
//             styles: {
//                 "font": "p",
//                 "textAlign": "text-align-center",
//             }
//         }
//     },
//     {
//         "title": {
//             "text": "",
//             styles: {
//                 "font": "h1",
//                 "textAlign": "text-align-center",
//             }
//         },
//         "description": {
//             "text": "",
//             styles: {
//                 "font": "p",
//                 "textAlign": "text-align-center",
//             }
//         }
//     }
// ]

const projectTextAreaContentDefault = {
    "text": ""
}

const projectTextAreaStylesDefault = {
    // "font": "h1",
    // "fontSize": "1em", // these aren't getting used rn
    // "fontWeight": "normal" // these aren't getting used rn
    textarea: {
        "font": "p",
        "textAlign": "text-align-center",
        // "horizontalAlign": "",
        // "verticalAlign": "",
    }
}

const textareaSectionContentDefault = {
    text: "",
    styles: {
        tagType: "p",
    }
};

const textareaContentDefaultNew = [
    { 
        text: "Heading",
        styles: {
            tagType: "h3",
        }
    },
    {
        text: "Insert some text here",
        styles: {
            tagType: "p",
        }
    }
];

const textareaStylesDefaultNew = {
    textAlign: "text-align-left",
}

const projectImageContentDefault = {
    "imageUrl": "https://www.svgrepo.com/show/508699/landscape-placeholder.svg",
    "imageId": "",
}

const projectImageAndTextContentDefault = {
    imageContent: projectImageContentDefault, 
    textContent: {
        content: textareaContentDefaultNew,
        styles: textareaStylesDefaultNew,
    }
}

const projectColumnsContentDefault = [
    {
        "content": [
            {
                "text": "Column 1",
                "styles": {
                    "tagType": "h1",
                }
            },
            {
                "text": "Column 1 description",
                "styles": {
                    "tagType": "p",
                }
            }
        ],
        "styles": {
            "textAlign": "text-align-center",
        }
    },
    {
        "content": [
            {
                "text": "Column 2",
                "styles": {
                    "tagType": "h1",
                }
            },
            {
                "text": "Column 2 description",
                "styles": {
                    "tagType": "p",
                }
            }
        ],
        "styles": {
            "textAlign": "text-align-center",
        }
    },
    {
        "content": [
            {
                "text": "Column 3",
                "styles": {
                    "tagType": "h1",
                }
            },
            {
                "text": "Column 3 description",
                "styles": {
                    "tagType": "p",
                }
            }
        ],
        "styles": {
            "textAlign": "text-align-center",
        }
    }
]

const projectGalleryContentDefault = {
    "images": [
        {
            "imageUrl": "https://www.svgrepo.com/show/508699/landscape-placeholder.svg",
            "imageId": "",
        },
        {
            "imageUrl": "https://www.svgrepo.com/show/508699/landscape-placeholder.svg",
            "imageId": "",
        },
        {
            "imageUrl": "https://www.svgrepo.com/show/508699/landscape-placeholder.svg",
            "imageId": "",
        },
    ],
    "styles": {
        "header": {
            // "color": "white",
            // "backgroundColor": "black"
        },
    }
}

const projectJupyterContentDefault = {
    "notebook": "",
    "theme": "atomDark",
}

const projectGoogleSlidesContentDefault = {
    "slidesUrl": "",
}

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
                // "color": "black",
            },
        }
    },
    "pages": {
        "about": {
            "nameAndTitle": {
                "content":
                    [
                        {
                            "text": "Your Name",
                            "styles": {
                                "tagType": "h1",
                            }
                        },
                        {
                            "text": "Your Title",
                            "styles": {
                                "tagType": "h2",
                            }
                        }
                    ],
                "styles": {
                    "textAlign": "text-align-center",
                }
            },
            "personalSummary": {
                "content": textareaContentDefaultNew,
                "stlyes": textareaStylesDefaultNew,
            },
            "profilePicture": "",
            "profilePictureId": "",
            "backgroundPicture": "", //../assets/code-background.jpg
            "backgroundPictureId": "",
            "contactInfo": {
            },
            "styles": {
                "contactLogos": {
                    "width": "2rem",
                    "height": "2rem",
                }
            }
        },
        "projectsPreview": projectsPreviewDefault,
        "projects": projectsDefault,
    },
    "styles": {
        backgroundColor: "#ffffff",
        color: "#000000",
        linkColor: "#0000ff",
        font: "Arial",
    }
};






// #############################################
// #############################################
// #############################################
// #############################################
// #############################################


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
    projectDefault,
    projectTextAreaStylesDefault,
    projectColumnsContentDefault,
    projectImageContentDefault,
    projectImageAndTextContentDefault,
    projectTextAreaContentDefault,
    textareaContentDefaultNew,
    textareaStylesDefaultNew,
    textareaSectionContentDefault,
    projectGalleryContentDefault,
    projectJupyterContentDefault,
    projectGoogleSlidesContentDefault,

    experienceDefault,
    experienceItemDefault,
    educationDefault,
    educationItemDefault,
};