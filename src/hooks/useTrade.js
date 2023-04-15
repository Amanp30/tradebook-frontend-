import { useState, useEffect } from "react";
import { getDistinctTrades } from "../services/apiEndpoints";

export default function useTrade() {
  const [symboldata, setSymboldata] = useState([]);

  useEffect(() => {
    getDistinctTrades()
      .then((response) => setSymboldata(response))
      .catch((error) => console.log(error));
  }, []);

  return {
    symboldata,
  };
}
