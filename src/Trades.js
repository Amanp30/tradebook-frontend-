import React, { useEffect, useState } from "react";
import Layout from "./components/Layout";
import { Link } from "react-router-dom";
import { deleteTrade, getTrades } from "./services/apiEndpoints";
import useNotify from "./hooks/useNotify";
import { errorhandler } from "./helpers/codehandlers";
import Notification from "./components/Notification";
import { Waiting, Heading, Servererror } from "./components/Littles";
import Tradecontent from "./components/Tradecontent";

function Trades() {
  const {
    clearnotification,
    notifysuccess,
    notifyerror,
    message,
    setnotifysuccess,
    setmessage,
    setnotifyerror,
  } = useNotify();

  const [data, setdata] = useState();
  const [showContent, setshowContent] = useState(false);

  function deleteOne(id) {
    clearnotification();
    deleteTrade(id)
      .then((response) => {
        console.log(response);
        setmessage(response.message);
        setnotifysuccess(true);
        getData();
      })
      .catch((error) => {
        errorhandler(error, setmessage).then(() => {
          setnotifyerror(true);
        });
      });
  }

  function getData() {
    getTrades()
      .then((response) => {
        console.log(response);
        setdata(response);
        setshowContent(true);
      })
      .catch((error) => {
        setshowContent("servererror");
        errorhandler(error, setmessage).then(() => {
          setnotifyerror(true);
        });
      });
  }

  useEffect(() => {
    getData();
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
        <Layout>
          <Heading text="Trades">
            <Link to="/new-trade" className="primarybtn">
              {" "}
              + Add Trade
            </Link>
          </Heading>{" "}
          {/* Trades */}
          <Tradecontent data={data} deletefunc={(e) => deleteOne(e)} />
          {/* Notification */}
          <Notification
            text={message}
            error="topcenter"
            icon
            state={notifyerror}
            setstate={setnotifyerror}
            close
            // stripe
            // mobile
          />
          <Notification
            text={message}
            success="topcenter"
            icon
            state={notifysuccess}
            setstate={setnotifysuccess}
            close
            // stripe
            // mobile
          />
        </Layout>
      </>
    );
}

export default Trades;
