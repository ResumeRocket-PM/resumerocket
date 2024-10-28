import { useContext, useState, useEffect } from 'react';
import userSolidOrange from "../../../assets/user-solid-orange.svg"
import { ImageContext } from '../../../context/ImageProvider';


const UserCard = ({ userDetails, onClick, isSelected }) => {

    const { showImage } = useContext(ImageContext);
    const [profilePhoto, setProfilePhoto] = useState(null);

    useEffect(() => {
        // if there is an image URL
        if (userDetails?.ProfilePhotoLink) {
            const url = userDetails.ProfilePhotoLink;
            const regex = /https:\/\/resumerocketimages\.blob\.core\.windows\.net\/images\/[a-f0-9-]+$/;
            let imageId = '';
    
            if (regex.test(url)) {
                imageId = url.split('/').pop();
                showImage(url, imageId)
                    .then(blob => {
                        const objectUrl = URL.createObjectURL(blob);
                        setProfilePhoto(objectUrl);
                    })
                    .catch(err => {
                        console.error(err);
                    });
            } else {
                setProfilePhoto(url);
            }
        } else {
            setProfilePhoto(userSolidOrange);
        }
    }, [userDetails]);

    return (
        <div
            style={{
                ...styles.userCard,
                border: isSelected ? '2px solid #007bff' : '1px solid #ddd', // Highlight selected card
            }}
            onClick={onClick} // Trigger the onClick function to handle selection
        >
            {/* Profile Picture */}
            <img
                className='networking-page-card-profile-picture'
                // src={userDetails.ProfilePhotoLink != null ? userDetails.ProfilePhotoLink : userSolidOrange}
                src={profilePhoto}
                alt="profile"
                style={styles.profilePicture}
            />
            
            <div style={styles.userHeaderDetails}>
                <h1 style={styles.userName}>{userDetails.FirstName} {userDetails.LastName}</h1>
                <div style={styles.userTitle}>
                    <h2>{userDetails.Title}</h2>
                </div>
                <div style={styles.userLocation}>
                    <h3>{userDetails.StateLocation}</h3>
                </div>
            </div>
        </div>
    );
};

// Styles defined within the same file
const styles = {
    userCard: {
        width: '200px', // Adjust the width for a smaller card
        padding: '2px',
        borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        position: 'relative',
        textAlign: 'center',
        margin: '5px', // Add margin if needed
        cursor: 'pointer', // Indicate that the card is clickable
    },
    profilePicture: {
        width: '40px', // Smaller profile picture
        height: '40px',
        borderRadius: '50%',
        border: '2px solid white',
        zIndex: 1,
    },
    userHeaderDetails: {
        position: 'relative',
        zIndex: 2,
    },
    userName: {
        fontSize: '1.2em', // Slightly larger name
        margin: '5px 0',
    },
    userTitle: {
        fontSize: '0.9em', // Smaller title
        color: '#666',
        margin: '3px 0',
    },
    userLocation: {
        fontSize: '0.8em', // Smaller state location
        color: '#999',
        margin: '3px 0',
    },
};

export default UserCard;
