import React from "react";
import "./SCSS/Contact.css";
import { Button } from "@material-ui/core";

const Contact = () => {
    return (
        <div className="contactContainer">
            <a className="mailBtn" href="mailto:biradarav.100@gmail.com">
                <Button>Contact:biradarav.100@gmail.com</Button>
            </a>
        </div>
    );
};

export default Contact;
