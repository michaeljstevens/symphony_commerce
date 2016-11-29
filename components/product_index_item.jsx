import React, { Component } from 'react';

class ProductIndexItem extends Component {
  render() {
    const product = this.props.product;
    return(
      <div>
        <h1>{product.name}</h1>
        <img src={`http://${product.mainImage.ref}`} />
        <h2>{product.msrpInCents}</h2>
      </div>
    );
  }
}

export default ProductIndexItem;
