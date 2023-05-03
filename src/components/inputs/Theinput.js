import React, { useEffect, useRef } from "react";
import "./inputs.css";

function Theinput({
  type,
  name,
  uppercase,
  disabled,
  label,
  state,
  setstate,
  placeholder,
  className,
  children,
  step = ".05",
}) {
  const inputRef = useRef(null);

  var thehtmlfor = label?.replace(/\s+/g, "")?.toLowerCase();

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

  function handleOnChange(e) {
    let value = e.target.value;
    if (uppercase) {
      value = value.toUpperCase();
    }
    setstate(value);
  }

  function Showlabel() {
    return children ? (
      <>
        <div style={{ display: "flex" }} className="labelcontainer">
          <label
            className="thelabel"
            htmlFor={thehtmlfor}
            style={{ marginRight: "1em" }}
          >
            {label}
          </label>{" "}
          {children}
        </div>
      </>
    ) : (
      <label className="thelabel" htmlFor={thehtmlfor}>
        {label}
      </label>
    );
  }

  return (
    <div className={className ? className : ""}>
      <Showlabel />
      <div className="custominputbox">
        <input
          type={type}
          value={state}
          id={thehtmlfor}
          name={name}
          onChange={handleOnChange}
          placeholder={placeholder}
          className={`text-input theinput`}
          ref={inputRef}
          {...(type === "number" ? { step: step ? step : "" } : {})}
          disabled={disabled ? true : false}
        />
      </div>
    </div>
  );
}

export default Theinput;
