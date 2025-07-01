import {useEffect, useContext, useState} from 'react';
import userSolidOrange from "../../../assets/user-solid-orange.svg"; // Default image
import accountBanner from '../../../assets/account-banner.png';
import { Link } from 'react-router-dom';
import { ImageContext } from '../../../context/ImageProvider';
import ResumeDisplayDialog from '../ResumePages/ResumeDisplayDialog';
import { Chip } from '@mui/material';
import userLightRed from "../../../assets/colored-user-icons/circle-user-light-red.svg";
import userPink from "../../../assets/colored-user-icons/circle-user-pink.svg";
import userPurple from "../../../assets/colored-user-icons/circle-user-purple.svg";
import userRaspberryRose from "../../../assets/colored-user-icons/circle-user-raspberry-rose.svg";
import userSpaceCadet from "../../../assets/colored-user-icons/circle-user-space-cadet.svg";
import userVerdigris from "../../../assets/colored-user-icons/circle-user-verdigris.svg";

const UserProfileHeader = ({userDetails}) => {

  const { showImage } = useContext(ImageContext);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [backgroundPhoto, setBackgroundPhoto] = useState(null);
  const [resumeDisplayDialogOpen, setResumeDisplayDialogOpen] = useState(false);


  useEffect(() => {
    // if there is an image URL
    if (userDetails?.profilePhotoLink) {
        const url = userDetails.profilePhotoLink;
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

    if (userDetails?.backgroundPhotoLink) {
        const url = userDetails.backgroundPhotoLink;
        const regex = /https:\/\/resumerocketimages\.blob\.core\.windows\.net\/images\/[a-f0-9-]+$/;
        let imageId = '';

        if (regex.test(url)) {
            imageId = url.split('/').pop();
            showImage(url, imageId)
                .then(blob => {
                    const objectUrl = URL.createObjectURL(blob);
                    setBackgroundPhoto(objectUrl);
                })
                .catch(err => {
                    console.error(err);
                });
        } else {
            setBackgroundPhoto(url);
        }
    } else {
        setBackgroundPhoto(accountBanner);
    }
}, [userDetails]);

  console.log(userDetails);

  return (
    <div className='account-page-section-card' style={{ position: 'relative', margin: 0, padding: 0 }}>
      {/* Background Image */}
      <div
        style={{
          position: 'relative',
          height: '200px',
          overflow: 'hidden',
          margin: 0,
          padding: 0,
        }}
      >
        <img
          id="background-image"
          src={backgroundPhoto}
          alt="Background"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            margin: 0,
            padding: 0,
            borderTopLeftRadius: '5px',
            borderTopRightRadius: '5px',
          }}
        />
      </div>

      {/* Profile Picture */}
      <img
        id='account-page-profile-picture'
        src={profilePhoto}
        alt="profile picture"
        style={{
          position: 'absolute',
          top: '70px',
          left: '20px',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          border: '3px solid white',
          zIndex: 1,
          backgroundColor: 'white'
        }}
      />

      <div id="account-page-main-header-section">
        <div id='account-page-user-header-details' style={{ position: 'relative', zIndex: 2, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', marginTop: '1rem' }}>

            <div>
              <h1>{userDetails.firstName} {userDetails.lastName}</h1>
              <h3 style={{fontWeight: '300'}}>{userDetails.title}</h3>
              <h4 style={{ color: '#888', fontWeight: '300', display: 'inline' }}>{userDetails.location}</h4>
            </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center', justifyContent: 'center' }}>
            {/* <Link to={`/create-resume/${userDetails.primaryResumeId}`} style={{ textAlign: 'center' }}>
                {userDetails.primaryResumeId != null ? 'View Resume' : null }
            </Link> */}
            {userDetails.primaryResumeId && 
              // <div className="clickable" style={{textAlign: 'center', color: 'blue', textDecoration: 'underline', fontSize: '17px'}} onClick={() => setResumeDisplayDialogOpen(true)}>
              //   View Resume
              // </div>

              <Chip   
                className='account-page-view-resource-button clickable'
                onClick={() => setResumeDisplayDialogOpen(true)}
                label="View Resume" 
              />
            }

            {userDetails.portfolioLink &&
              <Link to={userDetails.portfolioLink} target="_blank" rel="noopener noreferrer">
                  {userDetails.portfolioLink != null ? 
                    <Chip 
                      className='account-page-view-resource-button'
                      label="View Portfolio" 
                    />
                    : null 
                  }
              </Link>
            }

          </div>
        </div>
      </div>

      {userDetails.primaryResumeId &&
        <ResumeDisplayDialog 
          resumeId={userDetails?.primaryResumeId} 
          resumeDisplayDialogOpen={resumeDisplayDialogOpen} 
          setResumeDisplayDialogOpen={setResumeDisplayDialogOpen}
        />
      }

    </div>


  );
};

export default UserProfileHeader;
