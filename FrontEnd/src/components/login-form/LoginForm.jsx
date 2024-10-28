import React, { useState, useContext } from 'react';
import './LoginForm.css'; // make sure to create a corresponding CSS file
import { useSpring, animated } from 'react-spring';

import {AccountCircle, Lock, VisibilityOff, Visibility} from '@mui/icons-material';
import {Card, CardContent, Typography, TextField, Menu, MenuItem, Button, InputAdornment, IconButton} from '@mui/material/';
import { useNavigate } from 'react-router-dom';
import {useAuth} from '../../hooks.js'
import { useApiWithoutToken } from '../../hooks.js';
import { portfolioContentDefault } from '../../example_responses/portfolioContent.js';
import { ImageContext } from '../../context/ImageProvider.jsx';


const LoginForm = () => {
  const { login } = useAuth();
  const { fetchNewSASToken } = useContext(ImageContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const api = useApiWithoutToken();


  const [values, setValues] = useState({
    password: '',
    confirmPassword: '',
    showPassword: false,
    firstName: null,
    lastName: null
  });

  const handleMouseDownPassword = () => {
    setValues({ ...values, showPassword: true });
  };

  const handleMouseUpPassword = () => {
    setValues({ ...values, showPassword: false });
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };



  const [showLogin, setShowLogin] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);

  const [incorrectPassword, setIncorrectPassword] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [passwordsDoNotMatch, setPasswordsDoNotMatch] = useState(false);

  const [incorrectFirstName, setIncorrectFirstName] = useState(false);
  const [incorrectLastName, setIncorrectLastName] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleCreateAccount = async (event) => {
    if(showCreateAccount)
    {

      api.postForm('/account', {
        "emailAddress": username,
        "password": values.password,
        "firstName": values.firstName,
        "lastName": values.lastName
      }).then(response => {
        if (response.ok) {
          response.json().then(data => {

            if(data.result.isAuthenticated === true)
            {
              console.log('data', data)
              login(data.result.jsonWebToken);
              navigate('/account', { replace: true });
              fetchNewSASToken();
            }
            
          });
        }
        else if (response.status === 400) {
          response.json().then(x => {
            console.log(x);
          })
        }
        else {
          console.log("Failed to save account");
        }
      })
    }



    setShowLogin(false); 
    setShowCreateAccount(true); 
  }
  
  const handleLogin = async (event) => {

    if(showLogin)
    {    
      api.postForm('/authenticate', {
        "emailAddress": username,
        "password": values.password
      }).then(response => {
        if (response.ok) {
          response.json().then(data => {
            if(data.result.isAuthenticated)
            {
              setIncorrectPassword(false);
              login(data.result.jsonWebToken);
              navigate('/account', { replace: true });
            }
            else
            {
              setIncorrectPassword(true);
            }
          });

        }
        else if (response.status === 400) {
          response.json().then(x => {
            console.log(x);
          })
        }
        else {
          console.log("Failed to save account");
        }
      }).then(response => {
        fetchNewSASToken();
      })
    }

    setShowLogin(true); 
    setShowCreateAccount(false); 
  };

  const formSpring = useSpring({
    opacity: showCreateAccount || showLogin  ? 1 : 0,
    transform: (showCreateAccount || showLogin) ? 'translateY(0)' : 'translateY(-50px)',
  });

  return (
    <div>
      <form onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault(); // Prevent default form submission behavior
          if (showLogin) {
            handleLogin(); // Trigger login
          } else if (showCreateAccount) {
            handleCreateAccount(); // Trigger create account
          }
        }
      }}>


        <div className="login-form-container">

                <div className="login-form" > <animated.div style={formSpring}>
                {showCreateAccount && (<>

                    <h3> 
                    Create Account
                    </h3>

                    <div className="form-group">
                        <TextField label="EmailAddress"
                        fullWidth
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <AccountCircle/>
                              </InputAdornment>
                            ),
                          }}
                         id="username" 
                        placeholder="austin@resumerocket.com"
                        value={username}
                        onChange={(e) => {
                          setUsername(e.target.value);
                          setInvalidEmail(!validateEmail(e.target.value));
                        }}
                        error={invalidEmail} // Set error state
                        helperText={invalidEmail ? "Must be a valid EmailAddress" : ""}
                        variant="standard"/>
                    </div>

                    <div className="form-group">
                    <TextField
                        fullWidth
                        id="password"
                        variant="standard"
                        placeholder="password"
                        required
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={(e) => {
                          handleChange('password')(e);
                          setInvalidPassword(e.target.value.length <= 6); // Validate password length
                        }}
                        error={invalidPassword} // Set error state
                        helperText={invalidPassword ? "Password must be longer than 6 characters" : ""}

                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                  <Lock/>
                                </InputAdornment>
                              ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                    onMouseLeave={handleMouseUpPassword}
                                    >
                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                          }}
                    />
                    </div>

                    <div className="form-group">
                    <TextField
                        fullWidth
                        id="confirmPassword"
                        variant="standard"
                        required
                        placeholder="confirm password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.confirmPassword}
                        onChange={(e) => {
                          handleChange('confirmPassword')(e);
                          setPasswordsDoNotMatch(e.target.value !== values.password); // Validate if passwords match
                        }}
                        error={passwordsDoNotMatch} // Set error state
                        helperText={passwordsDoNotMatch ? "Passwords do not match" : ""} 
                        
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                  <Lock/>
                                </InputAdornment>
                              ),
                          }}
                    />
                    </div>

                    <div className="form-group">
                    <TextField
                        fullWidth
                        id="firstName"
                        variant="standard"
                        required
                        placeholder="first name"
                        type='text'
                        value={values.firstName}
                        onChange={(e) => {
                          handleChange('firstName')(e);
                          setIncorrectFirstName(e.target.value.length === 0 || e.target.value.length > 25);
                        }}
                        error={incorrectFirstName} // Set error state
                        helperText={incorrectFirstName ? "Must be less than 25 characters" : ""} 
                    />
                    </div>

                    <div className="form-group">
                    <TextField
                        fullWidth
                        id="lastName"
                        variant="standard"
                        required
                        placeholder="last name"
                        type='text'
                        value={values.lastName}
                        onChange={(e) => { 
                          handleChange('lastName')(e);
                          setIncorrectLastName(e.target.value.length === 0 || e.target.value.length > 25); // Validate if passwords match
                        }}
                        error={incorrectLastName} // Set error state
                        helperText={incorrectLastName ? "must be less than 25 characters" : ""} 
                    />
                    </div>


                    <div className="form-actions internal-block">
                      <Button className="button loginButton" onClick={handleCreateAccount}>Create Account</Button>
                    </div>


                </>)}
                {showLogin && (<>
                    <h3> 
                    Login
                    </h3>

                    <div className="form-group">
                        <TextField label="EmailAddress"
                        fullWidth
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <AccountCircle/>
                              </InputAdornment>
                            ),
                          }}
                         id="username" 
                        placeholder="austin@resumerocket.com"
                        value={username}
                        onChange={(e) => {
                          setUsername(e.target.value);
                          setInvalidEmail(!validateEmail(e.target.value));
                        }}
                        error={invalidEmail} // Set error state
                        helperText={invalidEmail ? "Must be a valid EmailAddress" : ""}
                        variant="standard"/>
                    </div>

                    <div className="form-group">
                    <TextField
                        fullWidth
                        id="password"
                        variant="standard"
                        placeholder="password"
                        required
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={ (e) => {
                          handleChange('password')(e);
                          setIncorrectPassword(false); 
                        }}
                        error={incorrectPassword}
                        helperText={incorrectPassword ? "Invalid password, please try again." : ""}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                  <Lock/>
                                </InputAdornment>
                              ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                    onMouseLeave={handleMouseUpPassword}
                                    >
                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                          }}
                    />
                    </div>

                    <div className="form-actions internal-block">
                      <Button className="button loginButton" onClick={handleLogin}>Login</Button>
                    </div>

                </>)}
                </animated.div>

                <div className="form-actions">
                
                    { !(showLogin || showCreateAccount ) && <Button  className="button loginButton" onClick={handleLogin}>Login</Button>} 

                    <div className="dividerContainer">
                        <hr className="divider" />
                        <span className="dividerText">or</span>
                        <hr className="divider" />
                    </div>

                  <Button className="button createButton" onClick={!showCreateAccount ? handleCreateAccount : handleLogin}>{showCreateAccount ? "Login" : "Create Account"}</Button>

                </div>
            
            </div>
        </div>
        </form>
    </div>
);};

export default LoginForm;

