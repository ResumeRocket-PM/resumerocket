import { useContext, useState, useEffect } from 'react';
import userSolidOrange from "../../../assets/user-solid-orange.svg"
import { ImageContext } from '../../../context/ImageProvider';
import userLightRed from "../../../assets/colored-user-icons/circle-user-light-red.svg";
import userPink from "../../../assets/colored-user-icons/circle-user-pink.svg";
import userPurple from "../../../assets/colored-user-icons/circle-user-purple.svg";
import userRaspberryRose from "../../../assets/colored-user-icons/circle-user-raspberry-rose.svg";
import userSpaceCadet from "../../../assets/colored-user-icons/circle-user-space-cadet.svg";
import userVerdigris from "../../../assets/colored-user-icons/circle-user-verdigris.svg";

const UserCard = ({ userDetails, onClick, isSelected, isMobile }) => {

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
                // If ProfilePhotoLink is a color string, map it to the correct SVG
                switch (url) {
                    case "light-red":
                        setProfilePhoto(userLightRed);
                        break;
                    case "pink":
                        setProfilePhoto(userPink);
                        break;
                    case "purple":
                        setProfilePhoto(userPurple);
                        break;
                    case "raspberry-rose":
                        setProfilePhoto(userRaspberryRose);
                        break;
                    case "space-cadet":
                        setProfilePhoto(userSpaceCadet);
                        break;
                    case "verdigris":
                        setProfilePhoto(userVerdigris);
                        break;
                    default:
                        setProfilePhoto(userSolidOrange);
                }
            }
        } else {
            setProfilePhoto(userSolidOrange);
        }
    }, [userDetails]);

    // console.log("profilePhoto:", profilePhoto);

    return (
        <div
            className='networking-page-user-card'
            style={{
                ...styles.userCard,
                ...(isMobile ? mobileStyles.userCard : {}),
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
                <h3 style={styles.userName}>{userDetails.FirstName} {userDetails.LastName}</h3>
                <h3 style={styles.userTitle}className="nwp-user-title">{userDetails.Title}</h3>
                <h4 style={styles.userLocation} className="nwp-user-location">{userDetails.StateLocation}</h4>
            </div>
        </div>
    );
};

// Styles defined within the same file
const styles = {
    userCard: {
        width: '350px', // Adjust the width for a smaller card
        padding: '1rem 0 1rem 1rem',
        borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        position: 'relative',
        textAlign: 'center',
        margin: '5px', // Add margin if needed
        cursor: 'pointer', // Indicate that the card is clickable

        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '20px',

    },
    profilePicture: {
        width: '85px', // Smaller profile picture
        height: '85px',
        minWidth: '85px', // Smaller profile picture
        minHeight: '85px',
        borderRadius: '50%',
        border: '2px solid black',
        zIndex: 1,
    },
    userHeaderDetails: {
        // position: 'relative',
        // zIndex: 2,
        height: '85px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        justifyContent: 'start',
    },
    userName: {
        textAlign: 'start',
    },
    userTitle: {
        fontWeight: '300', // Lighter font weight for title
        fontSize: '1em', // Slightly smaller title
        // display: 'flex',
        // flexDirection: 'row',        
        // justifyContent: 'start',
        textAlign: 'start',
    },
    userLocation: {
        fontSize: '0.8em', // Smaller state location
        color: '#999',
        fontWeight: '300', // Lighter font weight for location
        textAlign: 'start',
    },
};

const mobileStyles = {
    userCard: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '20px',
    },

    // profilePicture: {
    //     width: '80px', // Adjusted for mobile
    //     height: '80px',       
    // },
}

export default UserCard;
