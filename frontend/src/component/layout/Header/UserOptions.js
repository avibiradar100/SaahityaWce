import React, { useState,useEffect } from 'react';
import "./CSS/Header.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import Backdrop from "@material-ui/core/Backdrop";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser,deleteMyProfile } from '../../../actions/userAction';
import '../../../images/Profile.png'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SyncLockIcon from '@mui/icons-material/SyncLock';

const UserOptions = ({ user }) => {

    const { cartItems } = useSelector((state) => state.cart);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();

    const {error,isAuthenticated } = useSelector((state) => state.user);

    useEffect(() => {
        if (error) {
            alert.error(error);
        }

        if (isAuthenticated === false) {
            navigate("/login");
        }
        
    }, [navigate,alert,error,isAuthenticated]);

    const options = [
        { icon: <PersonIcon />, name: "Profile", func: account },
        { icon: <EditIcon />, name: "update Profile", func: update },
        { icon: <SyncLockIcon />, name: "Change Password", func: change },
        { icon: <DeleteIcon />, name: "Delete Profile", func: deleteProfile },
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
    function account() {
        navigate("/account");
    }
    function update() {
        navigate("/me/update");
    }
    function change() {
        navigate("/password/update");
    }
    async function  deleteProfile() {
        await dispatch(deleteMyProfile());
        await dispatch(logoutUser());
        alert.success("Deleted  Successfully");
    }
    function cart() {
        navigate("/cart");
    }

    function logoutuser() {
        dispatch(logoutUser());
        navigate("/login");
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
                    src={user.avatar.url ?(user.avatar.url):("")}
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
