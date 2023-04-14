import React, { useState } from "react";
import { Oval, Radio } from "react-loader-spinner";
import { Link } from "react-router-dom";

export const Heading = ({ text, children, theclass }) => {
  var wrapperclasses = theclass ? theclass + " heading_comp " : "heading_comp ";
  return (
    <div className={wrapperclasses}>
      <h1 className="heading">{text}</h1>{" "}
      <div className="otheractions">{children}</div>
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
  return (
    <>
      <p className={text === "Win" ? "win" : "loss"}>{text}</p>
    </>
  );
};

export const Greenred = ({ number, append }) => {
  return (
    <>
      <p className={number > 0 ? "gain" : "lost"}>
        {number}
        {append}{" "}
      </p>
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
          style={{
            color: "black",
            bottom: "5em",
            left: "50%",
            transform: "translate(-50%, 50%)",
          }}
          className="fullimage"
          onClick={(e) => setIsOpened(true)}
        >
          Full
        </p>
      </div>
      {isOpened ? (
        <div className="backdropfilter">
          <div className="imageenlarge">
            <img src={theimage} />
            <div className="closeimage" onClick={(e) => setIsOpened(false)}>
              Close
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
