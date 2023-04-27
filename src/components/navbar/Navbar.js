import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"; // import the NavLink component from react-router-dom
import Theme from "./Theme";
import "./navbar.css";
import { doLogout, isAuth } from "../../helpers/Auth";

function Dropdown({ data, heading }) {
  const [isDropdownOpen, setisDropdownOpen] = useState("default");

  function setbodyscrollable() {
    document.body.style.overflow = "";
  }

  const handleDrop = (e) => {
    if (isDropdownOpen === "default" || isDropdownOpen === "close") {
      setisDropdownOpen("open");
    } else {
      setisDropdownOpen("close");
    }
  };

  useEffect(() => {
    if (!isAuth()) doLogout();
  }, []);

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
            <NavLink
              to={item.link}
              activeclassname="active-link"
              onClick={setbodyscrollable}
            >
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
          link: "/report/weekday",
        },
        {
          text: "Monthly",
          link: "/report/monthly",
        },
        {
          text: "Yearly",
          link: "/report/yearly",
        },
        {
          text: "Timeframe",
          link: "/report/timeframe",
        },
        {
          text: "Symbols",
          link: "/report/symbol",
        },
      ],
    },
  ];

  var Settingsdata = [
    {
      links: [
        {
          text: "General",
          link: "/account-details",
        },
        {
          text: "Instruments",
          link: "/instruments",
        },
        {
          text: "Import Trades",
          link: "/",
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

  function setbodyscrollable() {
    document.body.style.overflow = "";
  }

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
          onClick={(e) => doLogout()}
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
          <NavLink
            to="/"
            activeclassname="active-link"
            onClick={setbodyscrollable}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/trades"
            activeclassname="active-link"
            onClick={setbodyscrollable}
          >
            Trades
          </NavLink>
          <Dropdown heading="Reports" data={Reportsdata} />

          <Dropdown heading="Settings" data={Settingsdata} />

          <div className="logout thebox" onClick={(e) => doLogout()}>
            <img src="/shutdown.png" style={{ width: "25px" }} /> <p>Logout</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
