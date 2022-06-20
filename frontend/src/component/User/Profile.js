import React, { useEffect } from 'react';
import { useDispatch,useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
// import { Button } from "@mui/material";
import { useAlert } from "react-alert";
import "./CSS/Profile/Profile.css";
import { logoutUser, deleteMyProfile } from "../../actions/userAction";

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const { user, loading, error,isAuthenticated } = useSelector((state) => state.user);

    useEffect(() => {
        if (error) {
            alert.error(error);
        }

        if (isAuthenticated === false) {
            navigate("/login");
        }
        
    }, [navigate,alert,error,isAuthenticated]);

    const deleteProfileHandler = async() => {
        await dispatch(deleteMyProfile());
        await dispatch(logoutUser());
        alert.success("Deleted  Successfully");
    };


    return (
        <>
            {loading ? (<Loader />) :
                (
                    <>
                        <MetaData title={`${user.name}'s Profile`} />
                        <div className="profileContainer">
                            <div className='profileTop'>
                                <h1>My Profile</h1>
                                <img src={user.avatar.url} alt={user.name} />
                                <Link to="/me/update">Edit Profile</Link>
                                 <button onClick={deleteProfileHandler}>
                                    Delete my profile
                                </button>
                            </div>

                            <div>
                                <div className='innerDiv'>
                                    <h4>Full Name</h4>
                                    <p>{user.name}</p>
                                </div>
                                <div className='innerDiv'>
                                    <h4>Email</h4>
                                    <p>{user.email}</p>
                                </div>
                                <div className='innerDiv'>
                                    <h4>Phone</h4>
                                    <p>{user.phone}</p>
                                </div>
                                <div className='innerDiv'>
                                    <h4>Total Products</h4>
                                    <p>{user.products.length}</p>
                                </div>
                                <div className='innerDiv'>
                                    <h4>Joined On</h4>
                                    <p>{String(user.createdAt).substr(0, 10)}</p>
                                </div>
                                <div>
                                    <Link to="/my/products">My Products</Link>
                                    <Link to="/password/update">Change Password</Link>
                                </div>

                            </div>

                        </div>
                    </>)}

        </>
    )
}

export default Profile
