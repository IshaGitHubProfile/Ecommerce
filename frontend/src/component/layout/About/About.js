import React from "react";
import "./About.css";
const About = () => {
  return (
    <div class="container-fluid main_header hdr">  
    {/* //container-fluid class ensures that the container's width adjusts dynamically to fit the screen size. */}
        <div class="row">
            <div class="col-md-10 col-12 mx-auto">
                <div class="row">
                    <div class="col-md-6 col-12 main_header_left abt-me">
                        <p className="me">So Who Am I ?</p>
                        <h1>I Am A <span class="text_clr"> Mern Stack Developer </span> and Software Developer</h1>
                        <a href="https://github.com/IshaGitHubProfile" target="_isha"><button>About Me</button></a>
                    </div>
                </div>
            </div>
        </div>
     </div>
  );
};

export default About;