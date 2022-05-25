import React from 'react';

class Cart extends React.Component {
  state = {
    arrayProducts: [],
    value: 1,
  }

  componentDidMount = () => {
    this.getProductsLocalStorage();
  }

  getProductsLocalStorage = () => {
    const { arrayProducts } = this.state;
    const productsLocalStorage = JSON.parse(localStorage.getItem('Products'));
    this.setState({ arrayProducts: productsLocalStorage });
    return arrayProducts;
  }

  aumentar = () => {
    const { value } = this.state;
    const aumenta = parseInt(value, 10) + 1;
    this.setState({ value: aumenta });
  }

  diminuir = () => {
    const { value } = this.state;
    if (value >= 2) {
      const aumenta = parseInt(value, 10) - 1;
      this.setState({ value: aumenta });
    }
  }

  render() {
    const { arrayProducts, value } = this.state;
    return (
      <div>
        { !arrayProducts ? (
          <p
            data-testid="shopping-cart-empty-message"
          >
            Seu carrinho está vazio
          </p>
        ) : (
          <div>
            {arrayProducts.map((product) => (
              <li key={ product.id }>
                <p data-testid="shopping-cart-product-name">
                  {`${product.title}`}
                </p>
                <br />
                <img src={ product.thumbnail } alt={ product.title } />
                <br />
                {`Preço: R$ ${product.price}`}
                <br />
                <button
                  type="button"
                  onClick={ this.diminuir }
                  data-testid="product-decrease-quantity"
                >
                  Diminuir
                </button>
                <p data-testid="shopping-cart-product-quantity">{value}</p>
                <button
                  type="button"
                  onClick={ this.aumentar }
                  data-testid="product-increase-quantity"
                >
                  Aumentar
                </button>
              </li>))}
          </div>
        )}
      </div>
    );
  }
}

export default Cart;
