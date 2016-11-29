import React, { Component } from 'react';

class ProductIndexItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      product: this.props.product,
      style: null
    };
    this.formatPrice = this.formatPrice.bind(this);
    this.grow = this.grow.bind(this);
  }

  formatPrice() {
    return `$${this.state.product.msrpInCents / 100}`;
  }

  grow(e) {
    e.preventDefault();
    const newStyle = this.state.style ? null : {width: "500px", height: "500px"};
    this.setState({style: newStyle});
  }

  render() {
    return(
      <div className="product-container" style={this.state.style} onClick={this.grow}>
        <img className="product-image" src={`http://${this.state.product.mainImage.ref}`} />
        <div className="product-info">
          <h1 className="product-name">{this.state.product.name}</h1>
          <h2 className="product-price">{this.formatPrice()}</h2>
        </div>
      </div>
    );
  }
}

export default ProductIndexItem;
