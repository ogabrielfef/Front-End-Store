import React from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api';

class CategoryList extends React.Component {
  state = {
    categories: undefined,
  }

  componentDidMount() {
    this.callGetCategories();
  }

  callGetCategories = async () => {
    const response = await getCategories();

    this.setState({ categories: response });
  }

  categoryList = () => {
    const { categories } = this.state;
    const { click } = this.props;
    const allCategories = categories.map((category) => (
      <label data-testid="category" htmlFor={ category.id } key={ category.id }>
        <input name="category" type="radio" id={ category.id } onClick={ click } />
        { category.name }
      </label>
    ));

    return allCategories;
  }

  render() {
    const { categories } = this.state;

    return (
      <div id="category-css">
        { categories !== undefined && this.categoryList() }
      </div>
    );
  }
}

CategoryList.propTypes = {
  click: PropTypes.func.isRequired,
};

export default CategoryList;
