import React, { useState, useEffect, useContext, useRef } from 'react';
import { CircularProgress } from '@mui/material';
import { useApi } from "../../hooks";
import { ImageContext } from '../../context/ImageProvider';
import ProfilePhoto from './ProfilePhoto'; // Import ProfilePhoto component
import Messages from './Messages';
import userSolidOrange from "../../assets/user-solid-orange.svg";


const TalkedPeopleList = () => {
    const [talkedPeople, setTalkedPeople] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [profileDialog, setProfileDialog] = useState({ open: false, accountId: null, status: null });
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
        if (selectedPerson) {
            setSelectedPerson(null);
            setTimeout(() => setSelectedPerson(person), 0);
        } else {
            setSelectedPerson(person);
        }
    };

    const handlePhotoClicked = (person) => {
        setProfileDialog({ open: true, accountId: person.accountId, status: person.status });
    };

    const closeProfileDialog = () => {
        setProfileDialog({ open: false, accountId: null, status: null });
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
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handlePhotoClicked(person);
                                }}
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    backgroundImage: `url(${person.profilePhotoLink || userSolidOrange})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    marginRight: '8px',
                                    backgroundColor: '#ddd',
                                    cursor: 'pointer',
                                }}
                            ></div>

                            <div style={{ flex: 1 }}>
                                <h2 style={{ fontWeight: 'bold', fontSize: '15px', color: '#000000' }}>
                                    {person.firstName} {person.lastName}
                                </h2>
                            </div>
                        </div>
                    ))}

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

                    {profileDialog.open && (
                        <ProfilePhoto
                            accountId={profileDialog.accountId}
                            friendStatus={profileDialog.status}
                            onClose={closeProfileDialog} // Pass a function to close the dialog
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default TalkedPeopleList;
