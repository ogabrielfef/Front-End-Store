import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import './App.css';
import Cart from './Component/Cart';
import Home from './Component/Home';
import Product from './Component/Product';

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Home } />
            <Route path="/cart" component={ Cart } />
            <Route path="/product/:id" component={ Product } />
          </Switch>
          <Link data-testid="shopping-cart-button" to="/cart">Cart</Link>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
