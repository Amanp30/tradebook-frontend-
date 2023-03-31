import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"; // import the NavLink component from react-router-dom
import { Menu } from "./Svgs";
import Theme from "./Theme";

function Navbar() {
  const [isOpen, setIsOpen] = useState("default");

  useEffect(() => {
    function checkingTarget(event) {
      var body = document.body;
      var openmenu = document.querySelector(".openmenubtn");
      var targetmenu = document.querySelector(".navbar_inner.opening");
      var icon = document.querySelector(".themebtn");
      if (
        event.target === openmenu ||
        (event.target.closest(".links_container") && event.target === icon)
      ) {
        setIsOpen("openit");
        body.style.overflow = "hidden";
        return;
      } else if (
        isOpen === "openit" &&
        targetmenu &&
        !targetmenu.contains(event.target) &&
        !event.target.classList.contains("themebtn")
      ) {
        setIsOpen("closeit");
        body.style.overflow = "";
      }
    }

    document.addEventListener("click", checkingTarget);
    return () => {
      document.removeEventListener("click", checkingTarget);
    };
  }, [isOpen]);

  return (
    <>
      <div className="onlymobile">
        <img
          src="/menubtn.svg"
          className="openmenubtn"
          style={{ width: "16px" }}
        />
        <p className="logo">TradeBook</p>
        <Theme />
      </div>
      <div
        className={
          isOpen === "default"
            ? "menuclosed navbar_inner"
            : isOpen === "openit"
            ? "navbar_inner opening"
            : "navbar_inner closing"
        }
      >
        <div className="menuhead">
          <p className="logo">TradeBook</p>
          <Theme />
        </div>
        <div className="links_container">
          <NavLink exact to="/" activeClassName="active-link">
            Home
          </NavLink>
          <NavLink to="/contact" activeClassName="active-link">
            contact
          </NavLink>
          <NavLink to="/Products" activeClassName="active-link">
            Products
          </NavLink>
          <NavLink to="/Products" activeClassName="active-link">
            Products
          </NavLink>
          <NavLink to="/Products" activeClassName="active-link">
            Products
          </NavLink>
          <NavLink to="/Products" activeClassName="active-link">
            Products
          </NavLink>
          <NavLink to="/Products" activeClassName="active-link">
            Products
          </NavLink>
          <NavLink to="/Products" activeClassName="active-link">
            Products
          </NavLink>
          <NavLink to="/Products" activeClassName="active-link">
            Products
          </NavLink>
          <NavLink to="/Products" activeClassName="active-link">
            Products
          </NavLink>
          <NavLink to="/Products" activeClassName="active-link">
            Products
          </NavLink>
          <NavLink to="/Products" activeClassName="active-link">
            Products
          </NavLink>
          <NavLink to="/Products" activeClassName="active-link">
            Products
          </NavLink>
          <NavLink to="/Products" activeClassName="active-link">
            Products
          </NavLink>
          <NavLink to="/Products" activeClassName="active-link">
            Products
          </NavLink>
          <NavLink to="/Products" activeClassName="active-link">
            Products
          </NavLink>
          <NavLink to="/Products" activeClassName="active-link">
            Products
          </NavLink>
          <NavLink to="/Products" activeClassName="active-link">
            Products
          </NavLink>
          <NavLink to="/Products" activeClassName="active-link">
            Products
          </NavLink>

          <NavLink to="/Products" activeClassName="active-link">
            atharv
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default Navbar;
