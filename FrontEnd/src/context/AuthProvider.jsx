import { createContext, useContext, useState } from 'react';
import { useApi } from '../hooks';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

  const login = (token) => {
    localStorage.setItem('authToken', token);
    setAuthToken(token);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setAuthToken(null);
  };


  const isLoggedIn = !!authToken;
  console.log("isLoggedIn: ", isLoggedIn);
  // console.log("authToken: ", authToken);


  return (
    <AuthContext.Provider 
      value=
      {{  authToken,
          login,
          logout, 
          isLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };