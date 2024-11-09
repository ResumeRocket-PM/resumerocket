import { createContext, useState } from 'react';
import { useApi } from '../hooks';

const ImageContext = createContext();

const ImageProvider = ({ children }) => {
  const api = useApi();
  const [imageSASToken, setImageSASToken] = useState(localStorage.getItem('imageSASToken'));

  const storeImageSASToken = (token) => {
    localStorage.setItem('imageSASToken', token);
    setImageSASToken(token);
  }

  const fetchNewSASToken = async () => {
    try {
      const response = await api.get('/image/generateSasToken');
      const data = await response.json();
      const newToken = data.sasToken.split('?')[1]; 
      storeImageSASToken(newToken);
      return newToken;
    } catch (error) {
      console.error('Error fetching new SAS token:', error);
      return null;
    }
  };

  const showImage = async (url, imageId) => {
    let token = imageSASToken;
    let imageUrl = `${url}${token ? `?${token}` : ''}`;
    let response = null;
    console.log('imageUrl:', imageUrl);

    if (imageId == "") {
        return await fetch(imageUrl);
    }

    try {
      // Try to fetch the image to check if the token is valid
      response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error('Token expired or invalid');
      }
      return response.blob();
    } catch (error) {
      console.error('Error fetching image:', error);
      // If the token is expired or invalid, fetch a new token
      token = await fetchNewSASToken();
      if (token) {
        imageUrl = `${url}?${token}`;
        response = await fetch(imageUrl);
        return response.blob();
      }
    }
    throw new Error('Unable to fetch image');
  };

  const uploadImage = async (file, imageId="") => {
    const formData = new FormData();
    
    formData.append('file', file); 
    formData.append('imageId', imageId);

    try {
        const response = await api.postFileForm('/image/upload', formData);
        const data = await response.json();
        
        console.log(data);
        const url = data.imageUrl;
        const imageId = data.imageId;

        return { url, imageId };

    } catch (err) {
        console.error(err);
    }
  };


  return (
    <ImageContext.Provider 
      value=
      {{ 
          imageSASToken,
          fetchNewSASToken,
          showImage,
          uploadImage,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};

export { ImageProvider, ImageContext };