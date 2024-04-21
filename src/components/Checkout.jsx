import React, { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../context/CartContext";
import { formatPrice } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../context/UserProgressContext";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

const Checkout = () => {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const {
    isLoading: isSending,
    error,
    data,
    sendRequest,
    clearData,
  } = useHttp("http://localhost:3000/orders", requestConfig);

  const cartTotalAmount = cartCtx.items.reduce(
    (curNumber, item) => curNumber + item.quantity * item.price,
    0
  );

  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  function handleFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const userData = Object.fromEntries(formData.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: userData,
        },
      })
    );
  }

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleClose}>
        Close
      </Button>
      <Button>Confirm</Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending order data...</span>;
  }

  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleFinish}
      >
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>
          We will get back to you with more details via email within the next
          few minutes.
        </p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {formatPrice.format(cartTotalAmount)}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="E-Mail Address" type="email" id="email" />
        <Input label="Phone No." type="number" id="phone" />
        <div className="control-row">
          <Input label="Table No." type="number" id="table" />
          <Input label="Parcel" type="text" id="parcel" placeholder="Yes/No"/>
        </div>
        {error && <Error title="failed to submit order" message={error} />}
        <p className="modal-actoins">{actions}</p>
      </form>
    </Modal>
  );
};

export default Checkout;
