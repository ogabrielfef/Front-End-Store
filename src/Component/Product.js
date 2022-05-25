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

    console.log(response);

    this.setState({
      info: response,
      ready: true,
    });
  }

  createItem = () => {
    const { info } = this.state;

    return (
      <div>
        <p data-testid="product-detail-name">{ info.title }</p>
        <img src={ info.thumbnail } alt={ info.title } />
        <p>{ info.price }</p>
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
