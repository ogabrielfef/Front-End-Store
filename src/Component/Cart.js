import React from 'react';

class Cart extends React.Component {
  state = {
    arrayProducts: [],
  }

  componentDidMount = () => {
    this.getProductsLocalStorage();
  }

  getProductsLocalStorage = () => {
    const productsLocalStorage = JSON.parse(localStorage.getItem('Products'));
    this.setState({ arrayProducts: productsLocalStorage });
    this.setIdsState(productsLocalStorage);
  }

  aumentar = (event) => {
    const target = event.target.className;
    const { [target]: id } = this.state;
    const aumenta = parseInt(id, 10) + 1;
    this.setState({ [target]: aumenta });
  }

  diminuir = (event) => {
    const target = event.target.className;
    const { [target]: id } = this.state;
    if (id >= 2) {
      const diminui = parseInt(id, 10) - 1;
      this.setState({ [target]: diminui });
    }
  }

  setIdsState = (array) => {
    if (array !== null) {
      array.map((product) => this.setState({ [product.id]: 1 }));
    }
  }

  setParagrafo = (id) => {
    const { [id]: product } = this.state;
    return <p data-testid="shopping-cart-product-quantity">{product}</p>;
  }

  render() {
    const { arrayProducts } = this.state;
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
                  className={ product.id }
                >
                  Diminuir
                </button>
                {this.setParagrafo(product.id)}
                <button
                  type="button"
                  onClick={ this.aumentar }
                  data-testid="product-increase-quantity"
                  className={ product.id }
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
