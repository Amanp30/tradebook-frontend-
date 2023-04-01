import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <>
      <div className="divide">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="content">
          {children}
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Layout;
