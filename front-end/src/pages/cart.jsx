import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartTile from "../components/cart-tile";
import { fetchCartItems } from "../store/slices/cart-slice";

export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  // Calculate total items in cart
  const totalItems = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  // Calculate total cart amount
  const totalCart = cart.reduce((acc, curr) => acc + curr.price, 0);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  return (
    <div className="flex justify-center ">
      {cart && cart.length ? (
        <>
          <div className="md:min-w-[100vw]   grid grid-cols-2 max-w-6xl mx-auto justify-start items-start m-32">
            <div className="flex flex-col w-56  md:flex-col justify-center items-center p-3 md:w-full">
              {cart.map((item) => (
                <CartTile key={item.id} cartItem={item} />
              ))}
            </div>
            <div className=" w-40 md:w-64 flex flex-col border-4 shadow-xl p-5 md:space-y-5 space-y-2 mt-10 fixed md:right-60 md:top-32 right-0 text-center ">
              <h1 className="font-bold md:text-lg    text-sm">
                Your Cart Summary
              </h1>
              <p>
                <span className=" font-bold md:text-lg ">Total Items: </span>
                <span className="text-red-600 font-extrabold md:text-lg">
                  {totalItems}
                </span>
              </p>
              <p>
                <span className=" font-bold md:text-lg">Total Amount: </span>
                <span className="text-red-600  text-lg font-bold ">
                  {totalCart.toFixed(2)} $ {/* Fixed to 2 decimal places */}{" "}
                </span>
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="min-h-[80vh] flex flex-col items-center justify-center">
          <h1 className="text-gray-800 font-extrabold text-3xl mb-5">
            Your cart is empty
          </h1>
          <Link to={"/"}>
            <button className="bg-red-900 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-all duration-500 transform hover:scale-110 active:scale-90">
              Shop now
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
