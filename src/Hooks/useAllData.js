import { useState, useEffect } from "react";
import Axios from "axios"

const useFetch = (api) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);


  async function fetchData(url) {
    try {
      const response = await Axios.get(url);
      setLoading(false)
      return response;
      
      
    } catch (error) {
      console.error(error);
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchData(api).then((data) => setData(data.data));
  }, [api]);

  return { data, loading };
};

export default useFetch;
