import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <div className="footer-content">
        <p>Check the stats of every player from every night's game!</p>
        <p className="signature">
          Created by:{" "}
          <a href="https://github.com/chanterren13">@chanterren13</a>
        </p>
      </div>
    </>
  );
}

export default Footer;