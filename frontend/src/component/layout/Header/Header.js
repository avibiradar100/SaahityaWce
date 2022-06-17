import * as React from "react";
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

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 5,
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
                display: { xs: "block", md: "none" }
              }}
            >
            <MenuItem key="Home" onClick={handleCloseNavMenu}>
            <NavLink to="/" textAlign="center">Home</NavLink>
            </MenuItem>
            <MenuItem key="Products" onClick={handleCloseNavMenu}>
            <NavLink  to="/products" textAlign="center">Products</NavLink>
            </MenuItem>
            <MenuItem key="About" onClick={handleCloseNavMenu}>
             <NavLink to="/about" textAlign="center">About</NavLink>
            </MenuItem>
            <MenuItem key="LoginSignup" onClick={handleCloseNavMenu}>
             <NavLink to="/login" textAlign="center">Login / SignUp</NavLink>
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
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none"
            }}
          >
            BestShop
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <NavLink
              key="Home"
              to="/"
              sx={{ ml:30,my: 2, color: "white", display: "block" }}
            >
              Home
            </NavLink>
            <NavLink
              key="Products"
              to="/products"
              sx={{ mx:2,my: 2, color: "white", display: "block" }}
            >
              Products
            </NavLink>
            <NavLink
              key="contacts"
              to='/contact'
              sx={{ mx:2,my: 2, color: "white", display: "block" }}
            >
              Contact
            </NavLink>
            <NavLink
              key="About"
              to="/about"
              sx={{ mx:2,my: 2, color: "white", display: "block" }}
            >
              About
            </NavLink>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
