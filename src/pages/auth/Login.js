import React, { useEffect, useState } from "react";
import Theinput from "../../components/inputs/Theinput";
import axios from "axios";
import { errorhandler } from "../../helpers/codehandlers";
import "../../styles/auth.css";
import Notification from "../../components/notification/Notification";
import { Link } from "react-router-dom";
import { setCookie, setLocalStorage } from "../../helpers/Auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [notifysuccess, setnotifysuccess] = useState(false);
  const [notifyerror, setnotifyerror] = useState(false);
  const [message, setmessage] = useState("");

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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;
    const passwordRegex = /^.{6,}$/;

    if (!emailRegex.test(email)) {
      setmessage("Invalid email address");
      setnotifyerror(true);
      setLoading(false);
      return;
    }

    if (!passwordRegex.test(password)) {
      setmessage("Password should contain at least 6 characters");
      setnotifyerror(true);
      setLoading(false);
      return;
    }

    const formData = new FormData(event.target);

    axios
      .post(`${process.env.REACT_APP_API}/user/login`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response?.data);

        setCookie("token", response?.data?.token, 1);
        setLocalStorage("user", response?.data?.user);
        setLocalStorage("broker", response?.data?.broker);

        setnotifysuccess(true);
        setmessage("Login Successful");

        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
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
      <form onSubmit={handleFormSubmit} className="thesignupform">
        <h2 style={{ marginBottom: ".8em" }}>LOGIN</h2>
        <Theinput
          label="Email"
          name="email"
          type="text"
          state={email}
          setstate={setEmail}
          className="authemail"
        />
        <Theinput
          label="Password"
          name="password"
          type="password"
          state={password}
          setstate={setPassword}
          className="authpassword"
        >
          <Link to="/account/forgot-password" className="authlinks">
            Forgot Password
          </Link>
        </Theinput>
        <button type="submit" className="authbtn" disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>
        <p className="otherp">
          Don't have account{" "}
          <Link to={"/account/signup"} style={{ textDecoration: "underline" }}>
            Create One
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

export default Login;
