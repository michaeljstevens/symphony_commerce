import React, { Component } from 'react';
import ProductIndexItem from './product_index_item.jsx';


class ProductIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: props.products
    };
  }

  componentWillReceiveProps(newProps) {
    if(newProps.products) {
      this.setState({products: newProps.products});
    }
  }

  render() {
    return(
      <ul className="product-index">
        {this.state.products ? this.state.products.map(product => {
            return(<li key={product.id}>
              <ProductIndexItem product={product} />
            </li>);
          }) : null}
      </ul>
    );
  }
}

export default ProductIndex;
