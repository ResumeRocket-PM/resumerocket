import React from 'react';
import "../../../../styles/UserTutorial.css";
import createAccount from './images/createAccount.mp4';
import accountSetup from './images/accountSetup.mp4';
import createProject from './images/createProject.mp4';
import projectSections from './images/projectSections.png';
import resumeRepository from './images/resumeRepository.png';
import versionHistory from './images/versionHistory.mp4';
import createApplication from './images/createApplication.png';
import applicationResume from './images/applicationResume.png';
import suggestions from './images/suggestions.png';
import resumeAssistant from './images/resumeAssistant.png';
import extensionView from './images/extensionView.png';
import userSearch from './images/userSearch.png';
import viewAccountItems from './images/viewAccountItems.png';
import userChat from './images/userChat.png';


const UserTutorial = () => {
    return (
        <div>
            <div>
                <h1>Tutorial</h1>
                <h2>Get Started</h2>
                <p>
                    To get started, create an account and go through the quick account setup, then get tailoring!
                </p>

                <h2>Account Creation</h2>
                <ol>
                    <li>Click on <strong>Create Account</strong></li>
                    <li>Fill out the fields</li>
                    <li>Finish creation by clicking on <strong>Create Account</strong> once more</li>
                </ol>
                <video src={createAccount} controls alt="Create Account" />

                <h2>Account Setup</h2>
                <p>
                    After creating an account, upload a primary resume to the account and add a profile photo!
                </p>
                <ul>
                    <li>
                        This will fill out most details for you, but you can always update them as needed!
                    </li>
                </ul>
                <video src={accountSetup} controls alt="Account Setup" />
                <p>
                    After you are done on the Account page, head over to the Portfolio page to initialize your project portfolio.
                </p>

                <h2>Portfolio</h2>
                <p>
                    The Portfolio offers the ability to add and manage multiple projects! Add a new project and give it a name and description. Once that is created, go ahead and click on it.
                </p>
                <ul>
                    <li>
                        <em>
                            If you don&apos;t have anything to put in there right now, don&apos;t worry about it—you can always come back later!
                        </em>
                    </li>
                </ul>
                <video src={createProject} controls alt="Project Setup" />
                <p>
                    After clicking on the new project you can start adding sections to showcase your work! The sections include image and text sections, galleries, embedded video sections, embedded Google Slides, and Jupyter notebooks to help you show others your work.
                </p>
                <img id="tutorial-image" src={projectSections} alt="Project Sections" />

                <h2>Resume</h2>
                <p>
                    You can work with resumes a few ways in the application. Start by going to the <strong>Repository</strong> section. Here you should already see one resume populated, this is your account&apos;s <strong>Primary Resume</strong>.
                </p>
                <img id="tutorial-image" src={resumeRepository} alt="Resume Repository" />

                <h3>Version History</h3>
                <p>
                    If you click on it, you will also see the <strong>Version History</strong> for the resume. Right now it is the only version, but if you make some changes by clicking on the resume, adding or removing some text, and then clicking save, the new version will show up!
                </p>
                <video src={versionHistory} controls alt="Video Link for Version History" />

                <p>
                    You can upload additional resumes if you would like, so you can have different resumes for different purposes such as a government resume and your normal resume. For now, click on the <strong>Applications</strong> section.
                </p>

                <h3>Applications</h3>
                <p>
                    Applications are populated either by pasting a job posting link in the box and uploading a resume or by using the browser extension. Find a job from your preferred job hosting site (Indeed, LinkedIn, etc.), upload a resume, and then click <strong>Submit</strong>. This will take a few minutes to gather all the information and make the application record.
                </p>
                <img id="tutorial-image" src={createApplication} alt="Application Creation" />
                <p>
                    Each application has a few details about the job and an option to view the resume and suggestions. Click on view once yours shows up.
                </p>
                <img id="tutorial-image" src={applicationResume} alt="View Resume" />
                <p>
                    On the view page, there will be a few suggestions displayed around the resume. You can click on the suggestions to apply them to the resume and then you can download and use that resume or save the version as history for the <strong>Primary Resume</strong>.
                </p>
                <img id="tutorial-image" src={suggestions} alt="Suggested Changes" />
                <p>
                    On the same viewing page, on the left-hand side, there is a <strong>Resume Assistant</strong> button. Clicking on that will pull up the resume assistant, which you can use to ask questions about the associated job posting and the resume, allowing you to get additional suggestions through the chat or confirm details of the job.
                </p>
                <img id="tutorial-image-large" src={resumeAssistant} alt="Resume Assistant" />

                <h3>Browser Extension</h3>
                <p>
                    The Browser Extension is available on the Chrome Extension Store.
                </p>
                <p>
                    The browser extension allows you to make applications directly from the job posting page so that you can find jobs you are a fit for quicker.
                </p>
                <p>
                    From the job posting page, click on the extension and log in to your Resume Rocket account. Then, select the resume from your uploaded ones you would like to make the application with. This will send the information to our application, and it will make the application in the background.
                </p>
                <p>
                    From the browser extension, you can also view your applications and update your account details so you can make sure your profile has the latest information.
                </p>
                <img id="tutorial-image-large" src={extensionView} alt="Extension Account View" />

                <h2>Networking</h2>
                <h3>Account Search</h3>
                <p>
                    Networking is where you can find other users profiles to view their shared resumes and portfolios, find potential project partners, and add friends so you can message them through the app.
                </p>
                <p>
                    To view another users account, type their name in the search bar and browse through the results on the left.
                </p>
                <img id="tutorial-image" src={userSearch} alt="User Search" />
                <p>
                    After selecting their account, if they are sharing their resume and portfolio, you&apos;ll have the option to see that on their account.
                </p>
                <img id="tutorial-image" src={viewAccountItems} alt="View Account Items" />
                <p>
                    This is also where you can add the user as a friend to message them through the user chat box.
                </p>

                <h3>User Chat</h3>
                <p>
                    The user chat box is with you the entire time you are working in our app, that way you can stay in touch with other professionals.
                </p>
                <img id="tutorial-image" src={userChat} alt="User Chat" />
            </div>
        </div>
    );
};

export default UserTutorial;