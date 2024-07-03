import { useEffect, useState } from "react";
import { ProgressBar } from "react-loader-spinner";
import ProductTile from "../components/product-tile";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  async function fetchProducts() {
    setLoading(true);
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className=" bg-gray-50   flex items-center justify-center w-full ">
      {loading ? (
        <div className="min-h-screen w-full flex justify-center items-center">
          <ProgressBar
            width={"150"}
            height={"150"}
            barColor="rgb(127,29,29)"
            borderColor="black"
          />
        </div>
      ) : (
        <div className="  min-h-[80vh] grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-11/12 p-3 gap-6 m-20">
          {products && products.length
            ? products.map((productItem) => (
                <ProductTile key={productItem.id} product={productItem} />
              ))
            : null}
        </div>
      )}
    </div>
  );
}
