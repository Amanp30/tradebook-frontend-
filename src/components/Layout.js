import React from "react";
import Navbar from "./navbar/Navbar";
import Notification from "./notification/Notification";

function Layout({ children, message, error, seterror, success, setsuccess }) {
  return (
    <>
      <div className="divide">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="content">
          {children}
          {/* <Footer /> */}
          {message && error && (
            <Notification
              text={message}
              error="topcenter"
              icon
              state={error}
              setstate={seterror}
              close
              // stripe
              mobile
            />
          )}
          {message && success && (
            <Notification
              text={message}
              success="topcenter"
              icon
              state={success}
              setstate={setsuccess}
              close
              // stripe
              mobile
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Layout;
