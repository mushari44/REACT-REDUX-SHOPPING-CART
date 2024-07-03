
import React from "react";

export default function QuantitySelector({ quantity, onIncrease, onDecrease }) {
  return (
    <div className="flex items-center">
      <button
        className="bg-gray-300 text-gray-800 font-bold py-1 px-2 rounded-l hover:bg-gray-400 focus:outline-none"
        onClick={onDecrease}
      >
        -
      </button>
      <span className="px-3 select-none">{quantity}</span>
      <button
        className="bg-gray-300 text-gray-800 font-bold py-1 px-2 rounded-r hover:bg-gray-400 focus:outline-none"
        onClick={onIncrease}
      >
        +
      </button>
    </div>
  );
}
