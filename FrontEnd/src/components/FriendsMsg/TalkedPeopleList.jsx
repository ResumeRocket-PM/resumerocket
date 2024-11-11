import React, { useState, useEffect, useContext, useRef } from 'react';
import { CircularProgress } from '@mui/material';
import { useApi } from "../../hooks";
import { ImageContext } from '../../context/ImageProvider';
import userSolidOrange from "../../assets/user-solid-orange.svg";
import Messages from './Messages';

const TalkedPeopleList = () => {
    const [talkedPeople, setTalkedPeople] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPerson, setSelectedPerson] = useState(null); // Store the selected person object
    const api = useApi();
    const { showImage } = useContext(ImageContext);
    const isInitialLoad = useRef(true);

    const fetchTalkedPeople = async () => {
        setLoading(true);
        try {
            const response = await api.get('/Chat/AllTalkedPeople');
            if (response.ok) {
                const data = await response.json();
                setTalkedPeople(data.result || []);
            } else {
                console.error('Failed to fetch talked people list');
            }
        } catch (error) {
            console.error('Error fetching talked people list:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isInitialLoad.current) {
            fetchTalkedPeople();
            isInitialLoad.current = false;
        }
    }, []);

    const handlePersonClick = (person) => {
        // Close the existing Messages panel if open, then open a new one
        if (selectedPerson) {
            setSelectedPerson(null); // Temporarily set to null to close the existing panel
            setTimeout(() => {
                setSelectedPerson(person); // Open the new panel with person data
            }, 0); // Small delay to ensure re-render
        } else {
            setSelectedPerson(person); // Open the new panel if none is open
        }
    };

    return (
        <div>
            {loading ? (
                <CircularProgress />
            ) : (
                <div>
                    {talkedPeople.map((person, index) => (
                        <div
                            key={person.accountId || index}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '8px',
                                borderBottom: '1px solid #ddd',
                                cursor: 'pointer',
                                backgroundColor: '#e0f7fa'
                            }}
                            onClick={() => handlePersonClick(person)}
                        >
                            <div
                                onClick={(e) => e.stopPropagation()}
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    backgroundImage: `url(${person.profilePhotoLink || userSolidOrange})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    marginRight: '8px',
                                    backgroundColor: '#ddd'
                                }}
                            ></div>

                            <div style={{ flex: 1 }}>
                                <h2 style={{ fontWeight: 'bold', fontSize: '15px', color: '#000000' }}>
                                    {person.firstName} {person.lastName}
                                </h2>
                            </div>
                        </div>
                    ))}

                    {/* Render Messages panel as an overlay */}
                    {selectedPerson && (
                        <Messages
                            theyId={selectedPerson.accountId}
                            profilePhotoLink={selectedPerson.profilePhotoLink}
                            firstName={selectedPerson.firstName}
                            lastName={selectedPerson.lastName}
                            onClose={() => setSelectedPerson(null)}
                            onMessageSent={fetchTalkedPeople}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default TalkedPeopleList;
