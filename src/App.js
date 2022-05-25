import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import './App.css';
import Cart from './Component/Cart';
import CategoryList from './Component/CategoryList';
import Home from './Component/Home';

class App extends React.Component {
  state = {
    productCategory: [],
    categoryReady: false,
  }

  searchForCategory = async (event) => {
    const idCategory = event.target.id;
    const url = `https://api.mercadolibre.com/sites/MLB/search?category=${idCategory}`;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ productCategory: data.results, categoryReady: true });
  }

  elementsCategory = () => {
    const { productCategory } = this.state;
    const elements = productCategory.map((element) => (
      <div key={ element.id } data-testid="product">
        <p>{element.title}</p>
        <img src={ element.thumbnail } alt={ element.title } />
        <p>{element.price}</p>
      </div>
    ));
    return elements;
  }

  render() {
    const { categoryReady } = this.state;
    return (
      <div className="home-css">
        <CategoryList click={ this.searchForCategory } />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Home } />
            <Route path="/cart" component={ Cart } />
          </Switch>
          <Link data-testid="shopping-cart-button" to="/cart">Cart</Link>
        </BrowserRouter>
        <div>{ categoryReady && this.elementsCategory() }</div>
      </div>
    );
  }
}

export default App;
