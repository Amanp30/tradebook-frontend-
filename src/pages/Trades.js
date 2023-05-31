import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import { deleteTrade, getTrades } from "../services/apiEndpoints";
import useNotify from "../hooks/useNotify";
import { errorhandler } from "../helpers/codehandlers";
// import Notification from "../components/notification/Notification";
import {
  Waiting,
  Heading,
  Servererror,
  Notradefound,
} from "../components/Littles";
import Tradecontent from "../components/Tradecontent";

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
  const [paginationdata, setpaginationdata] = useState([]);
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
  console.log(data);
  console.log(paginationdata);

  function getData(cpage) {
    getTrades(cpage)
      .then((response) => {
        // console.log(response);
        const { trades, ...paginationData } = response;
        setdata(trades);
        setpaginationdata(paginationData);
        setpaginationdata(paginationData);
        setshowContent(true);
      })
      .catch((error) => {
        setshowContent("servererror");
        errorhandler(error, setmessage).then(() => {
          setnotifyerror(true);
        });
      });
  }

  const Paginatecomp = ({ pageCount, currentPage, pageChange }) => {
    const maxDisplayedPages = 5; // Maximum number of pages to display
    let startPage = currentPage - Math.floor(maxDisplayedPages / 2);
    let endPage = currentPage + Math.floor(maxDisplayedPages / 2);

    // Adjust startPage and endPage if they go beyond the valid range
    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(pageCount, maxDisplayedPages);
    }
    if (endPage > pageCount) {
      endPage = pageCount;
      startPage = Math.max(1, pageCount - maxDisplayedPages + 1);
    }

    const pages = [];
    for (let index = startPage; index <= endPage; index++) {
      pages.push(
        <p
          className={index === currentPage ? "selectedpage page" : "page"}
          onClick={() => pageChange(index)}
          key={index}
        >
          {index}
        </p>
      );
    }

    return <div className="pagination">{pages}</div>;
  };

  useEffect(() => {
    getData(1);
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
          <Heading text="Trades">
            <Link to="/new-trade" className="primarybtn">
              + Add Trade
            </Link>
          </Heading>{" "}
          {data?.length !== 0 ? (
            <>
              <Tradecontent data={data} deletefunc={(e) => deleteOne(e)} />
              <Paginatecomp
                pageCount={paginationdata?.totalPageCount}
                currentPage={paginationdata?.currentPage}
                pageChange={getData}
              />
            </>
          ) : (
            <Notradefound />
          )}
        </Layout>
      </>
    );
}

export default Trades;
