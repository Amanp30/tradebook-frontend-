import React from "react";
import Layout from "../components/Layout";
import { Accountsettings, Heading } from "../components/Littles";
import { setLocalStorage } from "../helpers/Auth";
import { saveAccountUserDetails } from "../services/apiEndpoints";

function Accountdetails() {
  function saveData(data) {
    saveAccountUserDetails(data)
      .then((response) => {
        console.log(response);
        alert("User details updated");
        setLocalStorage("broker", response.broker);
      })
      .catch((error) => {
        alert("Some Error occured");
      });
  }

  return (
    <div>
      <Layout>
        <Heading text="Account Details" />
        <Accountsettings saveFunc={saveData} btnclass="notfull" />
      </Layout>
    </div>
  );
}

export default Accountdetails;
