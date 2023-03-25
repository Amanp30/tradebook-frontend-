import React from "react";
import { useParams } from "react-router-dom";

function User() {
  const { user } = useParams();

  return <div>{user}</div>;
}

export default User;
