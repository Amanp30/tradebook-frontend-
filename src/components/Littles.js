import React, { useState, useEffect } from "react";
import { Oval, Radio } from "react-loader-spinner";
import { Link } from "react-router-dom";
import Theinput from "../components/inputs/Theinput";
import Theselect from "../components/inputs/Select";
import {
  getAccountUserDetails,
  saveAccountUserDetails,
} from "../services/apiEndpoints";
import { indianStates } from "../helpers/functions";
import { v4 as uuidv4 } from "uuid";
import { localeData } from "moment";

export const Heading = ({ text, children, theclass }) => {
  var wrapperclasses = theclass ? theclass + " heading_comp " : "heading_comp ";
  return (
    <div className={wrapperclasses}>
      <h1 className="heading">{text}</h1>{" "}
      {children ? <div className="otheractions">{children}</div> : null}
    </div>
  );
};

export const Inlineheading = ({ children }) => {
  return (
    <>
      <h3 style={{ gridColumn: "1/-1", margin: "0 0 -12px 0px" }}>
        {children}
      </h3>
    </>
  );
};

export const Formdiv = ({ theclass, text, children }) => {
  return (
    <>
      <div className={theclass ? theclass + " thegrids" : " thegrids"}>
        <Inlineheading>{text}</Inlineheading>
        {children}
      </div>
    </>
  );
};

export const Chartexplain = ({
  theclass,
  chart,
  setchart,
  setmessage,
  seterror,
}) => {
  const [imgpath, setimgpath] = useState(chart);

  const handleimage = (event) => {
    const file = event.target.files[0];
    if (!file?.type?.startsWith("image/")) {
      console.log("called one");
      setchart([]);
      setmessage("Please select an image file");
      seterror(true);
      setimgpath(chart);
      return;
    } else if (file.type.startsWith("image/")) {
      console.log("called two");
      setchart(file);
      const reader = new FileReader();
      reader.onload = () => {
        setimgpath(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setchart("");
    }
  };

  // console.log(chart);
  // console.log(imgpath);

  const handleremove = (e) => {
    setchart("");
    setimgpath("");
  };

  return (
    <>
      {chart || imgpath?.startsWith("blob") ? (
        <>
          <div className={theclass ? theclass + " formchart" : " formchart"}>
            <img src={imgpath} className="selectedimage" />
            <p className="removeimg" onClick={handleremove}>
              Remove
            </p>
          </div>
        </>
      ) : (
        <div className={theclass ? theclass + " formchart" : " formchart"}>
          <div className="uploadimage">
            <img
              // src="https://www.svgrepo.com/show/491889/upload-image.svg"
              src="/uploadimage.png"
              alt="Upload image"
              style={{ width: "120px" }}
            />
            <label style={{ color: "black" }}>
              Drag your image here, or{" "}
              <span
                style={{
                  color: "#479BFF",
                  fontWeight: "bold",
                  marginTop: "1em",
                }}
              >
                browse
              </span>
            </label>
            <span
              style={{
                color: "rgb(40 48 70)",
                fontSize: "14px",
                marginTop: "1em",
              }}
            >
              Supported only image files
            </span>
          </div>
          <input type="file" accept="image/*" onChange={handleimage} />
        </div>
      )}
    </>
  );
};

export const Waiting = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <Oval
          height={80}
          width={80}
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#4fa94d"
          strokeWidth={10}
          strokeWidthSecondary={4}
        />
        <h2>Loading...</h2>
      </div>
    </>
  );
};

export const Servererror = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <Radio
          visible={true}
          height="80"
          width="80"
          ariaLabel="radio-loading"
          wrapperStyle={{}}
          wrapperClass="radio-wrapper"
        />
        <h2>Server Error</h2>
        <p style={{ marginTop: "2em" }}>
          Go to{" ->      "}
          <Link
            to="/"
            style={{ textDecoration: "underline", fontWeight: "bolder" }}
          >
            Dashboard
          </Link>
        </p>
      </div>
    </>
  );
};

export const Outcome = ({ text }) => {
  let className = "";

  if (text === "Win") {
    className = "win";
  } else if (text === "Loss") {
    className = "loss";
  } else if (text === "Break Even") {
    className = "breakeven";
  }

  return (
    <>
      <p className={className}>{text}</p>
    </>
  );
};

export const Greenred = ({ number, append }) => {
  let className = "";

  if (number > 0) {
    className = "gain";
  } else if (number < 0) {
    className = "lost";
  } else if (number === 0) {
    className = "breakequal";
  }
  return (
    <>
      <p className={className}>{`${number}${append}`}</p>
    </>
  );
};

export const Action = ({ action }) => {
  console.log(action);
  return (
    <>
      <img
        src={action === "Buy" ? "/actionup.png" : "/actiondown.png"}
        alt={`action ${action}`}
        style={{ width: "30px" }}
      />
    </>
  );
};

export const Editdeleteset = ({ id, deletefunc }) => {
  return (
    <>
      <div className="flex" style={{ justifyContent: "flex-start" }}>
        <Link
          to={`/edit/${id}`}
          style={{
            display: "flex",
            gap: "0.5em",
            fontSize: "1.2em",
            color: "#2bff00",
          }}
        >
          <img src="/edit.svg" style={{ width: "25px" }} /> Edit
        </Link>
        <div
          className="flex"
          style={{ gap: ".5em" }}
          onClick={(e) => deletefunc(id)}
        >
          <img src="/delete.svg" style={{ width: "25px" }} />{" "}
          <p style={{ color: "red", fontSize: "1.2em" }}>Delete</p>
        </div>
      </div>
    </>
  );
};

