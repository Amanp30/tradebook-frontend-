import React, { useEffect, useState, useRef } from "react";
import css from "./inputs.css";

function Symbolinput({
  state,
  setstate,
  data,
  limit,
  label,
  showlabel,
  name,
  uppercase,
  placeholder,
}) {
  const [focused, setfocused] = useState(false);
  const [isitemhovering, setisitemhovering] = useState(false);
  const [filteredData, setfilteredData] = useState([]);

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

  const handleFocus = () => {
    setfocused(true);
  };

  const handleBlur = (e) => {
    if (!inputRef.current.contains(e.target)) {
      if (isitemhovering) {
        setfocused(true);
      } else {
        setfocused(false);
      }
    }
  };

  useEffect(() => {
    setfilteredData(
      data?.filter((item) => item.toLowerCase().includes(state.toLowerCase()))
    );
  }, [state, data]);

  function handleItemClick(item) {
    console.log(item);
    setstate(item);
    setfocused(false);
  }

  function showthedata(data) {
    return (
      <>
        {data?.map((item, index) => (
          <>
            {index < limit && (
              <div
                key={index}
                className={"theitems"}
                onClick={(e) => handleItemClick(item)}
              >
                {item}
              </div>
            )}
          </>
        ))}
      </>
    );
  }

  useEffect(() => {
    const handleMouseDown = (event) => {
      // Check if the target of the mouse event is inside the input or dropdown
      const isInside = event.target.closest(".appinput, .showit");
      if (!isInside) {
        setfocused(false);
      }
    };

    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  const handleInput = (e) => {
    if (uppercase) {
      setstate(e.target.value.toUpperCase());
    } else {
      setstate(e.target.value);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      {showlabel && label && (
        <label htmlFor={name} className="thelabel">
          {" "}
          {label}
        </label>
      )}
      <div className="custominputbox">
        <input
          type="text"
          value={state}
          id={name}
          placeholder={placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoComplete="off"
          name={name}
          onChange={handleInput}
          className={"appinput " + "theinput"}
          ref={inputRef}
        />
      </div>
      {focused && (
        <div
          className={"showit showdropdown"}
          onMouseOver={(e) => setisitemhovering(true)}
          onMouseOut={(e) => setisitemhovering(false)}
        >
          {state.length < 1
            ? showthedata(data)
            : filteredData?.length > 0 && showthedata(filteredData)}
        </div>
      )}
    </div>
  );
}

export default Symbolinput;
