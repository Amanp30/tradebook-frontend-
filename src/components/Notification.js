import React from "react";
import { Oval } from "react-loader-spinner";
import "../components/notification.css";

function Notification({
  icon,
  text,
  success,
  error,
  saving,
  state,
  setstate,
  time = 8,
  close,
  stripe,
  mobile,
}) {
  if (!saving) {
    setTimeout(() => {
      setstate(false);
    }, time * 1000);
  }

  const handleClick = () => {
    setstate(false);
  };

  var noticlass =
    "notification" +
    (mobile ? " mobiletop" : " mobilebottom") +
    (success && success !== "" ? " " + [success] : "") +
    (error && error !== "" ? " " + [error] : "") +
    (saving && saving !== "" ? " " + [saving] : "") +
    (stripe && success ? " stripe success" : "") +
    (stripe && error ? " stripe error" : "") +
    (stripe && saving ? " stripe saving" : "") +
    (text.length > 48 ? " showiconsontop " : "");

  return (
    <>
      {success && state && (
        <div className={noticlass}>
          {icon && (
            <img
              src="/success.svg"
              alt="Success Icon"
              style={{ marginRight: ".2em" }}
              className="notiimg"
            />
          )}
          <p
            style={{ margin: "0em !important" }}
            className={stripe && !icon ? "stripehere" : ""}
          >
            {text}
          </p>
          {close && (
            <div
              onClick={handleClick}
              style={{ marginLeft: "auto", cursor: "pointer" }}
              className="close_icon"
            ></div>
          )}
        </div>
      )}

      {/* Error now */}
      {error && state && (
        <div className={noticlass}>
          {icon && (
            <img
              src="/error.svg"
              alt="Error Icon"
              style={{ marginRight: ".2em" }}
              className="notiimg"
            />
          )}
          <p
            style={{ margin: "0em !important" }}
            className={stripe && !icon ? "stripehere" : ""}
          >
            {text}
          </p>
          {close && (
            <div
              onClick={handleClick}
              style={{ marginLeft: "auto", cursor: "pointer" }}
              className="close_icon"
            ></div>
          )}
        </div>
      )}

      {/* saving now */}
      {saving && state && (
        <div className={noticlass}>
          {icon && (
            <Oval
              height={30}
              width={30}
              color="#4fa94d"
              wrapperStyle={{}}
              wrapperClass="notiimg"
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#4fa94d"
              strokeWidth={10}
              strokeWidthSecondary={8}
            />
          )}
          <p
            style={{ margin: "0em !important" }}
            className={stripe && !icon ? "stripehere" : ""}
          >
            {text}
          </p>
        </div>
      )}
    </>
  );
}

export default Notification;
