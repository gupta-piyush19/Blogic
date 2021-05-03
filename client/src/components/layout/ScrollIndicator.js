import React, { useEffect, useState } from "react";
import "./ScrollIndicator.css";

const ScrollIndicator = () => {
  const [scrollTop, setScrollTop] = useState(0);

  const checkScoll = () => {
    const winScroll = document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    setScrollTop((winScroll / height) * 100);
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScoll);

    return () => window.removeEventListener("scroll", checkScoll);
  }, []);

  return (
    <div className="indicator-wrapper">
      <div
        className="indicator-content"
        style={{ width: `${scrollTop}%` }}
      ></div>
    </div>
  );
};

export default ScrollIndicator;
