import React from "react";

function Heading({ text, children, theclass }) {
  var wrapperclasses = "heading_comp " + theclass;
  return (
    <div className={wrapperclasses}>
      <h1 className="heading">{text}</h1>{" "}
      <div className="otheractions">{children}</div>
    </div>
  );
}

export default Heading;