export const Imagezoom = ({ theimage }) => {
  const [isOpened, setIsOpened] = useState(false);
  return (
    <>
      <div style={{ position: "relative" }}>
        {" "}
        <img
          src={theimage}
          style={{
            gridColumn: "1/-1",
            width: "100%",
            marginBottom: "2em",
            maxHeight: "max-content",
          }}
        />
        <p
          className="removeimg"
          style={{
            color: "black",
            bottom: "3em",
            // left: "50%",
            // transform: "translate(-50%, 50%)",
          }}
          onClick={(e) => setIsOpened(true)}
        >
          Full
        </p>
      </div>
      {isOpened ? (
        <div className="backdropfilter">
          <div className="imageenlarge">
            <img src={theimage} />
            <div className="removeimg" onClick={(e) => setIsOpened(false)}>
              Close
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export const Notradefound = () => {
  return (
    <Thenote className="notfound">
      <h2>
        Hey! no trade found <br /> first add one
      </h2>
    </Thenote>
  );
};

export const Accountsettings = ({ saveFunc, btnclass }) => {
  const [data, setdata] = useState([]);
  const [showcontent, setshowcontent] = useState(false);

  function getData() {
    getAccountUserDetails()
      .then((response) => {
        console.log(response);
        setdata(response);
        setshowcontent(true);
      })
      .catch((error) => {
        // errorhandler(error, setmessage).then(() => {
        //   setnotifyerror(true);
        // });
        alert("Some Error occured");
      });
  }

  useEffect(() => {
    getData();
  }, []);

  const handlesubmit = (event) => {
    event.preventDefault();

    const formDataObj = {
      firstname: data.firstname,
      lastname: data.lastname,
      mobileno: data.mobileno,
      state: data.state,
      broker: data.broker,
    };

    saveFunc(data);
  };

  if (showcontent === false) {
    return <Waiting />;
  }
  if (showcontent === "servererror") {
    return (
      <>
        <Servererror />
      </>
    );
  }

  if (showcontent)
    return (
      <>
        <div className="thebox defaultpad defaultbr">
          <form
            onSubmit={handlesubmit}
            id="theform"
            method="post"
            encType="multipart/form-data"
            className="accountgrid"
          >
            <Theinput
              type="text"
              label="First Name"
              placeholder=""
              state={data.firstname}
              setstate={(value) => setdata({ ...data, firstname: value })}
            />
            <Theinput
              type="text"
              label="Last Name"
              placeholder=""
              state={data.lastname}
              setstate={(value) => setdata({ ...data, lastname: value })}
            />{" "}
            <Theinput
              type="number"
              label="Mobile"
              placeholder="8741xxx986"
              state={data.mobileno}
              className="holeone"
              setstate={(value) => setdata({ ...data, mobileno: value })}
            />
            <Theselect
              label="State"
              options={indianStates}
              state={data.state}
              className="holeone"
              setState={(value) => setdata({ ...data, state: value })}
            />
            <Theselect
              label="Broker"
              options={["", "Upstox", "Zerodha", "Angel one"]}
              state={data.broker}
              className="holeone"
              setState={(value) => setdata({ ...data, broker: value })}
            />
            <button
              type="submit"
              className={btnclass ? `${btnclass} primarybtn ` : "primarybtn"}
            >
              Update Information
            </button>
          </form>
        </div>
      </>
    );
};

export const Fullwindowbackground = ({ children, className }) => {
  return (
    <div className="fullwidth">
      <div
        className={
          className ? className + " popupCenter thebox" : " popupCenter thebox"
        }
      >
        {children}
      </div>
    </div>
  );
};

export const Thenote = ({ children, className }) => {
  return (
    <div
      className={className ? className + " thenote thebox" : " thenote thebox"}
    >
      {children}
    </div>
  );
};

export const Notesviewer = ({
  data,
  className,
  deleteFunction,
  tradeid,
  setnote,
}) => {
  return (
    <>
      {" "}
      {data?.length > 0 ? (
        <div
          className={
            className ? className + " notelist thebox" : " notelist thebox"
          }
          style={{ margin: "1em 0" }}
        >
          {data?.map((item, index) => {
            const uniqueId = uuidv4();
            return (
              <React.Fragment key={uniqueId}>
                {
                  <div
                    className="symboldiv thebox"
                    style={{ padding: "1em 0" }}
                  >
                    <p>{item}</p>{" "}
                    <div className="flexend">
                      {" "}
                      <img
                        src="/edit.svg"
                        style={{ width: "20px" }}
                        onClick={(e) => {
                          setnote({ index: index, note: item });
                        }}
                      />
                      <img
                        src="/delete.svg"
                        style={{ width: "20px" }}
                        onClick={(e) => deleteFunction(tradeid, index)}
                      />
                    </div>
                  </div>
                }
              </React.Fragment>
            );
          })}
        </div>
      ) : null}
    </>
  );
};
