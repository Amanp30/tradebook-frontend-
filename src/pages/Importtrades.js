import React, { useEffect } from "react";
import Layout from "../components/Layout";
import useNotify from "../hooks/useNotify";

function Importtrades() {
  const {
    clearnotification,
    notifysuccess,
    notifyerror,
    message,
    setnotifysuccess,
    setmessage,
    setnotifyerror,
  } = useNotify();

  useEffect(() => {
    setmessage("hello");
    setnotifysuccess(true);
  }, []);

  return (
    <>
      <Layout
        message={message}
        success={notifysuccess}
        setsuccess={setnotifysuccess}
        error={notifyerror}
        seterror={setnotifyerror}
      >
        f
      </Layout>
    </>
  );
}

export default Importtrades;
