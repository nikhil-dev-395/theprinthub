import React from "react";
import Nevbar from "./Nevbar.js";
import Hero from "./Hero.js";
import Footer from "./Footer.js";
import LatestNews from "./LatestNews.js";

export const MainContainer = () => {
  return (
    <div>
      <Nevbar />
      <Hero />
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
};
