import { useDispatch } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
  fetchCartItems,
} from "../../store/slices/cart-slice";
import axios from "axios";
import QuantitySelector from "../Quantity-Component";
import { useState } from "react";

export default function CartTile({ cartItem }) {
  const dispatch = useDispatch();
  const { id, image, title, price, _id, quantity } = cartItem;
  const unitPrice = price / quantity; // Calculate the unit price
  const [disabled, setDisabled] = useState(false);

  async function handleRemoveFromCart() {
    dispatch(removeFromCart(id));
    console.log(cartItem);
    try {
      await axios.delete(
        `https://shopping-cart-server.mushari-alothman.uk/deleteProduct/${_id}`
      );
    } catch (error) {
      console.error("Error removing from cart", error);
    }
  }

  async function handleIncreaseQuantity() {
    if (!disabled) {
      setDisabled(true);
      setTimeout(() => setDisabled(false), 400); // 400ms delay
    }
    const newQuantity = quantity + 1;
    const newPrice = unitPrice * newQuantity; // Calculate the new price based on the new quantity
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
    } finally {
    }
  }

  async function handleDecreaseQuantity() {
    if (!disabled) {
      setDisabled(true);
      setTimeout(() => setDisabled(false), 400); // 400ms delay
    }
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      const newPrice = unitPrice * newQuantity; // Calculate the new price based on the new quantity
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
    <div className="border-4 p-2 mt-7 border-gray-200 shadow-lg hover:shadow-black transition-shadow duration-400 flex flex-col sm:flex-row items-center justify-between bg-white  mb-3 w-full rounded-xl sm:ml-5 ">
      <div className="flex p-3  w-full flex-col sm:flex-row items-center">
        <img className="h-28 w-28 rounded-lg" src={image} alt={title}></img>
        <div className="ml-0 sm:ml-5 self-start space-y-5 w-full text-center sm:text-left">
          <h1 className=" md:text-xl text-black font-bold text-xs">{title}</h1>
          <p className="text-red-600 font-extrabold">{price}</p>
          <QuantitySelector
            quantity={quantity}
            onDecrease={handleDecreaseQuantity}
            onIncrease={handleIncreaseQuantity}
            disabled={disabled}
          ></QuantitySelector>
        </div>
      </div>
      <div className="flex justify-center sm:justify-end w-full sm:w-2/6 text-center items-center mt-3 sm:mt-0">
        <button
          className="flex py-3 w-full sm:w-auto px-3 bg-red-950 text-center justify-center hover:bg-red-700 text-white rounded-lg font-bold transition-colors duration-300"
          onClick={handleRemoveFromCart}
        >
          Remove from cart
        </button>
      </div>
    </div>
  );
}
