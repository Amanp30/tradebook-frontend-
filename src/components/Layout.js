import React from "react";
import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <>
      <div className="divide">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="content">{children}</div>
      </div>
    </>
  );
}

export default Layout;
