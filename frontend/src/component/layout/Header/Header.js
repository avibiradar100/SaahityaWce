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
                display: { xs: "block", md: "none" }
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
              to="/"
              className={"first"}
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              className={"navBarLink"}
            >
              Products
            </NavLink>
            <NavLink
              to="/about"
              className={"navBarLink"}
            >
              About
            </NavLink>
            <NavLink
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
