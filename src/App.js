import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import './App.css';
import Cart from './Component/Cart';
import CategoryList from './Component/CategoryList';
import Home from './Component/Home';

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Home } />
            <Route path="/cart" component={ Cart } />
          </Switch>
          <Link data-testid="shopping-cart-button" to="/cart">Cart</Link>
        </BrowserRouter>
        <CategoryList />
      </div>
    );
  }
}

export default App;
