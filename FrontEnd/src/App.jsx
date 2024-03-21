// import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
// import Home from './components/layouts/Home.jsx'
// import Profile from './components/layouts/Profile.jsx'
// import SignIn from './components/layouts/SignIn.jsx'
// import CreateProfile from './components/layouts/CreateProfile.jsx'
import Navbar from './components/Navbar.jsx'
import './styles/App.css'

function App() {

  return (
    <BrowserRouter>
      <div className="AppBackground">
        <Navbar/>
          {/* <Routes>
            <Route index element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/create-profile" element={<CreateProfile />} />
            <Route path="/:username" element={<Profile />} /> 
          </Routes> */}
      </div>
    </BrowserRouter>
  )
}

export default App
