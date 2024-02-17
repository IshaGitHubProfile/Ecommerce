import React from "react";
import playStore from "../../../images/playStore.png";
import appStore from "../../../images/AppStore.png";
import "./Footer.css";

const Footer = () => {
    return (
        <footer id="footer">
            <div class="leftFooter">
                <h4>DOWNLOAD OUR APP</h4>
                <p>Download App for Android and IOS mobile phone</p>
                <img src={playStore} alt="playStore" />
                <img src={appStore} alt="AppStore" />
            </div>

            <div class="midFooter">
                <h1>ECOMMERCE</h1>
                <p>High Quality is our first priority</p>
                <p>Copyrights 2024 &copy; MeIshaBishnoi</p>
            </div>

            <div class="rightFooter">
                <h4>Also Visit</h4>
                <a href="https://github.com/IshaGitHubProfile">GitHub</a>
                <a href="https://www.linkedin.com/in/isha-bishnoi-8b1b40254/">Linkedin</a>
                <a href="https://leetcode.com/Isha_Bishnoi/">LeetCode</a>
            </div>
        </footer>
    )
};

export default Footer;