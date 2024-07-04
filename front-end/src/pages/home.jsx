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
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      {loading ? (
        <div className="flex justify-center items-center w-full h-full">
          <ProgressBar
            width={150}
            height={150}
            barColor="rgb(127,29,29)"
            borderColor="black"
          />
        </div>
      ) : (
        <div className=" grid  grid-cols-2  md:grid-cols-3 lg:grid-cols-4 w-full max-w-screen-xl mt-20 mb-20">
          {products && products.length > 0 ? (
            products.map((productItem) => (
              <ProductTile key={productItem.id} product={productItem} />
            ))
          ) : (
            <p className="text-gray-600 text-center w-full">
              No products found
            </p>
          )}
        </div>
      )}
    </div>
  );
}
