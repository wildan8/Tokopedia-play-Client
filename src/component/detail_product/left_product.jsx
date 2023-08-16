import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios"


export default function LeftProd() {
  const params = useParams();
  const [Product, setProduct] = useState([]);

  async function fetchData() {
    try {
      const response = await Axios.get(process.env.REACT_APP_DEFAULT_API_URL +`/product-detail/${params.thumbsID}`);      
      return response;
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchData().then((data) => setProduct(data.data));
  }, []);

  return (
    <>
      {Product.map((data) => (
        <div
          key={data._id}
          className="relative hover:scale-105 transition duration-300 ease-in-out"
        >
          <a href={data.ProductLink}>
            <img
              className="w-full object-cover aspect-[16/9] rounded-lg"
              src={require("../../images/" + data.PicsURL + ".jpeg")}
              alt="Gambar Product"
              srcset=""
            />
            <div className="absolute bottom-0 px-3 py-1 bg-darkTokPed bg-opacity-75 w-full ">
              <h1 className="text-base font-semibold">{data.title}</h1>
              <div className="text-xs font-light bg-green-tokopedia bg-opacity-80 rounded-full px-2 w-fit">
                <h1>Rp. {data.price}</h1>
              </div>
            </div>
          </a>
        </div>
      ))}
    </>
  );
}
