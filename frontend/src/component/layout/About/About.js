import React from "react";
import { Typography, Avatar } from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";
import GitHubIcon from '@mui/icons-material/GitHub';
import "./SCSS/About.css";
import MetaData from "../MetaData";

const About = () => {
    return (
        <>
        <MetaData title={`About us`} />
        <div className="aboutSection">
            <div></div>
            <div className="aboutSectionGradient"></div>
            <div className="aboutSectionContainer">
                <Typography component="h1">About Us</Typography>

                <div>
                    <div>
                        <h3>Saahitya</h3><br/>
                        <span>
                             This is a complete application which helps students to sell the used academic material which is in good condition in college premise
                        </span>
                    </div>
                    <div className="aboutSectionContainer2">
                        <div>
                        <Avatar
                            style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
                            src="https://res.cloudinary.com/avicloud/image/upload/v1655561303/myphoto_onive1.jpg"
                            alt="Founder"
                        />
                        <h3>Avinash Biradar</h3><br/>
                    </div>
                        <Typography component="h2">Get In Touch</Typography>
                         <span>
                            <a
                            href="https://twitter.com/avi_biradar77"
                            target="blank"
                            >
                                <TwitterIcon className="twitterSvgIcon" />
                            </a>

                            <a href="https://github.com/avibiradar100" target="blank">
                                <GitHubIcon className="gitHubSvgIcon" />
                            </a>
                         </span>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
};

export default About;
