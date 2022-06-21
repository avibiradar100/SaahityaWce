import React, { useRef, useState, useEffect } from "react";
import Loader from "../layout/Loader/Loader";
import {useNavigate, useLocation  } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import PhoneIcon from '@mui/icons-material/Phone';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loadUser,login, register } from "../../actions/userAction.js";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import validateSignUp from "./validateSignUp.js";
import "./CSS/LoginSignUp/LoginSignUp.css";


const LoginSignUp = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { error, loading, isAuthenticated } = useSelector(
        (state) => state.user
    );

    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [user, setUser] = useState({
        name: "",
        password: "",
        phone:"",
        email: ""
    });

    const { name,phone,password, email } = user;

    const [avatar, setAvatar] = useState("/Profile.png");
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

    const loginSubmit = async(e) => {
        e.preventDefault();
        await dispatch(login(loginEmail, loginPassword));
        dispatch(loadUser());
    }

    

    const registerSubmit =async (e) => {
        e.preventDefault();
        if(validateSignUp(email, password,phone, alert)){
             await dispatch(register(name,email,password,phone,avatar));
            dispatch(loadUser());
        }
    }

    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };
            reader.readAsDataURL(e.target.files[0]);

        } else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }
    }

    const redirect = location.search ? location.search.split("=")[1] : "/account";

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isAuthenticated) {
            navigate(redirect);
        }
    }, [dispatch, error, alert, isAuthenticated, navigate, redirect]);

    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }
        if (tab === "register") {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    };
    return (
        <>
            {loading ? <Loader /> : <>
                <MetaData title="LoginSignUp --Saahitya" />
                <div className="LoginSignUpContainer">
                <div className="LoginSignUpBox">
                    <div>
                        <div className="login_signUp_toggle">
                            <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                            <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>

                        </div>
                        <button ref={switcherTab}></button>
                    </div>
                    <form ref={loginTab} onSubmit={loginSubmit} className="loginForm">
                        <div className="loginEmail">
                            <MailOutlineIcon />
                            <input type="text" placeholder="Email / Phone" required value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                            />
                        </div>
                        <div className="loginPassword">
                            <LockOpenIcon />
                            <input type="password" placeholder="Password" required value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                            />
                        </div>
                        {/* <Link to="/password/forgot">Forget Password ?</Link> */}
                        <input type="submit" value="Login" className="loginBtn" />
                    </form>

                    <form ref={registerTab} onSubmit={registerSubmit} encType="multipart/form-data"
                        className="signUpForm">
                        <div className="signUpName">
                            <FaceIcon />
                            <input
                                type="text"
                                placeholder="Name"
                                required
                                name="name"
                                value={name}
                                onChange={registerDataChange}
                            />
                        </div>
                        <div className="signUpEmail">
                            <MailOutlineIcon />
                            <input type="email" id="email" placeholder="Email" name="email" required value={email}
                                onChange={registerDataChange}
                            />
                        </div>
                         <div className="signUpPhone">
                            <PhoneIcon />
                            <input
                                type="number"
                                placeholder="Phone"
                                required
                                id="phone"
                                name="phone"
                                value={phone}
                                onChange={registerDataChange}
                            />
                        </div>
                        <div className="signUpPassword">
                            <LockOpenIcon />
                            <input type="password" placeholder="Password" name="password"  id="password" required value={password}
                                onChange={registerDataChange}
                            />
                        </div>
                         <p>Select your profile picture</p>
                        <div id="registerImage">
                            <img src={avatarPreview} alt="Avatar Preview" />
                            <input
                               type="file"
                                required
                                name="avatar"
                                accept="image/*"
                                onChange={registerDataChange}
                            />
                        </div>
                        <input type="submit" value="Register" className="signUpBtn" />
                    </form>
                </div>
            </div>
            </>}
        </>
    )
}

export default LoginSignUp;
