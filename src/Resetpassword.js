import React, { useEffect, useState } from "react";
import Theinput from "./components/Theinput";
import axios from "axios";
import { errorhandler } from "./helpers/codehandlers";
import "./auth.css";
import Notification from "./components/Notification";
import { Link, useParams } from "react-router-dom";

function Resetpassword() {
  const [password, setpassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [notifysuccess, setnotifysuccess] = useState(false);
  const [notifyerror, setnotifyerror] = useState(false);
  const [message, setmessage] = useState("");

  const { link } = useParams();

  useEffect(() => {
    const html = document.querySelector("html");
    html.classList.add("light-theme");
    return () => {
      html.classList.remove("light-theme");
    };
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setnotifyerror(false);
    setnotifysuccess(false);
    setmessage("");
    setLoading(true);

    const passwordRegex = /^.{6,}$/;

    if (!passwordRegex.test(password)) {
      setmessage("Password must be atleast 6 characters");
      setnotifyerror(true);
      setLoading(false);
      return;
    }

    const formData = new FormData(event.target);

    axios
      .post(`${process.env.REACT_APP_API}/user/reset/${link}`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // console.log(response.data);
        setnotifysuccess(true);
        setmessage(response?.data?.success);
      })
      .catch((err) => {
        // console.log(err);
        errorhandler(err, setmessage).then(() => {
          setnotifyerror(true);
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <p className="logo forauth">TradeBook</p>
      <form onSubmit={handleFormSubmit} className="thesignupform forgotpass">
        <h2 style={{ marginBottom: ".8em" }}>Reset Password</h2>
        <Theinput
          label="Password"
          name="password"
          type="password"
          state={password}
          setstate={setpassword}
          className="authemail"
        />
        <button type="submit" className="authbtn" disabled={loading}>
          {loading ? "Sending Email..." : "Send Email"}
        </button>
        <p className="otherp">
          Click here to{" "}
          <Link to={"/account/login"} style={{ textDecoration: "underline" }}>
            Login
          </Link>{" "}
        </p>
      </form>

      <Notification
        text={message}
        success="topright"
        icon
        state={notifysuccess}
        setstate={setnotifysuccess}
        close
        // stripe
        mobile
      />
      <Notification
        text={message}
        error="topright"
        icon
        state={notifyerror}
        setstate={setnotifyerror}
        close
        // stripe
        // mobile
      />
    </>
  );
}

export default Resetpassword;
