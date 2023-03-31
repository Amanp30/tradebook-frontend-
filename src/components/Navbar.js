import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"; // import the NavLink component from react-router-dom
import Theme from "./Theme";

function Dropdown({ data, heading }) {
  const [isDropdownOpen, setisDropdownOpen] = useState(false);
  console.log(data);
  return (
    <>
      <div
        className={"menudropdown  " + heading.toLowerCase()}
        onClick={(e) => setisDropdownOpen(!isDropdownOpen)}
      >
        {heading} <img src="/droparrow.svg" />
      </div>

      {isDropdownOpen && (
        <ul className="droplinks">
          {data[0].links.map((item, index) => (
            <li key={index}>
              <NavLink to={item.link} activeClassName="active-link">
                {item.text}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
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
          style={{ width: "16px" }}
        />
        <p className="logo">TradeBook</p>
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
        </div>
      </div>
    </>
  );
}

export default Navbar;
