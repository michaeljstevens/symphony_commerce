import React, { Component } from 'react';

class ProductIndexItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      product: this.props.product,
    };
    this.formatPrice = this.formatPrice.bind(this);
  }

  formatPrice() {
    return `$${this.state.product.msrpInCents / 100}`;
  }

  render() {
    return(
      <div className="product-container">
        <img className="product-image" src={`https://${this.state.product.mainImage.ref}`} />
        <div className="product-info">
          <h1 className="product-name">{this.state.product.name}</h1>
          <h2 className="product-price">{this.formatPrice()}</h2>
        </div>
      </div>
    );
  }
}

export default ProductIndexItem;
