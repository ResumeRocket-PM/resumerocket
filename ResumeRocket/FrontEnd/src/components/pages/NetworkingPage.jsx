import "../../styles/NetworkingPage.css";
import { useState } from "react";
import { exampleNetworkingGetUserResults } from "../../example_responses/networking.js";
import userSolidOrange from "../../assets/user-solid-orange.svg"


export default function NetworkingPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [usersDetails, setUsersDetails] = useState(exampleNetworkingGetUserResults);
    const [selectedUserDetails, setSelectedUserDetails] = useState(exampleNetworkingGetUserResults[0]);
    const [selectedUserIndex, setSelectedUserIndex] = useState(0);

    const handleUserResultClick = (index) => {
        // add the class 'selected' to the clicked user result card
        document.getElementsByClassName('networking-page-user-result-card')[index].classList.add('selected');
        // remove the class 'selected' from the previously selected user result card
        document.getElementsByClassName('networking-page-user-result-card')[selectedUserIndex].classList.remove('selected');
        // update the selected user details to the clicked user details
        setSelectedUserDetails(usersDetails[index]);
        // update the selected user index to the clicked user index
        setSelectedUserIndex(index);
    }



    return (
        <div id='networking-page-root'>
            <div id='networking-page-content'>
                <div id='networking-page-user-results'>
                    <div id='networking-page-user-results-content'>
                        {usersDetails.map((user, index) => (
                            <div 
                                key={index} 
                                className='networking-page-user-result-card'
                                onClick={() => handleUserResultClick(index)}
                            >
                                <div className='networking-page-user-result-card-content'>
                                    <div className='networking-page-user-result-card-header'>
                                        <h2>{user.name}</h2>
                                        <p>{user.title}</p>
                                    </div>
                                    <div className='networking-page-user-result-card-body'>
                                        <p>{user.location}</p>
                                        <p>{user.email}</p>
                                    </div>
                                    <div className='networking-page-user-result-card-footer'>
                                        <a href={user.portfolioLink}>Portfolio</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div id='networking-page-selected-user-info-window'>
                    <div id='networking-page-selected-user-info-window-content'>
                        <div id='networking-page-selected-user-info-window-header'>
                            <div className='user-info-window-header-photo-and-name'>
                                <img 
                                    className='user-info-window-profile-photo'
                                    src={selectedUserDetails.profilePhotoUrl != "" ? selectedUserDetails.profilePhotoUrl : userSolidOrange} 
                                    alt="" 
                                />
                                <h1>{selectedUserDetails.name}</h1>
                            </div>
                            <div>
                                <p>{selectedUserDetails.title}</p>
                                <p>{selectedUserDetails.location}</p>
                                <p>{selectedUserDetails.email}</p>
                            </div>
                        </div>
                        <div id='networking-page-selected-user-info-window-body'>
                            <div id='user-info-window-experience-section'>
                                <h2>Experience</h2>
                                {selectedUserDetails.experience.map((experience, index) => (
                                    <div key={index} className='user-info-window-experience-entry'>
                                        <h3>{experience.company}</h3>
                                        <p>{experience.position}</p>
                                        <p>{experience.type}</p>
                                        <p>{experience.startDate} - {experience.endDate}</p>
                                        <p>{experience.description}</p>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <h2>Education</h2>
                                {selectedUserDetails.education.map((education, index) => (
                                    <div key={index} className='user-info-window-education-entry'>
                                        <h3>{education.schoolName}</h3>
                                        <p>{education.degree} in {education.major} {education.minor && `with a minor in ${education.minor}`}</p>
                                        <p>Graduated {education.graduationDate}</p>
                                        {education.courses &&
                                            <ul>
                                                {education.courses.map((course, index) => (
                                                    <li key={index}>{course}</li>
                                                ))}
                                            </ul>
                                        }
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div id='networking-page-selected-user-info-window-footer'>
                            <a href={selectedUserDetails.portfolioLink}>Portfolio</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}