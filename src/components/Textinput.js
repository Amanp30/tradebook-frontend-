import React, { useEffect, useRef } from "react";
import "./inputs.css";

function Textinput({ state, setstate, placeholder, className }) {
  const inputRef = useRef(null);

  useEffect(() => {
    const divElement = inputRef.current.parentElement;
    const inputElement = inputRef.current;

    const handleClick = () => {
      inputElement.focus();
    };

    divElement.addEventListener("click", handleClick);

    return () => {
      divElement.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="custominputbox">
      <input
        type="text"
        value={state}
        onChange={(e) => setstate(e.target.value)}
        placeholder={placeholder}
        className={`text-input theinput ${className || ""}`}
        ref={inputRef}
      />
    </div>
  );
}

export default Textinput;
