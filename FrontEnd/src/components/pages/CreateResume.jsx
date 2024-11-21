import "../../styles/CreateResume.css";
import PropTypes from 'prop-types';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import LeftBarResume from '../LeftBarResume.jsx';
import { Card, CardContent, Dialog, Button} from '@mui/material/';
import Chat from '../Chat.jsx';
import { useApi } from "../../hooks";
import { ClipLoader } from "react-spinners";
import { debounce, set } from 'lodash';
import AddVersionToResumeHistoryButton from './ResumePages/AddVersionToResumeHistoryButton.jsx';

// where modified can be longer than original
// const suggestions = [
//     {
//         "explanation": "Rewording 'Built' to 'Developed' aligns with the job's focus on software engineering. Also, 'interfaces' can be considered synonymous with 'GUIs' in a technical context, matching the job's technical requirement.",
//         "original": "Built simple chat client and server GUIs, in which users can send/receive messages to/from",
//         "modified": "Developed simple chat client and server interfaces, allowing users to send/receive messages to/from"
//     },
//     {
//         "explanation": "Rephrasing 'using' to 'utilizing' aligns better with professional terminology. Also, emphasizing 'C# language' matches the technical keywords and focus in software engineering.",
//         "original": "Played a key role in developing a version of the 'Agario' game using C#",
//         "modified": "Contributed to developing a version of the 'Agario' game utilizing C# language"
//     },
//     {
//         "explanation": "Mentioning 'unit testing' and 'uphold code and quality standards' more explicitly aligns with the job's emphasis on 'debugging/unit testing' and quality standards in software engineering.",
//         "original": "Debugged and tested code to ensure quality standards",
//         "modified": "Performed debugging and unit testing to uphold code and quality standards"
//     },
//     {
//         "explanation": "Using 'coordinated and optimized' is more technical and matches the engineering problem-solving aspect of the job description.",
//         "original": "Assisted in managing routes for 30+ invoices daily",
//         "modified": "Coordinated and optimized routes for managing 30+ invoices daily"
//     },
//     {
//         "explanation": "Rephrasing to 'Analyzed and addressed' provides a technical approach to problem solving, aligning with the job's focus on solving 'large scale and highly complex technical problems'.",
//         "original": "Diagnosed lawn and garden issues and recommended targeted solutions",
//         "modified": "Analyzed and addressed lawn and garden issues with targeted solutions"
//     }
//   ];

// const suggestions = [
//     {
//         "explanation": "Rewording 'Built' to 'Developed' aligns with the job's focus on software engineering. Also, 'interfaces' can be considered synonymous with 'GUIs' in a technical context, matching the job's technical requirement.",
//         "original": "Built simple chat client and server GUIs, in which users can send/receive messages to/from",
//         "modified": "Developed chat client and server GUIs, allowing users to send/receive messages"
//     },
//     {
//         "explanation": "Rephrasing 'using' to 'utilizing' aligns better with professional terminology. Also, emphasizing 'C# language' matches the technical keywords and focus in software engineering.",
//         "original": "Played a key role in developing a version of the 'Agario' game using C#",
//         "modified": "Contributed to creating a version of 'Agario' game using C#"
//     },
//     {
//         "explanation": "Mentioning 'unit testing' and 'uphold code and quality standards' more explicitly aligns with the job's emphasis on 'debugging/unit testing' and quality standards in software engineering.",
//         "original": "Debugged and tested code to ensure quality standards",
//         "modified": "Performed debugging to ensure quality standards"
//     },
//     {
//         "explanation": "Using 'coordinated and optimized' is more technical and matches the engineering problem-solving aspect of the job description.",
//         "original": "Assisted in managing routes for 30+ invoices daily",
//         "modified": "Optimized routes for managing 30+ invoices daily"
//     },
//     {
//         "explanation": "Rephrasing to 'Analyzed and addressed' provides a technical approach to problem solving, aligning with the job's focus on solving 'large scale and highly complex technical problems'.",
//         "original": "Diagnosed lawn and garden issues and recommended targeted solutions",
//         "modified": "Analyzed lawn and garden issues and provided solutions"
//     }
// ];

function ShareDialog(props) {

    const { onClose, open } = props;

    const handleClose = () => {
        onClose();
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <div id='share_dialog_content'>
                <input type='text' value='https://resumerocket.com/username/resume'/>
            </div>
        </Dialog>
    )
}

ShareDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
  };

