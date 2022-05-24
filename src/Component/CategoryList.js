import React from 'react';
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

    const allCategories = categories.map((category) => (
      <label data-testid="category" htmlFor={ category.id } key={ category.id }>
        <input name="category" type="radio" id={ category.id } />
        { category.name }
      </label>
    ));

    return allCategories;
  }

  render() {
    const { categories } = this.state;

    return (
      <div>
        { categories !== undefined && this.categoryList() }
      </div>
    );
  }
}

export default CategoryList;
