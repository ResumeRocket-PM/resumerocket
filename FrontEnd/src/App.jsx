import { BrowserRouter, Routes, Route, Outlet, Navigate, useParams } from 'react-router-dom';
import HomePage from './components/pages/HomePage.jsx';
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
import { useContext } from 'react';
import { PortfolioEditProvider } from './context/PortfolioEditProvider.jsx';
import { ResumeProvider } from './context/ResumeProvider.jsx';
import ResumePage from './components/pages/ResumePages/ResumePage.jsx';
import FloatingChatButton from './components/FloatChatBox';

function App() {
    const { isLoggedIn } = useContext(AuthContext);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <LoginPage />} />
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

                {/* Layout route for pages that include the Navbar, wrapped with PrivateRoute */}
                <Route element={<PrivateRoute><LayoutWithNavbar /></PrivateRoute>}>
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/resume" element={<ResumeProvider><ResumePage /></ResumeProvider>} />
                    <Route path="/create-resume/:_resumeId?" element={<CreateResume />} />
                    <Route path="/create-resume/:_resumeId/:_applicationId" element={<CreateResume />} />
                    <Route path="/portfolio" element={<PortfolioEditProvider><PortfolioPage/></PortfolioEditProvider>} />
                    <Route path="/networking" element={<NetworkingPage />} />
                    <Route path="/account" element={<AccountPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
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

export default App;
