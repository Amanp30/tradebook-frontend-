import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Products() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products/categories")
      .then((res) => setData(res.data))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(data);

  return (
    <div>
      {data.map((item, index) => {
        return (
          <React.Fragment>
            <div>
              {" "}
              <Link to={`/products/${item}`}>{item}</Link>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default Products;
