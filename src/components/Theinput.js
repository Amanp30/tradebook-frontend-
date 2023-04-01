import React, { useEffect, useRef } from "react";
import "./inputs.css";

function Theinput({
  type,
  disabled,
  label,
  state,
  setstate,
  placeholder,
  className,
}) {
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
    <div className="mksfg">
      <label
        className="thelabel"
        htmlFor={label.replace(/\s+/g, "").toLowerCase()}
      >
        {label}
      </label>
      <div className="custominputbox">
        <input
          type={type}
          value={state}
          id={label.replace(/\s+/g, "").toLowerCase()}
          onChange={(e) => setstate(e.target.value)}
          placeholder={placeholder}
          className={`text-input theinput ${className || ""}`}
          ref={inputRef}
          disabled={disabled ? true : false}
        />
      </div>
    </div>
  );
}

export default Theinput;
