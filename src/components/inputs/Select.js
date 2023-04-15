import React, { useEffect, useRef } from "react";
import "./inputs.css";

function Select({
  name,
  disabled,
  label,
  state,
  setState,
  className,
  children,
  options,
}) {
  const inputRef = useRef(null);

  const htmlId = label.replace(/\s+/g, "").toLowerCase();

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

  function renderOptions() {
    return options.map((option, index) => (
      <option key={index} value={option}>
        {option}
      </option>
    ));
  }

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
        <select
          value={state}
          id={htmlId}
          name={name}
          onChange={(e) => setState(e.target.value)}
          className={`Select`}
          ref={inputRef}
          disabled={disabled}
        >
          {renderOptions()}
        </select>
      </div>
    </div>
  );
}

export default Select;
