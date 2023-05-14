import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { deleteSystem, viewSystem } from "../services/apiEndpoints";
import { Waiting, Servererror, Heading } from "../components/Littles";
import { useNavigate, useParams } from "react-router-dom";
import useNotify from "../hooks/useNotify";
import { errorhandler } from "../helpers/codehandlers";
function Viewtradingsystem() {
  const Navigate = useNavigate();
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

  function deletetrsystem() {
    deleteSystem(systemid)
      .then((res) => {
        console.log(res);
        setmessage(res.message);
        setnotifysuccess(true);
        // Handle the response from the server here
        setTimeout(() => {
          Navigate("/trading-system");
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        errorhandler(error, setmessage).then(() => {
          setnotifyerror(true);
        });
        // Handle any errors here
      });
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

  if (showContent === false) {
    return (
      <Layout>
        <Waiting />
      </Layout>
    );
  }
  if (showContent === "servererror") {
    return (
      <>
        <Layout>
          <Servererror />
        </Layout>
      </>
    );
  }

  if (showContent)
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
          <Heading text={data?.systemname}>
            <div className="editdelgrp">
              <button
                className="primarybtn"
                onClick={(e) => Navigate(`/trading-system/edit/${data?._id}`)}
              >
                Edit
              </button>
              <button
                className="primarybtn"
                style={{ background: "red", marginLeft: "15px" }}
                onClick={deletetrsystem}
              >
                Delete
              </button>
            </div>
          </Heading>{" "}
          <div
            className="thebox thepad systemview"
            dangerouslySetInnerHTML={{ __html: data?.tradingsystem }}
          ></div>
        </Layout>
      </>
    );
}

export default Viewtradingsystem;
