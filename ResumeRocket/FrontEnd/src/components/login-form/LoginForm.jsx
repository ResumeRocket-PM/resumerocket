import React, { useState } from 'react';
import './LoginForm.css'; // make sure to create a corresponding CSS file
import { useSpring, animated } from 'react-spring';

import {AccountCircle, Lock, VisibilityOff, Visibility} from '@mui/icons-material';
import {Card, CardContent, Typography, TextField, Menu, MenuItem, Button, InputAdornment, IconButton} from '@mui/material/';

const LoginForm = () => {
  const [username, setUsername] = useState('');

  const [values, setValues] = useState({
    password: '',
    confirmPassowrd: '',
    showPassword: false,
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

  const handleCreateAccount = async (event) => {
    console.log("create"); 
    setShowLogin(false); 
    setShowCreateAccount(true); 
}
  
  const handleLogin = async (event) => {
    console.log("log in"); 
    setShowLogin(true); 
    setShowCreateAccount(false); 
};

  const formSpring = useSpring({
    opacity: showCreateAccount || showLogin  ? 1 : 0,
    transform: (showCreateAccount || showLogin) ? 'translateY(0)' : 'translateY(-50px)',
  });


  return (
    <div>
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
                        onChange={(e) => setUsername(e.target.value)}
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
                        onChange={handleChange('password')}
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
                        id="confirmPassowrd"
                        variant="standard"
                        required
                        placeholder="confirm password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.confirmPassowrd}
                        onChange={handleChange('confirmPassowrd')}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                  <Lock/>
                                </InputAdornment>
                              ),
                          }}
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
                        onChange={(e) => setUsername(e.target.value)}
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
                        onChange={handleChange('password')}
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
    </div>
);};

export default LoginForm;

