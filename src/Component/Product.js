import React from 'react';
import PropTypes from 'prop-types';
import { getProductItemFromId } from '../services/api';

class Product extends React.Component {
  state = {
    info: {},
    ready: false,
  }

  componentDidMount() {
    this.callGetItem();
  }

  callGetItem = async () => {
    const { match: { params: id } } = this.props;

    const response = await getProductItemFromId(id.id);

    this.setState({
      info: response,
      ready: true,
    });
  }

  getCart = () => {
    const { info } = this.state;
    const arrayInfo = [info];
    const cart = JSON.parse(localStorage.getItem('Products'));
    if (cart === null) {
      localStorage.setItem('Products', JSON.stringify(arrayInfo));
    } else {
      const addItem = [...cart, info];
      localStorage.setItem('Products', JSON.stringify(addItem));
    }
  }

  createItem = () => {
    const { info } = this.state;

    return (
      <div>
        <p data-testid="product-detail-name">{ info.title }</p>
        <img src={ info.thumbnail } alt={ info.title } />
        <p>{ info.price }</p>
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ this.getCart }
        >
          Adicionar ao Carrinho
        </button>
      </div>
    );
  }

  render() {
    const { ready } = this.state;

    return (
      <div>
        {ready && this.createItem()}
      </div>
    );
  }
}

Product.propTypes = {
  match: PropTypes.shape().isRequired,
};

export default Product;
