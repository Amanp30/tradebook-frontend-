import React, { useEffect, useRef } from "react";
import "./inputs.css";

function Thedate({
  type,
  name,
  disabled,
  label,
  state,
  setstate,
  className,
  children,
  min,
  max,
}) {
  const inputRef = useRef(null);

  const htmlId = label?.replace(/\s+/g, "")?.toLowerCase();

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

  function renderLabel() {
    return (
      <label className="thelabel" htmlFor={htmlId}>
        {label}
      </label>
    );
  }

  function renderLabelWithChildren() {
    return (
      <div style={{ display: "flex" }}>
        <label
          className="thelabel"
          htmlFor={htmlId}
          style={{ marginRight: "1em" }}
        >
          {label}
        </label>{" "}
        {children}
      </div>
    );
  }

  return (
    <div className={className ? className : ""}>
      {children ? renderLabelWithChildren() : renderLabel()}
      <div className="custominputbox">
        <input
          type={type}
          value={state}
          id={htmlId}
          name={name}
          min={min}
          max={max}
          onChange={(e) => setstate(e.target.value)}
          className={`text-input theinput`}
          ref={inputRef}
          disabled={disabled ? true : false}
        />
      </div>
    </div>
  );
}

export default Thedate;
