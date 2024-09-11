import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import HomePage from './components/pages/HomePage.jsx';
import NotFoundPage from './components/pages/NotFoundPage.jsx';
import LoginPage from './components/pages/LoginPage.jsx';
import ResumeListPage from "./components/pages/ResumeListPage.jsx";
import PortfolioPage from "./components/pages/PortfolioPage.jsx";
import NetworkingPage from "./components/pages/NetworkingPage.jsx";
import CreateResume from "./components/pages/CreateResume.jsx";
import Navbar from './components/Navbar.jsx';
import './styles/App.css';
import { AuthProvider } from './context/AuthProvider.jsx';
import PrivateRoute from './route/PrivateRoute.jsx'; // Update the path as needed
import AccountPage from './components/pages/AccountPage.jsx';
import PortfolioContent from './components/PortfolioContent.jsx';
import {portfolioContentExample} from './example_responses/portfolioContent';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
          <Routes>
            {/* The index route is the Login page which will not render the Navbar */}
            <Route path="/" element={<LoginPage />} /> 
            <Route 
                    path="/portfolio/preview" 
                    element={
                        <PortfolioContent 
                            portfolioContent={portfolioContentExample}
                            setPortfolioContent={() => {}} // Pass a dummy function or handle it appropriately
                            selectedPage="About" // Set the default selected page
                            editMode={false} // Set editMode to false for preview
                        />
                    } 
            />  
            <Route 
                    path="/portfolio/preview/experience" 
                    element={
                        <PortfolioContent 
                            portfolioContent={portfolioContentExample}
                            setPortfolioContent={() => {}} // Pass a dummy function or handle it appropriately
                            selectedPage="Experience" // Set the default selected page
                            editMode={false} // Set editMode to false for preview
                        />
                    } 
            />              
            {/* Layout route for pages that include the Navbar, wrapped with PrivateRoute */}
            <Route element={<PrivateRoute><LayoutWithNavbar /></PrivateRoute>}>
              <Route path="/landing" element={<HomePage />} />
              <Route path="/resume-list" element={<ResumeListPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />            
              <Route path="/networking" element={<NetworkingPage />} />
              <Route path="/create-resume/:id?" element={<CreateResume />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

const LayoutWithNavbar = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

export default App;