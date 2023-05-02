import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUrlTostate } from "../Actions";

function MyPreviousUrls() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(addUrlTostate());
  }, [dispatch, location]);
}

export default MyPreviousUrls;
