import React from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromQuery, getProductsFromCategory } from '../services/api';
import CategoryList from './CategoryList';
import Header from './Header';
import './Home.css';

class Home extends React.Component {
  state = {
    ready: false,
    value: '',
    arrayProducts: [],
    productCategory: [],
    categoryReady: false,
    objectProductsCart: [],
  }

  getValue = (event) => {
    this.setState({ value: event.target.value });
  }

  searchItems = async () => {
    const { value } = this.state;
    this.setState({ ready: true, categoryReady: false });
    const resultProducts = await getProductsFromQuery(value);
    this.setState({ arrayProducts: resultProducts.results });
  }

  searchForCategory = async (event) => {
    const idCategory = event.target.id;
    const categoryProducts = await getProductsFromCategory(idCategory);
    this.setState({ productCategory: categoryProducts,
      categoryReady: true,
      ready: false });
  }

  elementsCategory = () => {
    const { productCategory } = this.state;
    const elements = productCategory.map((element) => (
      <div key={ element.id } data-testid="product" className="card">
        <Link data-testid="product-detail-link" to={ `/product/${element.id}` }>
          <p>{element.title}</p>
          <img src={ element.thumbnail } alt={ element.title } />
        </Link>
        <p>{`R$: ${element.price}`}</p>
        <button
          type="button"
          data-testid="product-add-to-cart"
          onClick={ () => this.onAddCart(element) }
        >
          Adicionar ao Carrinho
        </button>
      </div>
    ));
    return elements;
  }

  onAddCart = (product) => {
    this.setState((previousState) => (
      { objectProductsCart: [...previousState.objectProductsCart, product] }),
    this.saveLocalStorage);
  }

  saveLocalStorage = () => {
    const { objectProductsCart } = this.state;
    localStorage.setItem('Products', JSON.stringify(objectProductsCart));
  }

  render() {
    const { ready, value, arrayProducts, categoryReady } = this.state;
    return (
      <div className="home-css">
        <Header />
        <div className="content">
          <CategoryList click={ this.searchForCategory } />
          <div className="container">
            <div className="search">
              <input
                type="text"
                data-testid="query-input"
                onChange={ this.getValue }
                value={ value }
              />
              <button
                type="button"
                data-testid="query-button"
                onClick={ this.searchItems }
              >
                Pesquisar
              </button>
              <Link data-testid="shopping-cart-button" to="/cart">
                ????
              </Link>
            </div>
            { !ready && !categoryReady && (
              <p
                data-testid="home-initial-message"
              >
                Digite algum termo de pesquisa ou escolha uma categoria.
              </p>) }
            <div className="products-list">
              {ready && arrayProducts.map((product) => (
                <div key={ product.id } data-testid="product" className="card">
                  <Link data-testid="product-detail-link" to={ `/product/${product.id}` }>
                    {`Produto: ${product.title}`}
                    <br />
                    <img src={ product.thumbnail } alt={ product.title } />
                  </Link>
                  <br />
                  {`R$: ${product.price}`}
                  <br />
                  <button
                    type="button"
                    data-testid="product-add-to-cart"
                    onClick={ () => this.onAddCart(product) }
                  >
                    Adicionar ao Carrinho
                  </button>
                </div>
              ))}
            </div>
            <div className="products-list">
              { categoryReady && this.elementsCategory() }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
