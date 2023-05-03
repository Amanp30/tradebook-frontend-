import React from "react";
import Layout from "../components/Layout";
import { Accountsettings, Heading } from "../components/Littles";
import { setLocalStorage } from "../helpers/Auth";
import { saveAccountUserDetails } from "../services/apiEndpoints";
import useNotify from "../hooks/useNotify";

function Accountdetails() {
  const {
    clearnotification,
    notifysuccess,
    notifyerror,
    message,
    setnotifysuccess,
    setmessage,
    setnotifyerror,
  } = useNotify();

  function saveData(data) {
    clearnotification();
    saveAccountUserDetails(data)
      .then((response) => {
        console.log(response);
        setmessage("User details updated");
        setnotifysuccess(true);
        setLocalStorage("broker", response.broker);
      })
      .catch((error) => {
        setmessage("Some Error occured");
        setnotifyerror(true);
      });
  }

  return (
    <div>
      <Layout
        message={message}
        success={notifysuccess}
        setsuccess={setnotifysuccess}
        error={notifyerror}
        seterror={setnotifyerror}
      >
        <Heading text="Account Details" />
        <Accountsettings saveFunc={saveData} btnclass="notfull" />
      </Layout>
    </div>
  );
}

export default Accountdetails;
