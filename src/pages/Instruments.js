import React, { useEffect, useMemo, useState } from "react";
import Layout from "../components/Layout";
import { Fullwindowbackground, Heading, Thenote } from "../components/Littles";
import {
  getSymbolNametoUpdate,
  saveSymbolNametoUpdate,
} from "../services/apiEndpoints";
import { v4 as uuidv4 } from "uuid";
import Theinput from "../components/inputs/Theinput";
import useNotify from "../hooks/useNotify";
import { errorhandler } from "../helpers/codehandlers";
import { Notradefound } from "../components/Littles";
import Errorui from "../components/Errorui";

function Popupinput({ symbol, setsymbol, saveFunction }) {
  const [newSymbol, setNewSymbol] = useState(symbol);
  return (
    <>
      {symbol && typeof symbol === "string" ? (
        <Fullwindowbackground className="updateSymbol">
          {/* <h3 style={{ color: "black" }}>Edit Symbol Name</h3> */}
          <h3>Edit Symbol Name</h3>
          <Theinput
            type="text"
            placeholder="Your new symbol"
            state={newSymbol || ""}
            setstate={setNewSymbol}
            className="updatesymbolinput"
            uppercase
          />
          <div className="flexend btngroup">
            {" "}
            <button className="cancelbtn" onClick={(e) => setsymbol(null)}>
              {" "}
              Cancel
            </button>
            <button
              className="primarybtn"
              onClick={(e) => saveFunction(symbol, newSymbol)}
            >
              Update
            </button>
          </div>
        </Fullwindowbackground>
      ) : null}
    </>
  );
}

function Instruments() {
  const [data, setData] = useState([]);
  const [symbol, setsymbol] = useState(null);
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

  function saveData(symbol, newSymbol) {
    clearnotification();
    saveSymbolNametoUpdate({ symbol: symbol, newSymbol: newSymbol })
      .then((response) => {
        // console.log(response);
        setmessage(response);
        setnotifysuccess(true);
        // setData(response);
        setsymbol(null);
        getData();
      })
      .catch((error) => {
        errorhandler(error, setmessage).then(() => setnotifyerror(true));

        // alert("Some Error occured");
      });
  }

  function getData() {
    getSymbolNametoUpdate()
      .then((response) => {
        console.log(response);
        setData(response);
        setshowContent(true);
      })
      .catch((error) => {
        setshowContent("servererror");

        alert("Some Error occured");
      });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Layout
        message={message}
        success={notifysuccess}
        setsuccess={setnotifysuccess}
        error={notifyerror}
        seterror={setnotifyerror}
      >
        {" "}
        <Heading text="Symbols" />{" "}
        <Errorui showContent={showContent}>
          <Thenote>
            <p>
              Do things with care. Here you can update SYMBOLS. All Symbols will
              be updated with new name
            </p>
          </Thenote>
          {data?.length !== 0 ? (
            <div className="thefivegrid">
              {data?.map((item) => {
                const uniqueId = uuidv4();
                return (
                  <React.Fragment key={uniqueId}>
                    {
                      <div className="theinnergrid thebox">
                        <p>{item}</p>{" "}
                        <img
                          src="/edit.svg"
                          style={{ width: "20px" }}
                          onClick={(e) => {
                            setsymbol(item);
                          }}
                        />
                      </div>
                    }
                  </React.Fragment>
                );
              })}
            </div>
          ) : (
            <Notradefound />
          )}
          {typeof symbol === "string" && (
            <Popupinput
              symbol={symbol}
              setsymbol={setsymbol}
              saveFunction={saveData}
            />
          )}
        </Errorui>
      </Layout>
    </div>
  );
}

export default Instruments;
