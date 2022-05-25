import React from 'react';

class Cart extends React.Component {
  state = {
    arrayProducts: [],
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

  render() {
    const { arrayProducts } = this.state;
    return (
      <div>
        <p data-testid="shopping-cart-empty-message" />
        <div>
          {arrayProducts.map((product) => (
            <li key={ product.id }>
              <p data-testid="shopping-cart-product-name">
                {`Produto: ${product.title}`}
              </p>
              <br />
              <img src={ product.thumbnail } alt={ product.title } />
              <br />
              {`Preço: R$ ${product.price}`}
              <br />
              <p data-testid="shopping-cart-product-quantity">1</p>
            </li>))}
        </div>
      </div>
    );
  }
}

export default Cart;
