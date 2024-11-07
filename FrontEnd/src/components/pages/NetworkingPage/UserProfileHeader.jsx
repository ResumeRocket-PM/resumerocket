import {useEffect, useContext, useState} from 'react';
import userSolidOrange from "../../../assets/user-solid-orange.svg"; // Default image
import accountBanner from '../../../assets/account-banner.png';
import { Link } from 'react-router-dom';
import { ImageContext } from '../../../context/ImageProvider';

const UserProfileHeader = ({userDetails}) => {

  const { showImage } = useContext(ImageContext);
  const [profilePhoto, setProfilePhoto] = useState(null);


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
            setProfilePhoto(url);
        }
    } else {
        setProfilePhoto(userSolidOrange);
    }
}, [userDetails]);

  console.log(userDetails);

  return (
    <div style={{ position: 'relative', margin: 0, padding: 0 }}>
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
          src={accountBanner} // Add accountBanner to userDetails
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
        }}
      />

      <div id="account-page-main-header-section">
        <div id='account-page-user-header-details' className='v-center' style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h1>{userDetails.firstName} {userDetails.lastName}</h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h2>{userDetails.title}</h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h3>{userDetails.location}</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Link to={`/create-resume/${userDetails.primaryResumeId}`} style={{ textAlign: 'center' }}>
                {userDetails.primaryResumeId != null ? 'View Resume' : null }
            </Link>
            <Link to={userDetails.portfolioLink} style={{textAlign: 'center'}}>
                {userDetails.portfolioLink != null ? 'View Portfolio' : null }
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileHeader;
