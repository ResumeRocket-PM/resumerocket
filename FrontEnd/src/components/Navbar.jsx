import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/Navbar.css";
import rocket from "../assets/rocket-solid.svg";
import fileIcon from "../assets/file-solid.svg";
import fileIconOrange from "../assets/file-solid-orange.svg";
import briefCaseIcon from "../assets/briefcase-solid.svg";
import briefCaseIconOrange from "../assets/briefcase-solid-orange.svg";
import usersIcon from "../assets/users-solid.svg";
import usersIconOrange from "../assets/users-solid-orange.svg";
import IconButton from "@mui/material/IconButton";
import ForumIcon from "@mui/icons-material/Forum";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Menu, MenuItem } from "@mui/material";
import { useAuth } from '../hooks.js';

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeNavLink, setActiveNavLink] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, isLoggedIn } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');

  const handleAccountButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    logout();
    navigate('/', { replace: true });
    handleAccountMenuClose();
  };

  const handleNavLinkClick = (link) => {
    setActiveNavLink(link);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/networking?query=${searchQuery}`);
    }
  };

  useEffect(() => {
    if (location.pathname.includes('/resume-list')) setActiveNavLink('/resume-list');
    else if (location.pathname.includes('/portfolio')) setActiveNavLink('/portfolio');
    else if (location.pathname.includes('/networking')) setActiveNavLink('/networking');
    else setActiveNavLink(null);
    setSearchQuery(''); 
  }, [location]);


  return (
    <>
      <nav id="navbar">
        <Link to="/" id="logo_name">
          <img id="logo" src={rocket} alt="logo" />
          <h1 id="brand_name">Resume Rocket</h1>
        </Link>

        <div id="nav_links">
          <Link to="/resume" className="nav_link" onClick={() => handleNavLinkClick('/resume')}>
            <img src={activeNavLink === '/resume' ? fileIconOrange : fileIcon} alt="resume" />
            <p>Resume</p>
          </Link>
          {/* <Link to="/resume-list" className="nav_link" onClick={() => handleNavLinkClick('/resume-list')}>
            <img src={activeNavLink === '/resume-list' ? fileIconOrange : fileIcon} alt="resume" />
            <p>Resume</p>
          </Link> */}
          <Link to="/portfolio" className="nav_link" onClick={() => handleNavLinkClick('/portfolio')}>
            <img src={activeNavLink === '/portfolio' ? briefCaseIconOrange : briefCaseIcon} alt="portfolio" />
            <p>Portfolio</p>
          </Link>
          <Link to="/networking" className="nav_link" onClick={() => handleNavLinkClick('/networking')}>
            <img src={activeNavLink === '/networking' ? usersIconOrange : usersIcon} alt="networking" />
            <p>Networking</p>
          </Link>
        </div>

        <div id="search_and_account">
          <input
            type="text"
            placeholder="Search Users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid black',
              marginRight: '15px',
            }}
          />

          {/* <IconButton aria-label="messaging">
            <ForumIcon fontSize="large" />
          </IconButton> */}

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
            <MenuItem onClick={handleSignOut}>
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                Sign Out
              </Link>
            </MenuItem>

            {isLoggedIn && 
              <MenuItem onClick={handleAccountMenuClose}>
                <Link to="/account" style={{ textDecoration: "none", color: "inherit" }}>
                  Account
                </Link>
              </MenuItem>
            }
          </Menu>
        </div>
      </nav>
    </>
  );
}
