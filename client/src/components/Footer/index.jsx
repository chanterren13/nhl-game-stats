import React from "react";
import "./Footer.css";
import { FlameIcon, PinIcon } from "@primer/octicons-react";

const Footer = () => {
  return (
    <>
      <div className="footer-content">
        <p>Check the stats of every player from every night's game!</p>
        <p>
          <FlameIcon size={16} fill="#ff8438"></FlameIcon> - Player is on a
          "hot" streak
        </p>
        <p>
          <PinIcon size={16}></PinIcon> - Pin Player
        </p>
        <p className="signature">
          Created by:{" "}
          <a href="https://github.com/chanterren13">@chanterren13</a>
        </p>
      </div>
    </>
  );
};

export default Footer;
