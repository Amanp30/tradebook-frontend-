import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
//  import useFetch from "./hooks/useFetch";

function Brand() {
  const { brand } = useParams();

  // const [data, loading, error] = useFetch(
  //   `https://dummyjson.com/products/category/${brand}`
  // );

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/category/${brand}`)
      .then((res) => setData(res.data.products))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(data);

  return (
    <div>
      asdg
      {data?.map((item, index) => {
        return (
          <>
            <div>
              <h1>{item?.title}</h1>
              <p>{item?.description}</p>
              {item.images.map((image) => {
                return (
                  <>
                    <img src={image} />
                  </>
                );
              })}
            </div>
          </>
        );
      })}
    </div>
  );
}

export default Brand;
