import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import HomePage from './components/pages/HomePage.jsx'
import NotFoundPage from './components/pages/NotFoundPage.jsx'
import LoginPage from './components/pages/LoginPage.jsx'
// import Profile from './components/layouts/Profile.jsx'
// import SignIn from './components/layouts/SignIn.jsx'
// import CreateProfile from './components/layouts/CreateProfile.jsx'
import ResumeListPage from "./components/pages/ResumeListPage.jsx";
import PortfolioPage from "./components/pages/PortfolioPage.jsx";
import NetworkingPage from "./components/pages/NetworkingPage.jsx";
import CreateResume from "./components/pages/CreateResume.jsx";
import Navbar from './components/Navbar.jsx'
import './styles/App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="AppBackground">
        <Routes>
          {/* The index route is the Login page which will not render the Navbar */}
          {/* <Route index element={<LoginPage />} />  */}
          
          {/* Layout route for pages that include the Navbar */}
          <Route element={<LayoutWithNavbar />}>
            <Route path="" element={<HomePage />} />
            <Route path="resume-list" element={<ResumeListPage />} />
            <Route path="portfolio" element={<PortfolioPage />} />
            <Route path="networking" element={<NetworkingPage />} />
            <Route path="create-resume" element={<CreateResume />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}


const LayoutWithNavbar = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);


export default App
