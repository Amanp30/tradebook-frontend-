import { useState, useEffect } from "react";
import api from "../services/api";

export default function useTrade() {
  const [symboldata, setSymboldata] = useState([]);

  useEffect(() => {
    api
      .get("/trade/distinctsymbol")
      .then((response) => setSymboldata(response?.data?.symbols))
      .catch((error) => console.log(error));
  }, []);

  return {
    symboldata,
  };
}
