import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Errorui from "../components/Errorui";
import Theinput from "../components/inputs/Theinput";
import Layout from "../components/Layout";
import { Heading } from "../components/Littles";
import Texteditor from "../components/Texteditor";
import { errorhandler } from "../helpers/codehandlers";
import useNotify from "../hooks/useNotify";
import {
  newTradingsystem,
  updateSystem,
  viewSystem,
} from "../services/apiEndpoints";

function Updatetradingsystem() {
  const navigate = useNavigate();
  const { systemid } = useParams();
  const [data, setData] = useState([]);
  const [showContent, setshowContent] = useState(false);

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

    if (data?.tradingsystem && data?.systemname) {
      const formData = new FormData();
      formData.append("tradingsystem", data?.tradingsystem);
      formData.append("systemname", data?.systemname);

      updateSystem(systemid, formData)
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

  useEffect(() => {
    viewSystem(systemid)
      .then((res) => {
        console.log(res);
        setData(res);
        setshowContent(true);
      })
      .catch((error) => {
        setshowContent("servererror");
      });
  }, []);

  return (
    <>
      <Layout
        message={message}
        success={notifysuccess}
        setsuccess={setnotifysuccess}
        error={notifyerror}
        seterror={setnotifyerror}
      >
        <Errorui showContent={showContent}>
          <Heading text="Edit System">
            <button className="primarybtn" onClick={saveTradingsystem}>
              Update
            </button>
          </Heading>
          <div className="thebox thepad">
            <Theinput
              type="text"
              label="System Name"
              state={data?.systemname}
              setstate={(value) => setData({ ...data, systemname: value })}
              className="systemname"
            />
            <Texteditor
              value={data?.tradingsystem}
              setValue={(value) => setData({ ...data, tradingsystem: value })}
            />
            <br />
            <br />
          </div>
        </Errorui>
      </Layout>
    </>
  );
}

export default Updatetradingsystem;
