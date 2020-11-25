import React from "react";

import "./styles.css";
import logo from "../../assets/images/DevoluTI.svg";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header>
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="menu">
        <Link to="/providers">Fornecedores</Link>
        <Link to="/products">Produtos</Link>
      </div>
    </header>
  );
};

export default Header;
