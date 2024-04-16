import logoImg from "../assets/logo.jpg";

const Header = () => {
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="Darjeeling Restaurant" />
        <h1>Darjeeling Foods</h1>
      </div>
      <nav>
        <button>License</button>
      </nav>
    </header>
  );
};

export default Header;
