import "../../styles/NetworkingPage.css";
import { useState } from "react";
import { exampleNetworkingGetUserResults } from "../../example_responses/networking.js";


export default function NetworkingPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [usersDetails, setUsersDetails] = useState(exampleNetworkingGetUserResults);
    const [selectedUserDetails, setSelectedUserDetails] = useState(exampleNetworkingGetUserResults[0]);



    return (
        <div id='networking-page-root'>
            <div id='networking-page-content'>
                <div id='networking-page-user-results'>
                    <div id='networking-page-user-results-content'>
                        {usersDetails.map((user, index) => (
                            <div key={index} className='networking-page-user-result-card'>
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
                            <h2>{selectedUserDetails.name}</h2>
                            <p>{selectedUserDetails.title}</p>
                        </div>
                        <div id='networking-page-selected-user-info-window-body'>
                            <p>{selectedUserDetails.location}</p>
                            <p>{selectedUserDetails.email}</p>
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