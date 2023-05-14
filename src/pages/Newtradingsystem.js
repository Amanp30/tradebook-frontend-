import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Theinput from "../components/inputs/Theinput";
import Layout from "../components/Layout";
import { Heading } from "../components/Littles";
import Texteditor from "../components/Texteditor";
import { errorhandler } from "../helpers/codehandlers";
import useNotify from "../hooks/useNotify";
import { newTradingsystem } from "../services/apiEndpoints";

function Newtradingsystem() {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [systemname, setsystemname] = useState("");

  const {
    clearnotification,
    notifysuccess,
    notifyerror,
    message,
    setnotifysuccess,
    setmessage,
    setnotifyerror,
  } = useNotify();

  function saveTradingsystem() {
    clearnotification();

    if (value && systemname) {
      const formData = new FormData();
      formData.append("tradingsystem", value);
      formData.append("systemname", systemname);

      newTradingsystem(formData)
        .then((res) => {
          console.log(res);
          setmessage(res.message);
          setnotifysuccess(true);
          // Handle the response from the server here
          setTimeout(() => {
            navigate("/trading-system");
          }, 2000);
        })
        .catch((error) => {
          console.log(error);
          errorhandler(error, setmessage).then(() => {
            setnotifyerror(true);
          });
          // Handle any errors here
        });
    } else {
      setmessage("System Name & system is Required");
      setnotifyerror(true);
    }
  }

  return (
    <>
      <Layout
        message={message}
        success={notifysuccess}
        setsuccess={setnotifysuccess}
        error={notifyerror}
        seterror={setnotifyerror}
      >
        {" "}
        <Heading text="New System">
          <button className="primarybtn" onClick={saveTradingsystem}>
            Save
          </button>
        </Heading>
        <div className="thebox thepad">
          <Theinput
            type="text"
            label="System Name"
            state={systemname}
            setstate={setsystemname}
            className="systemname"
          />
          <Texteditor value={value} setValue={setValue} />
          <br />
          <br />
        </div>
      </Layout>
    </>
  );
}

export default Newtradingsystem;
