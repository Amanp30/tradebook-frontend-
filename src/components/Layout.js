import React from "react";
import Navbar from "./navbar/Navbar";

function Layout({ children }) {
  return (
    <>
      <div className="divide">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="content">
          {children}
          {/* <Footer /> */}
        </div>
      </div>
    </>
  );
}

export default Layout;
