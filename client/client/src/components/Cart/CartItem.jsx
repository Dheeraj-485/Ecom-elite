import React from "react";
import { useDispatch } from "react-redux";
import { removeFromCart, updateCart } from "../../redux/cartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex justify-center border-b py-4">
      <img
        src={item.product.thumbnail.url}
        alt={item.product.title}
        className="w-20 h-20 object-cover rounded"
      />
      <div className="ml-4">
        <h3 className="text-lg font-semibold">{item.product.title}</h3>
        <p className="text-gray-300">{item.product.price.toFixed(2)}</p>
      </div>
      <div className="ml-auto flex items-center">
        <button
          onClick={() =>
            dispatch(updateCart({ productId: item.product._id, quantity: 1 }))
          }
          className="bg-gray-200 px-3 py-1 rounded-l"
        >
          +
        </button>
        <span className="px-4">{item.quantity}</span>
        <button
          onClick={() =>
            dispatch(updateCart({ productId: item.product._id, quantity: -1 }))
          }
          className="bg-gray-200 px-3 py-1 rounded-r"
        >
          -
        </button>

        <button
          onClick={() => dispatch(removeFromCart(item.product._id))}
          className="ml-4 bg-red-500 text-white px-3 py-1 rounded"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
