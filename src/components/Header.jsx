import { useContext } from "react";
import logoImg from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../context/CartContext";
import UserProgressContext from "../context/UserProgressContext";

const Header = () => {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  function handleShowCart() {
    userProgressCtx.showCart();
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="Darjeeling Restaurant" />
        <h1>Darjeeling Foods</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>Cart({totalCartItems})</Button>
        <Button textOnly>License</Button>
      </nav>
    </header>
  );
};

export default Header;
