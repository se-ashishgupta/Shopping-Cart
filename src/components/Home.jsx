import React, { useEffect, useState } from "react";
import Productcard from "./Productcard";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import axios from "axios";
import Loader from "./Loader";
const Home = () => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("https://fakestoreapi.com/products");
      setData(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const dispatch = useDispatch();

  const addTocartHandler = (option) => {
    dispatch({ type: "addToCart", payload: option });
    dispatch({
      type: "calculateTotal",
    });
    toast.success("Added to Cart");
  };
  return loading ? (
    <Loader />
  ) : (
    <div className="home">
      {data.map((i) => (
        <Productcard
          key={i.id}
          name={i.title}
          price={i.price}
          imgSrc={i.image}
          id={i.id}
          handler={addTocartHandler}
        />
      ))}
    </div>
  );
};

export default Home;
