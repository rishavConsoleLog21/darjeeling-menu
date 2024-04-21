import React from "react";
import { formatPrice } from "../util/formatting";

const CartItem = ({ name, quantity, price, onPlus, onSub }) => {
  return (
    <li className="cart-item">
      <p>
        {name} - {quantity} x {formatPrice.format(price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={onSub}>-</button>
        <span>{quantity}</span>
        <button onClick={onPlus}>+</button>
      </p>
    </li>
  );
};

export default CartItem;
