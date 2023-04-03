import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"; // import the NavLink component from react-router-dom
import Theme from "./Theme";

function Dropdown({ data, heading }) {
  const [isDropdownOpen, setisDropdownOpen] = useState("default");

  const handleDrop = (e) => {
    if (isDropdownOpen === "default" || isDropdownOpen === "close") {
      setisDropdownOpen("open");
    } else {
      setisDropdownOpen("close");
    }
  };

  return (
    <>
      <div
        className={"menudropdown  " + heading.toLowerCase()}
        onClick={handleDrop}
      >
        {heading} <img src="/droparrow.svg" />
      </div>
      <ul
        className={
          isDropdownOpen === "default"
            ? "noneDrop"
            : isDropdownOpen === "open"
            ? "droplinks openDrop"
            : "droplinks close"
        }
      >
        {data[0].links.map((item, index) => (
          <li key={index}>
            <NavLink to={item.link} activeclassname="active-link">
              {item.text}
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  );
}

function Navbar() {
  const [isOpen, setIsOpen] = useState("default");

  var Reportsdata = [
    {
      links: [
        {
          text: "Overview",
          link: "/overview",
        },
        {
          text: "Hourly",
          link: "/hourly",
        },
        {
          text: "Weekday",
          link: "/weekday",
        },
        {
          text: "Monthly",
          link: "/monthly",
        },
        {
          text: "Yearly",
          link: "/Yearly",
        },
      ],
    },
  ];

  var Settingsdata = [
    {
      links: [
        {
          text: "General",
          link: "/general",
        },
        {
          text: "Change Password",
          link: "/change-password",
        },
        {
          text: "Import Trades",
          link: "/import-trades",
        },
      ],
    },
  ];

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
          style={{ width: "20px" }}
        />
        <p className="logo">TradeBook</p>{" "}
        <img
          src="/shutdown.png"
          style={{ width: "25px", position: "absolute", right: "1em" }}
        />
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
          <NavLink to="/" activeclassname="active-link">
            Dashboard
          </NavLink>
          <NavLink to="/trades" activeclassname="active-link">
            Trades
          </NavLink>
          <Dropdown heading="Reports" data={Reportsdata} />
          <Dropdown heading="More" data={Reportsdata} />
          <Dropdown heading="Settings" data={Settingsdata} />
          <Dropdown heading="Account" data={Settingsdata} />
          <div className="logout thebox">
            <img src="/shutdown.png" style={{ width: "25px" }} /> <p>Logout</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
