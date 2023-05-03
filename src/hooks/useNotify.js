import { useState } from "react";

export default function useNotify() {
  const [notifysuccess, setnotifysuccess] = useState(false);
  const [notifyerror, setnotifyerror] = useState(false);
  const [message, setmessage] = useState("");

  function clearnotification() {
    setmessage("");
    setnotifysuccess(false);
    setnotifyerror(false);
  }

  return {
    clearnotification,
    notifysuccess,
    notifyerror,
    message,
    setnotifysuccess,
    setmessage,
    setnotifyerror,
  };
}
