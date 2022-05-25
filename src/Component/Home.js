import React from 'react';
import { getProductsFromQuery, getProductsFromCategory } from '../services/api';
import CategoryList from './CategoryList';

class Home extends React.Component {
  state = {
    ready: false,
    value: '',
    arrayProducts: [],
    productCategory: [],
    categoryReady: false,
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
      <div key={ element.id } data-testid="product">
        <p>{element.title}</p>
        <img src={ element.thumbnail } alt={ element.title } />
        <p>{element.price}</p>
      </div>
    ));
    return elements;
  }

  render() {
    const { ready, value, arrayProducts, categoryReady } = this.state;
    return (
      <div className="home-css">
        <CategoryList click={ this.searchForCategory } />
        <div>
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
        </div>
        { !ready && !categoryReady && (
          <p
            data-testid="home-initial-message"
          >
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>) }
        <ul>
          {ready && arrayProducts.map((product) => (
            <div key={ product.id } data-testid="product">
              {`Produto: ${product.title}`}
              <br />
              <img src={ product.thumbnail } alt={ product.title } />
              <br />
              {`Preço: R$ ${product.price}`}
              <br />
            </div>
          ))}
        </ul>
        <div>{ categoryReady && this.elementsCategory() }</div>
      </div>
    );
  }
}

export default Home;
