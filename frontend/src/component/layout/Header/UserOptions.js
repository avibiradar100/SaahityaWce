import React, { useState } from 'react';
import "./SCSS/Header.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import Backdrop from "@material-ui/core/Backdrop";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AddIcon from "@material-ui/icons/Add";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from '../../../actions/userAction';

const UserOptions = ({ user }) => {

    const { cartItems } = useSelector((state) => state.cart);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();

    const options = [
        { icon: <AddIcon />, name: "Create", func: create },
        { icon: <PersonIcon />, name: "Profile", func: account },
        { icon: <ShoppingCartIcon style={{color:cartItems.length>0?"tomato":"unset"}} />, name: `Cart(${cartItems.length})`, func: cart },
        { icon: <ExitToAppIcon />, name: "Logout", func: logoutuser },
    ];

    if (user.role === "admin") {
        options.unshift({
            icon: <DashboardIcon />,
            name: "Dashboard",
            func: dashboard,

        });
    }


    function dashboard() {
        navigate("/admin/dashboard");
    }

    function create() {
        navigate("/create/product");
    }
    function account() {
        navigate("/account");
    }
    function cart() {
        navigate("/cart");
    }

    function logoutuser() {
        dispatch(logoutUser());
        alert.success("Logout Successfully");
    }


    return (
        <>
            <Backdrop open={open} style={{ zIndex: "10" }} />
            <SpeedDial
                className="speedDial"
                ariaLabel='SpeedDial tooltip example'
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                style={{zIndex:"11"}}
                direction='down'
                icon={<img
                    className='speedDialIcon'
                    src={user.avatar.url ? user.avatar.url : "/Profile.png"}
                    alt='Profile'
                />}
            >
                {options.map((item) => (
                    <SpeedDialAction
                    className="speedDialBtns"
                    key={item.name}
                    icon={item.icon}
                        tooltipTitle={item.name}
                    onClick={item.func}
                    tooltipOpen={window.innerWidth <= 600 ? true : false}
                />
               ))}
            </SpeedDial>



        </>
    )
}

export default UserOptions;
