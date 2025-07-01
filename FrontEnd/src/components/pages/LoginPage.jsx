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
            {/* <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
            integrity="sha384-k6RqeWecC7o1e4e1KjSiXmV9MWwIKK9hv5u6zwWfHK5Dv3CD5jg5T0Rb2hqyf6xs"
            crossorigin="anonymous"
            /> */}


            <div className="login-page">
                {loading ? (
                    <CircularProgress/>
                ) : (
                    <div className="content-container">
                        <div className="image-container">
                        <img src={resumeRocket} alt="Resume Rocket" />
                        </div>

                        <div className="form-container">
                            
                            <h2> 
                            Resume Rocket
                            </h2>
                            <LoginForm demo={demo} setloading={setLoading} />
                            <Link to={`/about`}  align='center'>
                                { 'About' }
                            </Link>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginPage;

