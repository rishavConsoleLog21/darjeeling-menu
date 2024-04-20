import logoImg from "../assets/logo.jpg";
import Button from "./UI/Button";

const Header = () => {
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="Darjeeling Restaurant" />
        <h1>Darjeeling Foods</h1>
      </div>
      <nav>
        <Button textOnly>License</Button>
      </nav>
    </header>
  );
};

export default Header;
