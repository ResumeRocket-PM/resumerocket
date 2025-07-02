import '../../styles/LoginPage.css'; // make sure to create a corresponding CSS file
import resumeRocket from '../../assets/resumeRocket.png'
import LoginForm from '../login-form/LoginForm';
import { Link } from 'react-router-dom';
import {useState} from 'react'
import { CircularProgress } from '@mui/material';


const LoginPage = ({demo=false}) => {

    const [loading, setLoading] = useState(false);

    return (
        <div>
            <div className="login-page">
                {loading && (
                    <div
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            background: 'rgba(0,0,0,0.4)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 1300
                        }}
                    >
                        <CircularProgress size='10rem'/>
                    </div>
                )}
                <div className="content-container">
                    <div className="image-container">
                        <img src={resumeRocket} alt="Resume Rocket" />
                    </div>

                    <div className="form-container">
                        <h2>
                            Resume Rocket
                        </h2>
                        <LoginForm demo={demo} setloading={setLoading} />
                        <Link to={`/about`} align='center'>
                            { 'About' }
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

