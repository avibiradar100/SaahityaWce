import * as React from "react";
import './SCSS/Header.css'
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import { NavLink } from "react-router-dom";
import { BsSearch, BsFillCartCheckFill } from "react-icons/bs";

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar className="appbar" position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none"
            }}
          >
            BestShop
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left"
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none"}
              }}
            >
            <MenuItem key="Home" onClick={handleCloseNavMenu}>
            <NavLink to="/">Home</NavLink>
            </MenuItem>
            <MenuItem key="Products" onClick={handleCloseNavMenu}>
            <NavLink  to="/products">Products</NavLink>
            </MenuItem>
            <MenuItem key="About" onClick={handleCloseNavMenu}>
             <NavLink to="/about">About</NavLink>
            </MenuItem>
             <MenuItem key="Search" onClick={handleCloseNavMenu}>
             <NavLink to="/search">
              <BsSearch className="facebook1" />
             </NavLink>
            </MenuItem>
            <MenuItem key="Cart" onClick={handleCloseNavMenu}>
              <NavLink to="/cart">
              <BsFillCartCheckFill className="facebook1" />
              </NavLink>
            </MenuItem>
            <MenuItem key="LoginSignup" onClick={handleCloseNavMenu}>
             <NavLink to="/login">Login / SignUp</NavLink>
            </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              ml: 1,
              display: { xs: "flex", md: "none" },
              flexGrow: 2,
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none"
            }}
          >
            BestShop
          </Typography>
          <Box sx={{flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <NavLink
              key="Home" 
              to="/"
              className={"first"}
            >
              Home
            </NavLink>
            <NavLink
              key="Products" 
              to="/products"
              className={"navBarLink"}
            >
              Products
            </NavLink>
            <NavLink
              key="About" 
              to="/about"
              className={"navBarLink"}
            >
              About
            </NavLink>
             <NavLink
              key="Search" 
              to="/search"
              className={"navBarLink"}
            >
              <BsSearch className="facebook" />
            </NavLink>
            <NavLink
              key="Cart" 
              to="/cart"
              className={"navBarLink"}
            >
              <BsFillCartCheckFill className="facebook" />
            </NavLink>
            <NavLink
              key="LoginsignUp" 
              to="/login"
              className={"navBarLink"}
            >
              Login / Signup
            </NavLink>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
