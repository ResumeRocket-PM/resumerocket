import React, { useState } from 'react';
import UserCard from './UserCard'; // Adjust the path as necessary

const usersData = [
    {
        FirstName: 'John',
        LastName: 'Doe',
        Title: 'Software Engineer',
        StateLocation: 'California',
        ProfilePhotoLink: null // Use null for the placeholder image
    },
    {
        FirstName: 'Jane',
        LastName: 'Smith',
        Title: 'Product Manager',
        StateLocation: 'New York',
        ProfilePhotoLink: 'https://example.com/jane.jpg'
    },
    {
        FirstName: 'Alice',
        LastName: 'Johnson',
        Title: 'UX Designer',
        StateLocation: 'Texas',
        ProfilePhotoLink: null // Use null for the placeholder image
    },
];

const NetworkingPage = () => {
    const [selectedUserIndex, setSelectedUserIndex] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleCardClick = (index) => {
        setSelectedUserIndex(index); // Set the clicked card as selected
        setDialogOpen(true); // Open the dialog (optional)
    };

    return (
        <div style={styles.networkingPage}>
            <div style={styles.cardContainer}>
                {usersData.map((user, index) => (
                    <UserCard
                        key={index}
                        userDetails={user}
                        setDialogOpen={() => handleCardClick(index)} // Pass the index to handle click
                        selected={selectedUserIndex === index} // Pass the selected state
                    />
                ))}
            </div>
            {/* Dialog for editing profile photo or other user details */}
            {dialogOpen && <div style={styles.dialog}>Edit Profile Photo</div>}
        </div>
    );
};

// Styles for the NetworkingPage
const styles = {
    networkingPage: {
        display: 'flex',
        justifyContent: 'center', // Center the card container
        padding: '20px',
    },
    cardContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center', // Center the cards within the container
        width: '70%', // Adjusted width
    },
    dialog: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '20px',
        backgroundColor: 'white',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
        zIndex: 1000,
    },
};

export default NetworkingPage;
