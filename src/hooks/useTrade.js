import { useState, useEffect } from "react";
import { getDistinctTrades } from "../services/apiEndpoints";

export default function useTrade(setbyindex, setstate) {
  const [symboldata, setSymboldata] = useState([]);

  useEffect(() => {
    getDistinctTrades()
      .then((response) => {
        setSymboldata(response);
        setbyindex && setstate(response?.systemIds?.[0]);
      })
      .catch((error) => console.log(error));
  }, []);

  return {
    symboldata,
  };
}
