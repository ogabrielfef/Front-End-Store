import React from 'react';
import { getProductsFromQuery } from '../services/api';

class Home extends React.Component {
  state = {
    ready: false,
    value: '',
    arrayProducts: [],
  }

  getValue = (event) => {
    this.setState({ value: event.target.value });
  }

  searchItems = async () => {
    const { value } = this.state;
    this.setState({ ready: true });
    const resultProducts = await getProductsFromQuery(value);
    this.setState({ arrayProducts: resultProducts.results });
    console.log(resultProducts.results);
  }

  render() {
    const { ready, value, arrayProducts } = this.state;
    return (
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
        { !ready && (
          <p
            data-testid="home-initial-message"
          >
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>) }
        <ul>
          {arrayProducts.map((product) => (
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
      </div>
    );
  }
}

export default Home;
