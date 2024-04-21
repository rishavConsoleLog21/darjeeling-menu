import React, { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../context/CartContext";
import { formatPrice } from "../util/formatting";
import Button from "./UI/Button";
import UserProgressContext from "../context/UserProgressContext";
import CartItem from "./CartItem";

const Cart = () => {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotalAmount = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.quantity * item.price;
  }, 0);

  function handleCloseCart() {
    userProgressCtx.hideCart();
  }

  function handleGotoCheckout() {
    userProgressCtx.showCheckout();
  }

  return (
    <Modal
      className="cart"
      open={userProgressCtx.progress === "cart"}
      onClose={userProgressCtx.progress === "cart" ? handleCloseCart : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onPlus={() => cartCtx.addItem(item)}
            onSub={() => cartCtx.removeItem(item.id)}
          />
        ))}
      </ul>
      <p className="cart-total">{formatPrice.format(cartTotalAmount)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        {cartCtx.items.length > 0 && (
          <Button onClick={handleGotoCheckout}>Check-Out</Button>
        )}
      </p>
    </Modal>
  );
};

export default Cart;
