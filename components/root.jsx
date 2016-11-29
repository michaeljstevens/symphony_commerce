import React, { Component } from 'react';
import ProductIndex from './product_index.jsx';
import $ from 'jquery';
import Rcslider from 'rc-slider';

class Root extends Component {

  constructor(props) {
    super(props);
    this.state = {
      allProducts: null,
      showProducts: null,
      sortBy: "default"
    };
    this.filterPrice = this.filterPrice.bind(this);
  }

  componentDidMount() {
    const error = message => console.log(message);
    const success = response => {
      this.setState({allProducts: response.products, showProducts: this.sortByPrice(response.products)});
    };
    $.ajax({
      method: 'GET',
      url: 'https://sneakpeeq-sites.s3.amazonaws.com/interviews/ce/feeds/store.js',
      dataType: 'JSON',
      success,
      error
    });
  }

  sortByPrice(products) {
    return (products.sort((a,b) => {
        if(a.msrpInCents < b.msrpInCents) {
          return -1;
        } else if(b.msrpInCents < a.msrpInCents) {
          return 1;
        } else {
          return 0;
        }
      })
    );
  }

  filterPrice(range) {
    const filteredProducts = this.state.allProducts.filter(product => {
      return ((product.msrpInCents / 100) >= range[0] && (product.msrpInCents / 100) <= range[1]);
    });
    this.setState({showProducts: filteredProducts});
  }

  render() {
    return(
      <div className="outer-container">
        <div className="filters-container">
          <div className="price-slider">
            <Rcslider range={true} max={50} defaultValue={[0, 100]}
              pushable={3} onAfterChange={this.filterPrice}/>
          </div>
        </div>
        <ProductIndex products = {this.state.showProducts} />
      </div>
    );
  }
}

export default Root;
