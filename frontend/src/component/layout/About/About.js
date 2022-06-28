import React from "react";
import { Typography} from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";
import "./CSS/About.css";
import MetaData from "../MetaData";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

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
                        <h2>Saahitya</h2><br/>
                        <p>
                             This is a complete application which helps students to sell the used academic material which is in good condition in college premise
                        </p>
                    </div>
                    <div className="aboutSectionContainer2">
                        <h3>Avinash Biradar</h3><br/>
                        <span>Walchand College Of Engineering,Sangli.</span>
                        <Typography component="h2">Get In Touch</Typography>
                        <div className="social">
                            <a
                            href="https://twitter.com/avi_biradar77"
                            target="blank"
                            >
                                <TwitterIcon className="twitterSvgIcon" />
                            </a>

                            <a href="https://www.linkedin.com/in/avinash-biradar-9279241aa/" target="blank">
                                <LinkedInIcon className="gitHubSvgIcon" />
                            </a>
                            <a href="https://github.com/avibiradar100" target="blank">
                                <GitHubIcon className="gitHubSvgIcon" />
                            </a>
                        </div>
                    </div>

                    <div className="aboutSectionContainer2">
                        <h3>Teknath Jha</h3><br/>
                        <span>Walchand College Of Engineering,Sangli.</span>
                        <Typography component="h2">Get In Touch</Typography>
                        <div className="social">
                            <a
                            href="https://twitter.com/teknath_jha"
                            target="blank"
                            >
                                <TwitterIcon className="twitterSvgIcon" />
                            </a>

                            <a href="https://www.linkedin.com/in/teknath-jha-2a6148197" target="blank">
                                <LinkedInIcon className="gitHubSvgIcon" />
                            </a>
                            <a href="https://github.com/Teknath-jha" target="blank">
                                <GitHubIcon className="gitHubSvgIcon" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
};

export default About;
