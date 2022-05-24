import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render() {
    return (
      <div>
        <h1>Loja</h1>
        <nav>
          <Link to="/cart">Carrinho</Link>
        </nav>
      </div>
    );
  }
}

export default Header;
