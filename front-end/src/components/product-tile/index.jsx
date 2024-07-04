import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  fetchCartItems,
  updateQuantity,
} from "../../store/slices/cart-slice";
import axios from "axios";
import { useEffect, useState } from "react";
import QuantitySelector from "../Quantity-Component";

export default function ProductTile({ product }) {
  const { id, image, title, rating, price } = product;
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const cartItem = cart.find((item) => item.id === id);
  const isInCart = !!cartItem;
  const quantity = cartItem ? cartItem.quantity : 1;

  async function handleAddToCart() {
    dispatch(addToCart(product));
    try {
      await axios.post(
        "https://shopping-cart-server.mushari-alothman.uk/addToCart",
        product
      );
      dispatch(fetchCartItems());
    } catch (error) {
      console.error("Error adding to cart", error);
    }
  }

  async function handleRemoveFromCart() {
    if (cartItem) {
      dispatch(removeFromCart(id));
      try {
        await axios.delete(
          `https://shopping-cart-server.mushari-alothman.uk/deleteProduct/${cartItem._id}`
        );
        dispatch(fetchCartItems());
      } catch (error) {
        console.error("Error removing from cart", error);
      }
    }
  }

  async function handleIncreaseQuantity() {
    if (!disabled) {
      setDisabled(true);
      setTimeout(() => setDisabled(false), 400);
    }
    const newQuantity = quantity + 1;
    const newPrice = price * newQuantity; // Calculate the new price based on the new quantity
    dispatch(updateQuantity({ id, quantity: newQuantity }));
    try {
      await axios.put(
        `https://shopping-cart-server.mushari-alothman.uk/updateQuantity/${cartItem._id}`,
        {
          quantity: newQuantity,
          price: newPrice,
        }
      );
      dispatch(fetchCartItems());
    } catch (error) {
      console.error("Error updating quantity", error);
    }
  }

  async function handleDecreaseQuantity() {
    if (!disabled) {
      setDisabled(true);
      setTimeout(() => setDisabled(false), 400);
    }
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      const newPrice = price * newQuantity; // Calculate the new price based on the new quantity
      dispatch(updateQuantity({ id, quantity: newQuantity }));
      try {
        await axios.put(
          `https://shopping-cart-server.mushari-alothman.uk/updateQuantity/${cartItem._id}`,
          {
            quantity: newQuantity,
            price: newPrice,
          }
        );
        dispatch(fetchCartItems());
      } catch (error) {
        console.error("Error updating quantity", error);
      }
    }
  }

  return (
    <div className="flex p-1  sm:w-full w-44 mt-20  sm:mt-40  sm:mb-5  items-center justify-center h-80">
      <div className="group  flex flex-col justify-center items-center bg-white border-2 border-gray-200 gap-3 p-3 md:h-[470px] w-full sm:w-[300px] mt-12 sm:mt-0 mx-2 rounded-xl shadow-lg hover:shadow-black transition-shadow duration-400">
        <div className="self-start w-full items-center justify-center ">
          <h2 className="text-amber-500 ml-3 mt-1 font-extrabold text-lg items-center justify-center">
            {rating?.rate}
          </h2>
        </div>
        <div className="h-[100px]  w-auto sm:h-[200px] flex items-center justify-center">
          <img
            src={image}
            alt={title}
            className="object-cover h-full w-full rounded-lg select-none"
          />
        </div>
        <div className="w-full text-center mt-3">
          <h1 className="font-semibold text-gray-800 sm:text-base text-sm truncate md:whitespace-normal">
            {title}
          </h1>
          <p className="text-red-600 font-extrabold mt-3">{price} $</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center w-full mt-2 gap-3">
          {isInCart ? (
            <>
              <QuantitySelector
                quantity={quantity}
                onIncrease={handleIncreaseQuantity}
                onDecrease={handleDecreaseQuantity}
                disabled={disabled}
              />
              <button
                className="bg-red-950 hover:bg-red-700 text-sm md:text-base text-white rounded-lg font-bold sm:py-2 sm:px-4 px-3 py-1  transition-colors duration-300"
                onClick={handleRemoveFromCart}
              >
                Remove from cart
              </button>
            </>
          ) : (
            <button
              className="bg-green-600 hover:bg-green-400 text-white rounded-lg font-bold py-2 px-4 transition-colors duration-300"
              onClick={handleAddToCart}
            >
              Add to cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
