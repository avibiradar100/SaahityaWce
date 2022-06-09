import React from "react";
import { Typography, Avatar } from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";
import GitHubIcon from '@mui/icons-material/GitHub';
import "./SCSS/About.css";

const About = () => {
    return (
        <div className="aboutSection">
            <div></div>
            <div className="aboutSectionGradient"></div>
            <div className="aboutSectionContainer">
                <Typography component="h1">About Us</Typography>

                <div>
                    <div>
                        <Avatar
                            style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
                            src="https://res.cloudinary.com/avicloud/image/upload/v1646680837/avatars/myphoto_c3eajx.jpg"
                            alt="Founder"
                        />
                        <h3>Avinash Biradar</h3><br/>
                        <span>
                            This is a complete Ecom wesbite BestShop made by using MERN Stack.
                        </span>
                    </div>
                    <div className="aboutSectionContainer2">
                        <Typography component="h2">Our Brands</Typography>
                        <a
                            href="https://twitter.com/avi_biradar77"
                            target="blank"
                        >
                            <TwitterIcon className="twitterSvgIcon" />
                        </a>

                        <a href="https://github.com/avibiradar100" target="blank">
                            <GitHubIcon className="gitHubSvgIcon" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
