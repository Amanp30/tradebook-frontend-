import React, { useEffect, useState } from "react";
import { getCookie } from "../../helpers/Auth";

const Theme = () => {
  const [theme, setTheme] = useState(
    getCookie("theme") === "dark" ? false : true
  );

  useEffect(() => {
    // Select the html element

    const html = document.querySelector("html");

    // Set the className based on the current theme
    html.classList.toggle("dark-theme", !theme);
    html.classList.toggle("light-theme", theme);

    // Set the theme value as a cookie
    document.cookie = `theme=${theme ? "light" : "dark"}; path=/; max-age=${
      10 * 365 * 24 * 60 * 60 * 60
    }`;
  }, [theme]);

  return (
    <>
      {theme ? (
        <img
          src="/sun.svg"
          className="themebtn"
          onClick={(e) => setTheme(!theme)}
        />
      ) : (
        <img
          src="/moon.svg"
          className="themebtn"
          onClick={(e) => setTheme(!theme)}
        />
      )}
    </>
  );
};

export default Theme;
