import React from "react";
import "./contactus.css";
import { Button } from "@material-ui/core";

const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:ishabishnoi@gmail.com">
        <Button>Contact: ishabishnoi@gmail.com</Button>
      </a>
    </div>
  );
};

export default Contact;
