import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getTradingsystems } from "../services/apiEndpoints";
import { Waiting, Servererror, Heading } from "../components/Littles";
import { Link, useNavigate } from "react-router-dom";
import { errorhandler } from "../helpers/codehandlers";
function Tradingsystem() {
  const Navigate = useNavigate();
  const [data, setData] = useState([]);
  const [showContent, setshowContent] = useState(false);
  const [message, setmessage] = useState(false);

  useEffect(() => {
    getTradingsystems()
      .then((res) => {
        // console.log(res);
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
        <Layout>
          <Heading text="Trading Systems">
            <Link to="/trading-system/new" className="primarybtn">
              + New System
            </Link>
          </Heading>{" "}
          <div className="thefivegrid">
            {data?.map((item) => {
              return (
                <React.Fragment key={item._id}>
                  <div className="thebox  theinnergrid">
                    <p>{item.systemname}</p>
                    <img
                      src="/viewicon.svg"
                      style={{ width: "25px" }}
                      onClick={(e) =>
                        Navigate(`/trading-system/view/${item._id}`)
                      }
                    />
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </Layout>
      </>
    );
}

export default Tradingsystem;
