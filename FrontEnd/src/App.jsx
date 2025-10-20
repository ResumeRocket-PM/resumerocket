import { BrowserRouter, Routes, Route, Outlet, Navigate, useParams } from 'react-router-dom';
import HomePage from './components/pages/HomePage/HomePage.jsx';
import NotFoundPage from './components/pages/NotFoundPage.jsx';
import LoginPage from './components/pages/LoginPage.jsx';
import ResumeListPage from "./components/pages/ResumeListPage/ResumeListPage.jsx";
import PortfolioPage from "./components/pages/PortfolioPage.jsx";
import NetworkingPage from "./components/pages/NetworkingPage/NetworkingPage.jsx";
import CreateResume from "./components/pages/CreateResume.jsx";
import Navbar from './components/Navbar.jsx';
import './styles/App.css';
import { AuthContext } from './context/AuthProvider.jsx';
import { UserInfoProvider } from './context/UserInfoProvider.jsx';
import PrivateRoute from './route/PrivateRoute.jsx'; // Update the path as needed
import AccountPage from './components/pages/AccountPage/AccountPage.jsx';
import PortfolioContent from './components/PortfolioContent.jsx';
import { useContext, useState, useEffect } from 'react';
import { PortfolioEditProvider } from './context/PortfolioEditProvider.jsx';
import ResumePage from './components/pages/ResumePages/ResumePage.jsx';
import FloatingChatButton from './components/FloatChatBox';
import { Snackbar, Button, Slide } from '@mui/material'
import { useVersionCheck } from './hooks.js'


function App() {
    const { isLoggedIn } = useContext(AuthContext);
    const { projectNum } = useParams();

    const updateAvailable = useVersionCheck(3 * 60 * 1000) // check every 3 minutes
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (updateAvailable) setOpen(true)
    }, [updateAvailable])

    const handleReload = () => {
        window.location.reload(true)
    }


    return (
      <>
          <Snackbar
            open={open}
            TransitionComponent={SlideUpTransition}
            message="A new version of the app is available."
            action={
              <Button color="secondary" size="small" onClick={handleReload}>
                Reload
              </Button>
            }
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <LoginPage />} />
                    <Route path="/login-demo" element={isLoggedIn ? <Navigate to="/home" /> : <LoginPage demo={true} />} />
                    <Route path="/about" element={<HomePage />} />
                    <Route
                        path="/portfolio/preview/about"
                        element={
                            <PortfolioEditProvider>
                                <PortfolioContent
                                    selectedPage="about" // Set the default selected page
                                    editMode={false} // Set editMode to false for preview
                                    viewMode={true} // Set viewMode to true for preview
                                />
                            </PortfolioEditProvider>
                        }
                    />
                    <Route
                        path="/portfolio/preview/project/:projectNum"
                        element={
                            <PortfolioEditProvider>
                                <PortfolioProjectWrapper/>
                            </PortfolioEditProvider>
                        }
                    />
                    <Route path="/:portfolioId/portfolio" element={<RedirectToAbout />} />
                    <Route
                        path="/:portfolioId/portfolio/about"
                        element={
                            <PortfolioEditProvider>
                                <PortfolioContent
                          selectedPage="about" // Set the default selected page
                          editMode={false} // Set editMode to false for preview
                          viewMode={true} // Set viewMode to true for preview
                                />
                            </PortfolioEditProvider>
                        }
                    />
                    {/* <Route path="/:portfolioId/portfolio/project/:projectNum" element={<RedirectProject />} /> */}
                    <Route
                        path="/:portfolioId/portfolio/project/:projectNum"
                        element={
                            <PortfolioEditProvider>
                                {/* <PortfolioContent
                                    selectedPage={`project${projectNum}`} // Set the default selected page
                                    editMode={false} // Set editMode to false for preview
                                    viewMode={true} // Set viewMode to true for preview
                                /> */}
                                <PortfolioProjectWrapper/>
                            </PortfolioEditProvider>
                        }
                    />
                    {/* Layout route for pages that include the Navbar, wrapped with PrivateRoute */}
                    <Route element={<PrivateRoute><LayoutWithNavbar /></PrivateRoute>}>
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/about" element={<HomePage />} />
                        <Route path="/resume" element={<ResumePage />} />
                        <Route path="/create-resume/:_resumeId?" element={<ResumePage page={'edit'} />} />
                        <Route path="/create-resume/:_resumeId/:_applicationId" element={<ResumePage page={'edit'} />} />
                        <Route path="/portfolio" element={<PortfolioEditProvider><PortfolioPage/></PortfolioEditProvider>} />
                        <Route path="/networking" element={<NetworkingPage />} />
                        <Route path="/account" element={<AccountPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
      </>
    );
}

const LayoutWithNavbar = () => (
    <>
        <Navbar />
        <Outlet />
        <FloatingChatButton /> {/* Add FloatingChatButton here */}
    </>
);

const PortfolioProjectWrapper = () => {
    const { projectNum } = useParams();
    return (
        <PortfolioContent
            selectedPage={`project${projectNum}`}
            editMode={false}
            viewMode={true}
        />
    );
};

const RedirectToAbout = () => {
    const { portfolioId } = useParams();
    return <Navigate to={`/${portfolioId}/portfolio/about`} />;
};

const RedirectProject = () => {
    const { portfolioId, projectNum } = useParams();
    return <Navigate to={`/${portfolioId}/portfolio/project/${projectNum}`} />;
};

function SlideUpTransition(props) {
  return <Slide {...props} direction="up" />
}

export default App;
