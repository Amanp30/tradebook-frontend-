import React from "react";
import Heading from "./components/Heading";
import Layout from "./components/Layout";
import { Link } from "react-router-dom";
function Trades() {
  return (
    <>
      <Layout>
        <Heading text="Trades">
          <Link to="/new-trade" className="addnew">
            {" "}
            + Add Trade
          </Link>
        </Heading>
      </Layout>
    </>
  );
}

export default Trades;
