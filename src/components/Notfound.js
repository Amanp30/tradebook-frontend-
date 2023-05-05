import React from "react";
import { Link } from "react-router-dom";

function Notfound() {
  return (
    <>
      <div style={{ textAlign: "center", marginTop: "5em" }}>
        <p>Not a valid page visit dashboard</p>
        <Link to="/">Dashboard</Link>
      </div>
    </>
  );
}

export default Notfound;
