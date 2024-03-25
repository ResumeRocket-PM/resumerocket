import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './components/pages/HomePage.jsx'
// import Profile from './components/layouts/Profile.jsx'
// import SignIn from './components/layouts/SignIn.jsx'
// import CreateProfile from './components/layouts/CreateProfile.jsx'
import ResumePage from "./components/pages/ResumePage.jsx";
import PortfolioPage from "./components/pages/PortfolioPage.jsx";
import NetworkingPage from "./components/pages/NetworkingPage.jsx";
import Navbar from './components/Navbar.jsx'
import './styles/App.css'

function App() {

  return (
    <BrowserRouter>
      <div className="AppBackground">
        <Navbar/>
          <Routes>
            <Route index element={<HomePage />} />
            {/* <Route path="/signin" element={<SignIn />} />
            <Route path="/create-profile" element={<CreateProfile />} />
            <Route path="/:username" element={<Profile />} />  */}
            <Route path="/resume" element={<ResumePage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/networking" element={<NetworkingPage />} />
          </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
