import React from "react";
import "./footer.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "1rem" }}>
      <div className="footer">
        <a className="text"> 2020 &copy; The Veiled Narrative</a>
        <br />
        <a
          href="https://www.facebook.com/The-Veiled-Narrative-113949640338921/"
          className="social"
        >
          <FontAwesomeIcon
            style={{ color: "white" }}
            icon={faFacebook}
            size="1x"
          />
        </a>

        <a href="http://instagram.com/theveilednarrative" className="social">
          <FontAwesomeIcon
            style={{ color: "white" }}
            icon={faInstagram}
            size="1x"
          />
        </a>
      </div>
    </div>
  );
};
export default Footer;
