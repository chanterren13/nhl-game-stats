import React from "react";
import "./ScrollButton.css";

const ScrollButton = () => {
  const scrollToTop = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="scroll-button-section">
      <button
        className="scroll-button"
        onClick={scrollToTop}
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/media/up-arrow.png)`,
        }}
      ></button>
    </div>
  );
  // <a href="https://www.flaticon.com/free-icons/up-arrow" title="up arrow icons">Up arrow icons created by Roundicons Premium - Flaticon</a>
};

export default ScrollButton;
