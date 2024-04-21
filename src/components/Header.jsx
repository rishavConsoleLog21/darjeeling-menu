import { useContext } from "react";
import logoImg from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../context/CartContext";

const Header = () => {
  const cartCtx = useContext(CartContext);

  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="Darjeeling Restaurant" />
        <h1>Darjeeling Foods</h1>
      </div>
      <nav>
        <Button textOnly>Cart({totalCartItems})</Button>
        <Button textOnly>License</Button>
      </nav>
    </header>
  );
};

export default Header;