function SuggestionBox({ suggestion, classPairs, calculateTopPosition, applySuggestion, undoSuggestion, manuallyHighlightOriginalText, index }) {
    const [seeExplanation, setSeeExplanation] = useState(false);
    const [applyButtonState, setApplyButtonState] = useState('Apply');

    const handleMouseEnter = () => {
        console.log('mouse enter');
        manuallyHighlightOriginalText(index, 'yellow');
    };

    const handleMouseLeave = () => {
        console.log('mouse leave');
        manuallyHighlightOriginalText(index, 'transparent');
    };

    const handleApplyButtonClick = () => {
        if (applyButtonState === 'Apply') {
            applySuggestion(index);
            setApplyButtonState('Undo');
        } else {
            undoSuggestion(index);
            setApplyButtonState('Apply');
        }
    };

    console.log('applyButtonState', applyButtonState);

    return (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <Card key={index} className="suggestion-box">
                <CardContent sx={{ padding: '1rem 1rem 1rem 1rem' }}>
                    <div className="suggestion-box-content">
                        <p className="weight-bold underline">Suggested Text:</p>
                        <div className="suggestion-box-text">{suggestion.modifiedText}</div>
                        {seeExplanation && (
                            <>
                                <div className="weight-bold underline">Explanation: </div>
                                <div className="suggestion-box-explanation">{suggestion.explanationString}</div>
                            </>
                        )}
                    </div>
                    <div className="hz-space-btwn">
                        <Button
                            sx={{ padding: '0' }}
                            onClick={() => {
                                setSeeExplanation(!seeExplanation);
                                if (seeExplanation) {
                                    manuallyHighlightOriginalText(index, 'transparent');
                                }
                            }}
                        >
                            {!seeExplanation ? 'See Explanation' : 'Hide Explanation'}
                        </Button>
                        <Button sx={{ padding: '0' }} onClick={handleApplyButtonClick}>
                            {applyButtonState}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}


export default function CreateResume({resumeId=null}) {

    let { _resumeId, _applicationId } = useParams();
    const OriginalResumeId = resumeId || _resumeId; // use resumeId if provided, otherwise use id from URL
    const Aid = _applicationId; // use applicationId if provided, otherwise null
    const [resumeIdToRender, setResumeIdToRender] = useState(OriginalResumeId);
    const [currentVersionResumeId, setCurrentVersionResumeId] = useState(null);

    const api = useApi();
    const iframeRef = useRef(null);

    const [error, setError] = useState(null);
    const [resume, setResume] = useState(null);
    const [chatOpen, setChatOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [targetRect, setTargetRect] = useState(null);
    const [resumeLoading, setResumeLoading] = useState(true);
    const [suggestionsLoading, setSuggestionsLoading] = useState(true);
    const [versionHistory, setVersionHistory] = useState([]);
    const [shareDialogOpen, setShareDialogOpen] = useState(false);
    const [resumeDoneEditing, setResumeDoneEditing] = useState(true);
    const [suggestions, setSuggestions] = useState([]);

    const [suggestionsApplied, setSuggestionsApplied] = useState([]);
    const [resumeDownloading, setResumeDownloading] = useState(false);

    const [suggestionsOGInnerHTML, setSuggestionsOGInnerHTML] = useState([]);

    const [resumeWithoutPageContainer, setResumeWithoutPageContainer] = useState(null);

    // ################## new stuff ##################

    const editorRef = useRef(null);
    const log = () => {
      if (editorRef.current) {
        console.log(editorRef.current.getContent());
      }
    };

    const [OGtextClassPairsList, setOGtextClassPairsList] = useState([]);

    // ###############################################
    const [versionHistoryOpen, setVersionHistoryOpen] = useState(false);

    const handleResize = () => {
        if (iframeRef.current) {
          setTargetRect(iframeRef.current.getBoundingClientRect());
        }
      };
      
    const loadResume = () => 
    {
        // if we have an application id, we want to get the latest verison of that resume that was used for that application
        // see notes... this wouldn't be possible without modifying the application table to include another column like latest resume id 

        // for now just made another useEffect to apply the applied suggestions 

        if(resumeIdToRender !== undefined)
        {
            api.get(`/resume/${resumeIdToRender}`)
            .then(response => response.json())
            .then(data => {
                // console.log('data', data);
                // setResume(removePageContainer(data.result));
                setResume(data.result);
                const resumeWithoutPageContainer = removePageContainer(data.result);
                setResumeWithoutPageContainer(resumeWithoutPageContainer);

                setTimeout(() => {
                    handleResize();
                  }, 100); 
                setResumeLoading(false);
            })
            .catch(error => {
                console.error("Failed to fetch data:", error);
                setError(error.message);
                setResumeLoading(false);
            });
        }

        window.addEventListener('resize', handleResize);
        handleResize()
    
        return () => window.removeEventListener('resize', handleResize);
    }

    const tryLoadSuggestions = () => {
        if(Aid) {
            setSuggestionsLoading(true);
            api.get(`/resume/${Aid}/suggestions`)
            .then(response => response.json())
            .then(data => {
                // console.log('suggestions', data);
                setSuggestions(data.result.resumeSuggestions);
                setSuggestionsApplied(data.result.resumeSuggestions.map(suggestion => suggestion.accepted));
                setSuggestionsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching suggestions:', error);
            });
        }
    }

    const loadVersionHistory = () => {
        if(!Aid) {
            api.get(`/resume/${OriginalResumeId}/history`)
            .then(response => response.json())
            .then(data => {
                console.log('history', data);
                setVersionHistory(data.result); // Save the response data to the state variable
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Failed to fetch data:", error);
                setError(error.message);
                setIsLoading(false);
            });
        }
    };

    useEffect(() => {
        if (!Aid) {
            setResumeIdToRender(currentVersionResumeId || OriginalResumeId);
        }
    }, [currentVersionResumeId]);

    // load resume and suggestions on page load
    useEffect(() => {
        loadResume()
        tryLoadSuggestions()
        loadVersionHistory()    
    }, [resumeIdToRender]);    

    const handleShareDialogOpen = () => {
        setShareDialogOpen(true);
    }   

    const handleChatOpen = () => {
        setChatOpen(!chatOpen);
    }

    const handleVersionHistoryOpen = () => {
        setVersionHistoryOpen(!versionHistoryOpen);
    }

    const afterVersionSave = (newResumeId) => {
        // update the resumeId in the url
        if(Aid) {
            window.history.pushState({}, null, `/create-resume/${newResumeId}/${Aid}`);
        }
    }

    const handleShareDialogClose = () => {
        setShareDialogOpen(false);
    }

    const downloadPdf = () => {
        setResumeDownloading(true);
        // if we have an Aid, we need to get the latest version of the resume
        // for now we'll only allow them to download if they've saved a verion
        let resumeIdToGet = OriginalResumeId;
        if (Aid) {
            // Get the latest version of the resume
            api.get(`/resume/${OriginalResumeId}/history`)
                .then(response => response.json())
                .then(data => {
                    console.log('data', data);
                    if (data.result && data.result.length > 0) {
                        resumeIdToGet = data.result[data.result.length - 1].resumeId;
                        console.log('Latest Resume ID:', resumeIdToGet);
                    }
                })
                .catch(error => {
                    console.error('Error fetching resume history:', error);
                });
        }
        
        api.get(`/resume/${resumeIdToGet}/pdf`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            console.log('response', response)
            return response.blob(); 
        })
        .then(pdfBlob => {
            // Create a URL from the Blob
            const blobUrl = URL.createObjectURL(pdfBlob);

            const link = document.createElement('a');
            
            link.href = blobUrl;

            link.download = 'resume.pdf'; 

            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);

            URL.revokeObjectURL(blobUrl);
        })
        .catch(error => {
            console.error("Error downloading PDF:", error);
        });

        setResumeDownloading(false);
    };

    const removePageContainer = (html) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
    
        const styleTags = tempDiv.querySelectorAll('style');
        const styles = Array.from(styleTags).map(style => style.outerHTML).join('\n');
    
        const pageContainer = tempDiv.querySelector('#page-container');
    
        if (pageContainer) {
            return `${styles}\n${pageContainer.innerHTML}`;
        } else {
            console.warn('No #page-container found in the HTML');
            return null; 
        }
    };

    const debouncedSetResume = useCallback(
        debounce((newHtml) => {
            setResume(newHtml);
        }, 1000),
        []
    );
    
    const handleResumeHtmlContentChange = (event) => {
        setResumeDoneEditing(false);
        debouncedSetResume(event.target.innerHTML);
        setResumeDoneEditing(true); 
    };

    const updateSuggestionStatus = (index) => {
        const newSuggestionsApplied = [...suggestionsApplied];
        newSuggestionsApplied[index] = !newSuggestionsApplied[index];
        setSuggestionsApplied(newSuggestionsApplied);
    }

    const saveSuggestionStatuses = () => {
        if (Aid) {
            // Create an array of SuggestionStatus objects
            const suggestionStatuses = suggestionsApplied.map((suggestionApplied, index) => ({
                resumeChangeId: suggestions[index].resumeChangeId, // Assuming each suggestion has an 'id' property
                isApplied: suggestionApplied // Assuming each suggestion has an 'isApplied' property
            }));
    
            // Format the request body
            const requestBody = {
                suggestionStatuses: suggestionStatuses
            };

            console.log("Request Body: ", JSON.stringify(requestBody)); // Log to check body structure
    
            // Send the PUT request with the formatted request body
            api.put(`/resume/${Aid}/suggestions`, requestBody)
                .then(response => {
                    console.log('Response from API:', response);
                })
                .catch(error => {
                    console.error('Error saving suggestion statuses:', error);
                });
        }
    };

    // Notes: 
    // the main issue that had to be fixed was that if you get to the end of a div 
    // and the word is not finished, it just puts the word in the next div... which is bad 
    // the solution was to keep track of the current word and if we reach the end of a div
    // and the word is not finished, we reset j (index of the modified text) to the index of the
    // end of the previous word in the modified text. 
    //
    // that way we're only filling out text in the new divs according to the index of the modified text
    // const applySuggestion = (index) => {
    //     const suggestion = suggestions[index];
    //     const classPairs = OGtextClassPairsList[index];


    //     const parser = new DOMParser();
    //     const serializer = new XMLSerializer();
    //     const doc = parser.parseFromString(resume, 'text/html');
    //     const divs = doc.querySelectorAll('div');
    
    //     // const targetDiv = doc.querySelector('#pf1 > div.pc.pc1.w0.h0 > div.c.xb.y5a.w30.h1 > div');
    //     let j = 0; // Index for modified text
    //     let originalText = suggestion.originalText;
    //     let modifiedText = suggestion.modifiedText;
    //     let currentWord = '';
    //     // let wordUnfinished = false;
    //     for (let pair of classPairs) {
    //         divs.forEach(div => {
    //             if (div.parentElement && div.parentElement.className === pair.grandparentClass && div.className === pair.parentClass) {
    //                 const targetDiv = div;
        
    //                 let i = 0; // index for div text (innerHTML)

    //                 let newText = '';
    //                 let insideTag = false;
    //                 let insideWord = false;
        
    //                 while (i < targetDiv.innerHTML.length) {
    //                     const nextDivChar = targetDiv.innerHTML[i];
    //                     const nextOriginalChar = originalText[j];
    //                     const nextModifiedChar = modifiedText[j];
    //                     /////////////// Normal Adding Logic //////////////////
    //                     if (nextDivChar === '<') {
    //                         // Append HTML tags
    //                         insideTag = true;
    //                         newText += nextDivChar;
    //                     } else if (nextDivChar === '>') {
    //                         insideTag = false;
    //                         newText += nextDivChar;
    //                     } else if (!insideTag && j < originalText.length && j < modifiedText.length) {
    //                         if (nextModifiedChar === ' ') {
    //                             insideWord = false;
    //                             currentWord = '';
    //                         } else {
    //                             insideWord = true;
    //                             currentWord += nextModifiedChar;
    //                         }
    //                         // Replace text character by character
    //                         newText += nextModifiedChar;
    //                         j++;
    //                     } 
    //                     else if (insideTag){ // **** idk if this is necessary
    //                         newText += nextDivChar;
    //                     }
    //                     /////////////////////////////////////////////////

    //                     if (i === targetDiv.innerHTML.length - 1 && insideWord) { // if we are at the end of the div and the word is not finished
    //                         // wordUnfinished = true;
    //                         newText = newText.slice(0, -currentWord.length-1); // remove word fragment and previous space end of newText
    //                         j -= currentWord.length; // go back to the previous character in modified text
    //                         currentWord = ''; // reset currentWord
    //                     }

    //                     i++;
    //                 }
            
    //                 targetDiv.innerHTML = newText;
    //                 const newHtml = serializer.serializeToString(doc);
    //                 setResume(newHtml);
    //             }
    //         });
    //     }
    //     // now we should apply some classes to the divs that will highlight them in green then fade them out
    //     // so the user knows which div was changed
    //     // we can do this by getting the class names of the divs that contain the original text
    //     // and then adding a class to them that will highlight them in green
    //     // then we can remove the class after a few seconds

    //     const originalClasses = findOriginalTextDivClasses(suggestion.original);
    //     // const parser = new DOMParser();
    //     // const doc = parser.parseFromString(resume, 'text/html');
    //     // const divs = doc.querySelectorAll('div');

    //     // divs.forEach(div => {
    //     //     originalClasses.forEach(pair => {
    //     //         if (div.parentElement && div.parentElement.className === pair.grandparentClass && div.className === pair.parentClass) {
    //     //             div.style.backgroundColor = 'green'; // Highlight the div
    //     //             setTimeout(() => {
    //     //                 div.style.backgroundColor = 'transparent';
    //     //             }, 3000);
    //     //         }
    //     //     });
    //     // });
    // };

    // the new one... 
    // the plan: 
    // if we're inside a div we gotta keep matching the text until we reach the end of the div
    // can stop once we've matched the whole text and we're at the end of a div 
    // hmm ya know i think we just need to include the text before and after the matched text to make this work. 
    const applySuggestion = (index) => {
        const suggestion = suggestions[index];
        const classPairs = OGtextClassPairsList[index];

        const parser = new DOMParser();
        const serializer = new XMLSerializer();
        const doc = parser.parseFromString(resume, 'text/html');
        const divs = doc.querySelectorAll('div');
    
        // const targetDiv = doc.querySelector('#pf1 > div.pc.pc1.w0.h0 > div.c.xb.y5a.w30.h1 > div');
        let j = 0; // Index for modified text
        let modifiedText = suggestion.modifiedText;
        let originalText = suggestion.originalText;
        let textLenDif = originalText.length - modifiedText.length;
        // trim original text so that it is only as long as the modified text (this way we don't add extra chars)
        // originalText = originalText.slice(0, modifiedText.length);
        let currentWord = '';
        // let foundStartOfOriginalTextInCurrentDiv = false;
        let foundStartOfOriginalText = false;
        let unfinishedWord = '';



        const tryMatchRemainingOriginalText = (divText, originalText) => {
            let newText = '';
            let insideTag = false;
            let textMatched = '';
            let i = 0;  

            while (i < divText.length) {
                const nextDivChar = divText[i];
                const nextOriginalChar = originalText[i];

                /////////////// Normal Adding Logic //////////////////
                if (nextDivChar === '<') {
                    // Append HTML tags
                    insideTag = true;
                    newText += nextDivChar;
                } else if (nextDivChar === '>') {
                    insideTag = false;
                    newText += nextDivChar;
                } else if (!insideTag) {
                    // Replace text character by character
                    if (nextDivChar === nextOriginalChar) { // potential start of matched text
                        textMatched += nextDivChar; // keep track of matched text
                    } else { // if we have started to match text 
                        textMatched = ''; // reset matched text
                    }
                    newText += nextDivChar; // add the modified text
                }
                else if (insideTag){
                    newText += nextDivChar;
                }
                /////////////////////////////////////////////////
                i++;
            }

            return textMatched.length > 0;
        }


        for (let pair of classPairs) {
            divs.forEach(div => {
                if (div.parentElement && div.parentElement.className === pair.grandparentClass && div.className === pair.parentClass) {
                    const targetDiv = div;
        
                    let i = 0; // index for div text (innerHTML)

                    let newText = '';
                    let insideTag = false;
                    let insideWord = false;
        
                    while (i < targetDiv.innerHTML.length) {
                        const nextDivChar = targetDiv.innerHTML[i];
                        const nextOriginalChar = originalText[j];
                        const nextModifiedChar = modifiedText[j];

                        if(unfinishedWord.length > 0){
                            newText += unfinishedWord;
                            unfinishedWord = '';
                        }

                        /////////////// Normal Adding Logic //////////////////
                        if (nextDivChar === '<') {
                            // Append HTML tags
                            insideTag = true;
                            newText += nextDivChar;
                        } else if (nextDivChar === '>') {
                            insideTag = false;
                            newText += nextDivChar;
                        } else if (!insideTag) {                        
                            // Replace text character by character

                            // figure out what the next char is for the new text 
                            let nextChar = '';
                            let triedStartOfOriginalTextSearch = false;

                            // only get this the first time we successfully match the original text from the current div char
                            if (j < modifiedText.length && !foundStartOfOriginalText && nextDivChar === nextOriginalChar) {
                                foundStartOfOriginalText = tryMatchRemainingOriginalText(targetDiv.innerHTML.slice(i), originalText.slice(j));
                                triedStartOfOriginalTextSearch = true;
                            }

                            if (foundStartOfOriginalText) {
                                if (j < modifiedText.length) {
                                    // if this is the last char in the modified text 
                                    if (j === modifiedText.length - 1 && targetDiv.innerHTML[i+1] !== ' ') {
                                        modifiedText += ' ';
                                    }
                                    newText += nextModifiedChar; // add the modified text
                                    nextChar = nextModifiedChar;
                                    j++;
                                } else { 
                                    // if we have reached the end of the modified text, we want to 'delete' the difference
                                    // between the original and modified text from the original text 
                                    // in terms of chars after our current position in the original text
                                    if(textLenDif <= 1) {
                                        newText += nextDivChar; // add the original text
                                        nextChar = nextDivChar;
                                    } else {
                                        textLenDif--;
                                    }
                                }
                            } else {
                                newText += nextDivChar; // add the original text
                                nextChar = nextDivChar;
                            }

                            if(nextChar !== ''){ // if we're not pausing our input becuase of textLenDif
                                if (nextChar === ' ') {
                                    insideWord = false;
                                    currentWord = '';
                                } else {
                                    // if(triedStartOfOriginalTextSearch && foundStartOfOriginalText){
                                    //     insideWord = true;
                                    //     currentWord += nextModifiedChar;
                                    // }else if(foundStartOfOriginalText && j < modifiedText.length){
                                    //     currentWord += nextModifiedChar;
                                    // }else {
                                    //     currentWord += nextDivChar;
                                    // }
                                    insideWord = true;
                                    currentWord += nextChar;

                                }
                            }
                        } 
                        else if (insideTag){ 
                            newText += nextDivChar;
                        }
                        /////////////////////////////////////////////////

                        if (i === targetDiv.innerHTML.length - 1 && insideWord) { // if we are at the end of the div and the word is not finished
                            
                            // only do this if this is not the last pair 
                            if (pair !== classPairs[classPairs.length - 1]) {
                                newText = newText.slice(0, -currentWord.length); // remove word fragment and previous space end of newText
                                // j -= currentWord.length; // go back to the previous character in modified text
                                // currentWord = ''; // reset currentWord
                                unfinishedWord = currentWord;
                            }
                            else { // this is the LAST DIV / pair
                                // if the newText is greater than 41 characters split it into two text segements 
                                // so that the last word is not cut off
                                // if (newText.length > 41) {
                                //     let lastSpaceIndex = newText.lastIndexOf(' ', 41);
                                //     let newText1 = newText.slice(0, lastSpaceIndex);
                                //     let newText2 = newText.slice(lastSpaceIndex);
                                //     newText = newText1 + '<span class="_ _4"></span>' + newText2;
                                // }
                                // // finsih the word... 
                                // // if modified text is unfinished, we need to finish it
                                // if (j < modifiedText.length) {
                                //     newText += modifiedText.slice(j);
                                // }else {// if original text/divText is unfinished, we need to finish it
                                //     // iterate i until we reach the end of the div
                                //     while (i < targetDiv.innerHTML.length) {
                                //         newText += targetDiv.innerHTML[i];
                                //         i++;
                                //     }
                                // }


                                // i want to know the width of the current div
                                
                            }
                        }

                        i++;
                    }
            
                    targetDiv.innerHTML = newText;
                    const newHtml = serializer.serializeToString(doc);
                    setResume(newHtml);
                }
            });
        }
        // update the suggestion status
        updateSuggestionStatus(index);

        // now we should apply some classes to the divs that will highlight them in green then fade them out
        // so the user knows which div was changed
        // we can do this by getting the class names of the divs that contain the original text
        // and then adding a class to them that will highlight them in green
        // then we can remove the class after a few seconds

        // const originalClasses = findOriginalTextDivClasses(suggestion.original);
    };

    const undoSuggestion = (index) => {
        // reset the div using the suggestionOGInnerHTML
        const parser = new DOMParser();
        const serializer = new XMLSerializer();
        const doc = parser.parseFromString(resume, 'text/html');
        const divs = doc.querySelectorAll('div');
        const suggestion = suggestions[index];
        const classPairs = OGtextClassPairsList[index];

        for (let pair of classPairs) {
            divs.forEach(div => {
                if (div.parentElement && div.parentElement.className === pair.grandparentClass && div.className === pair.parentClass) {
                    const targetDiv = div;
                    targetDiv.innerHTML = suggestion.originalText;
                    const newHtml = serializer.serializeToString(doc);
                    setResume(newHtml);
                }
            });
        }
    };
    
    // const findOriginalTextDivClasses = (originalText) => {
    //     const parser = new DOMParser();
    //     const doc = parser.parseFromString(resume, 'text/html');
    //     const divs = doc.querySelectorAll('div');
    //     const classPairs = [];
    //     let textMatched = '';
    //     let divIsNotMatch = true;
    
    //     for (let div of divs) {
    //         let combinedText = '';
    //         divIsNotMatch = true;
    //         div.childNodes.forEach(node => {
    //             if (node.nodeType === Node.TEXT_NODE || node.nodeType === Node.ELEMENT_NODE) {
    //                 combinedText += node.textContent;
    //             }
    //         });

    //         // if the class name does not include 't ', then it is not a text div
    //         if (!div.className.includes('t ')){
    //             continue;
    //         }
    
    //         for (let char of combinedText) {
    //             let nextChar = originalText[textMatched.length];
    //             if (textMatched.length < originalText.length && char === nextChar) {
    //                 textMatched += char;
    //                 divIsNotMatch = false;
    //             }else {
    //                 divIsNotMatch = true;
    //                 textMatched = '';
    //                 break;
    //             }
    //         }
    //         if (!divIsNotMatch) {
    //             textMatched += ' ';
    //             const grandparentClass = div.parentElement ? div.parentElement.className : '';
    //             classPairs.push({
    //                 grandparentClass: grandparentClass,
    //                 parentClass: div.className
    //             });
    //         }
    //         if (textMatched.length === originalText.length+1) {
    //             // remove the last ' ' we added to the end of the textMatched
    //             textMatched = textMatched.slice(0, -1);
    //             break;
    //         }
    //     }
    
    //     return classPairs;
    // }

    // this version is probably going to have to search way more text... 
    
    
    // NOTES: 
    // this new version logic is different from the original version heres the plan- 
    // we step each character of the text div's text and compare it to the original text (that part is pretty much same)
    // we keep track of text matched, that is text from the div that matches the original text. 
    // if by the end of that div we started matching text and the match never became false/started to not match, then we add the class pairs
    // if it we match to the end of the original text, we can break out of the loop and return the class pairs
    // 
    // case: if we started matching and included the class pairs of a div, and then continue to the next div, and the match is broken
    // we should reset the class pairs, and the textMatched. then continue looking for match within div text
    // 
    // remember: we only stop the search once we have matched the entire original text, or there's no more divs
    
    const findOriginalTextDivClasses = (originalText) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(resume, 'text/html');
        const divs = doc.querySelectorAll('div');
        let classPairs = [];
        let copiedDivText = '';
        let textMatched = '';
        let divContainsOriginalText = false;
        let entireTextMatched = false;
    
        for (let div of divs) {
            let combinedText = '';
            copiedDivText = '';
            divContainsOriginalText = false;
            div.childNodes.forEach(node => {
                if (node.nodeType === Node.TEXT_NODE || node.nodeType === Node.ELEMENT_NODE) {
                    combinedText += node.textContent;
                }
            });

            if (!div.className.includes('t ')){ // only search text divs
                continue;
            }

            for (let char of combinedText) { // for each character in the div text
                let nextOriginalCharToMatch = originalText[textMatched.length];
                if (!entireTextMatched) {
                    copiedDivText += char;
                    if(char === nextOriginalCharToMatch && !entireTextMatched){
                        textMatched += char;
                        divContainsOriginalText = true;
                    }else if(textMatched.length > 0 && !entireTextMatched){ // if we have already matched some text and the current char is not the next char in the original text
                        divContainsOriginalText = false;
                        textMatched = '';
                        classPairs = [];
                    }

                    if (textMatched.length === originalText.length) {
                        entireTextMatched = true;
                    }
                }else{
                    break;
                }
            }

            if (divContainsOriginalText) { // if we reach the end of a div and it does contain the original text, add the class pairs
                textMatched += ' ';
                const grandparentClass = div.parentElement ? div.parentElement.className : '';
                classPairs.push({
                    grandparentClass: grandparentClass,
                    parentClass: div.className
                });
            }
            if (entireTextMatched) {
                // // remove the last ' ' we added to the end of the textMatched
                // copiedDivText = copiedDivText.slice(0, -1);
                break;
            }
        }
    
        return classPairs;
    }

    const highlightClasses = (classPairs, doc, color="yellow") => {
        // const classPairs = findOriginalTextDivClasses(originalText);
        const divs = doc.querySelectorAll('div');
    
        divs.forEach(div => {
            classPairs.forEach(pair => {
                if (div.parentElement && div.parentElement.className === pair.grandparentClass && div.className === pair.parentClass) {
                    div.style.backgroundColor = color; // Highlight the div
                }
            });
        });
    

        return(doc);
    }        

    // get the class pairs of the original text
    useEffect (() => {
        if(!suggestionsLoading) {
            let classPairs = [];
            let indicesToRemove = [];
            for (let suggestion of suggestions) {
                const classPair = findOriginalTextDivClasses(suggestion.originalText);
                classPairs.push(classPair);
                if (classPair.length === 0) {
                    indicesToRemove.push(suggestions.indexOf(suggestion));
                }
            }
            setOGtextClassPairsList(classPairs);

            // // Filter out the suggestions and classPairs at the indices to remove
            // const filteredSuggestions = suggestions.filter((_, index) => !indicesToRemove.includes(index));
            // const filteredClassPairs = classPairs.filter((_, index) => !indicesToRemove.includes(index));

            // // Update the state with the filtered arrays
            // setSuggestions(filteredSuggestions);
            // setOGtextClassPairsList(filteredClassPairs);
        }

    }, [suggestionsLoading]);

    // apply already accepted suggestions
    useEffect (() => {
        // so for now just apply the suggestions after we load the resume
        if(!suggestionsLoading && !resumeLoading && OGtextClassPairsList.length > 0) {
            suggestions.forEach((suggestion, index) => {
                if (suggestion.accepted) {
                    applySuggestion(index);
                }
            });
        }
    }, [resumeLoading, suggestionsLoading, OGtextClassPairsList]);

    // update suggestionOGInnerHTML if OGtextClassPairsList changes
    useEffect(() => {
        if(resume && OGtextClassPairsList.length > 0) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(resume, 'text/html');
            const divs = doc.querySelectorAll('div');
            let suggestionsOGInnerHTML = [];

            divs.forEach(div => {
                OGtextClassPairsList.forEach(classPairs => {
                    classPairs.forEach(pair => {
                        if (div.parentElement && div.parentElement.className === pair.grandparentClass && div.className === pair.parentClass) {
                            suggestionsOGInnerHTML.push(div.innerHTML);
                        }
                    });
                });
            });

            setSuggestionsOGInnerHTML(suggestionsOGInnerHTML);
        }
    }, [OGtextClassPairsList]);

    // highlight the original text using the class pairs list
    // useEffect(() => {
    //     if (OGtextClassPairsList.length > 0) {
    //         const parser = new DOMParser();
    //         const doc = parser.parseFromString(resume, 'text/html');
    
    //         OGtextClassPairsList.forEach(classPairs => {
    //             highlightClasses(classPairs, doc);
    //         });
    
    //         const serializer = new XMLSerializer();
    //         const newHtml = serializer.serializeToString(doc);
    //         setResume(newHtml);
    
    //         console.log('OGtextClassPairsList', OGtextClassPairsList);
    //     }
    // }, [OGtextClassPairsList]);

    const manuallyHighlightOriginalText = (suggestionIndex, color) => {
        const classPairs = OGtextClassPairsList[suggestionIndex];
        const parser = new DOMParser();
        const doc = parser.parseFromString(resume, 'text/html');
        const newDoc = highlightClasses(classPairs, doc, color);
        const serializer = new XMLSerializer();
        const newHtml = serializer.serializeToString(newDoc);
        setResume(newHtml);
    }

    const calculateTopPosition = (classPairs) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(resume, 'text/html');
        const divs = doc.querySelectorAll('div');
    
        let topPosition = 0;
    
        divs.forEach(div => {
            classPairs.forEach(pair => {
                if (div.parentElement && div.parentElement.className === pair.grandparentClass && div.className === pair.parentClass) {
                    const rect = div.getBoundingClientRect();
                    topPosition = rect.top + window.scrollY;
                }
            });
        });
    
        return topPosition;
    }

    const updateResumeView = (resumeId) => {
        setCurrentVersionResumeId(resumeId);
    };

    console.log('suggestions', suggestions);
    // console.log('suggestions.resumeSuggestions', suggestions);
    // console.log('OGtextClassPairsList', OGtextClassPairsList);
    // console.log('suggestionsApplied', suggestionsApplied);

    console.log('currentVersionResumeId', currentVersionResumeId);
    console.log('resumeIdToRender', resumeIdToRender);
    console.log('OriginalResumeId', OriginalResumeId);

    return (
        <div id="CreateResume-root">
            <div id='CreateResume-top-content'>
                {/* <div 
                    // className='hz-center' 
                    // style={{gap: '1rem'}}
                > */}
                    {/* <Button
                        // style={{ marginLeft: '20px' }}
                        variant="contained"
                        onClick={downloadPdf}
                        disabled={!resume}
                    >
                        Download Pdf
                    </Button>
                    {/* <div style={{marginLeft: '20px'}}> */}
                        {/* <AddVersionToResumeHistoryButton
                            resume={resume}
                            resumeLoading={resumeLoading}
                            resumeDoneEditing={resumeDoneEditing}
                            originalResumeId={Rid}
                        /> */}
                    {/* </div> */}
                    {/* <Button
                        // style={{ marginLeft: '20px' }}
                        variant="contained"
                        onClick={getSuggestions}
                    >
                        Get Suggestions
                    </Button>  */}
                {/* </div> */}
            </div>
            <div id='CreateResume-main-content'
                className={
                    versionHistoryOpen && chatOpen ? "versionHistoryOpen_chatOpen" :
                    versionHistoryOpen ? "versionHistoryOpen" :
                    chatOpen ? "chatOpen" : ""
                }
            >
                <div id='left_menu_section'>
                    {/* <LeftBarResume
                        handleShareDialogOpen={handleShareDialogOpen}
                        handleChatOpen={handleChatOpen}
                        handleVersionHistoryOpen={handleVersionHistoryOpen}
                    /> */}
    
                    <Button
                        // style={{ marginLeft: '20px' }}
                        variant="contained"
                        onClick={downloadPdf}
                        disabled={!resume || resumeDownloading}
                    >
                        Download Pdf
                    </Button>
                    {/* <div style={{marginLeft: '20px'}}> */}
                        <AddVersionToResumeHistoryButton
                            resume={resume}
                            resumeLoading={resumeLoading}
                            resumeDoneEditing={resumeDoneEditing}
                            originalResumeId={OriginalResumeId}
                            afterVersionSave={afterVersionSave}
                            saveSuggestionStatuses={saveSuggestionStatuses}
                            reloadVersionHistory={loadVersionHistory}
                        />
                    {/* </div> */}

                    {!Aid && // 
                        <div>
                            <div className='v-center'>
                                <h3 className='hz-center'>Version History</h3>
                                    <div 
                                        className={[
                                            'version_block',
                                             resumeIdToRender === OriginalResumeId ? 'selected' : 'not-selected'
                                        ].join(' ')}
                                        onClick={() => updateResumeView(OriginalResumeId)}
                                    >
                                        Original
                                    </div>
                                        {versionHistory?.map((version, index) => (
                                        <div 
                                            key={index} 
                                            className={[
                                                'version_block',
                                                resumeIdToRender === version.resumeId ? 'selected' : 'not-selected'
                                            ].join(' ')}
                                            onClick={() => updateResumeView(version.resumeId)}>
                                            Version: {index}--{version.resumeId}
                                        </div>
                                    ))}
                            </div>
                        </div>
                    }

                    {chatOpen && <Chat />}
                </div>
                <div id='resume_section'>
                {resumeLoading ? (
                    <ClipLoader />
                ) : (
                    !versionHistoryOpen && (
                        <div id='resume-and-suggestions'>
                            <div id='left-suggestions'>
                                {!suggestionsLoading && suggestions.length > 0 &&
                                    suggestions.map((suggestion, index) => {
                                        if (
                                            index < 3 &&
                                            // suggestion?.modifiedText.length < suggestion?.originalText.length &&
                                            OGtextClassPairsList[index]?.length > 0 &&
                                            !suggestion?.accepted
                                        ) {
                                            return (
                                                <SuggestionBox
                                                    key={index}
                                                    suggestion={suggestion}
                                                    classPairs={OGtextClassPairsList[index]}
                                                    calculateTopPosition={calculateTopPosition}
                                                    applySuggestion={applySuggestion}
                                                    undoSuggestion={undoSuggestion}
                                                    manuallyHighlightOriginalText={manuallyHighlightOriginalText}
                                                    index={index}
                                                />
                                            );
                                        }
                                        return null;
                                    })
                                }
                            </div>
                            <Card 
                                id='resume-html-container'
                                className="ResumeFull"
                            >
                                <div 
                                    id='resume-html'
                                    contentEditable={true}
                                    dangerouslySetInnerHTML={{ __html: resumeIdToRender === OriginalResumeId ? resumeWithoutPageContainer : resume }}
                                    onInput={handleResumeHtmlContentChange}
                                />
                            </Card>
                            <div id='right-suggestions'>
                                {!suggestionsLoading && suggestions.length > 0 &&
                                    suggestions.map((suggestion, index) => {
                                        if (
                                            index > 2 &&
                                            // suggestion.modifiedText?.length < suggestion.originalText?.length &&
                                            OGtextClassPairsList[index]?.length > 0 &&
                                            !suggestion?.accepted
                                        ) {
                                            return (
                                                <SuggestionBox
                                                    key={index}
                                                    suggestion={suggestion}
                                                    classPairs={OGtextClassPairsList[index]}
                                                    calculateTopPosition={calculateTopPosition}
                                                    undoSuggestion={undoSuggestion}
                                                    applySuggestion={applySuggestion}
                                                    manuallyHighlightOriginalText={manuallyHighlightOriginalText}
                                                    index={index}
                                                />
                                            );
                                        }
                                        return null;
                                    })
                                }
                            </div>
                        </div>
                    )
                )}
                </div>
            </div>
            <ShareDialog open={shareDialogOpen} onClose={handleShareDialogClose} />
        </div>
    );
}