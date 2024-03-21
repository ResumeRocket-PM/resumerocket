// import MenuItem from "@mui/material/MenuItem";
// import { useAuth } from '../AuthHooks.jsx';
import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/Navbar.css";
import microchipImage from "../assets/rocket-solid.svg";
import IconButton from "@mui/material/IconButton";
import ForumIcon from "@mui/icons-material/Forum";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";

// import { fetchCurrentUserData } from '../utils/apiCalls';


export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
//   const { currentUser, updateCurrentUser } = useAuth();
  // const [isSignedIn, setIsSignedIn] = useState(false);
//   const navigate = useNavigate();

  //setup----------
  // const userData = fetchCurrentUserData();
  // updateCurrentUser(userData);
  //---------------

  const handleAccountButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAnchorEl(null);
  };

//   const handleSignOut = () => {
//     // Remove the token
//     sessionStorage.removeItem('authToken');
//     // Remove the user data from the AuthContext
//     updateCurrentUser(null);
//     // Navigate to the home page
//     navigate('/');

//     handleAccountMenuClose();
//   }

//   useEffect(() => {
//     const authToken = sessionStorage.getItem('authToken');
//     if (authToken) {
//       // setIsSignedIn(true);
      
//       // Fetch current user data and update the AuthContext
//       fetchCurrentUserData()
//         .then(userData => {
//           updateCurrentUser(userData);
//         })
//         .catch(error => {
//           console.error('Error fetching user data:', error);
//         });
//     } else {
//       // setIsSignedIn(false);
//     }
//   }, []);

  return (
    <>
      <nav id="navbar">
        <div id="logo_name">
          <Link to="/" id="logo_name">
            <img id="logo" src={microchipImage} alt="logo" />
            <h1 id="brand_name">DevExpo</h1>
          </Link>
        </div>
        <div id="nav_buttons">
          <IconButton aria-label="messaging">
            <ForumIcon fontSize="large" />
          </IconButton>

          <IconButton
            aria-controls="account-menu"
            aria-haspopup="true"
            onClick={handleAccountButtonClick}
            color="inherit"
            size="large"
          >
            <AccountCircleIcon fontSize="large" />
          </IconButton>

          <Menu
            id="account-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleAccountMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            getcontentanchorel={null}
          >
            {/* {currentUser && (
              <MenuItem onClick={handleAccountMenuClose}>
                <Link to={`/${currentUser.username}`} style={{ textDecoration: "none", color: "inherit" }}>
                  View Profile
                </Link>
              </MenuItem>
            )}
            {!currentUser && (
              <MenuItem onClick={handleAccountMenuClose}>
                <Link
                  to="/signin"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Sign In
                </Link>
              </MenuItem>
            )}
            {currentUser && (
              <MenuItem onClick={handleSignOut}>
                <Link
                  to="/"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Sign Out
                </Link>
              </MenuItem>
            )} */}
          </Menu>
        </div>
      </nav>
    </>
  );
}
