import React, { Component } from 'react';
import ProductIndex from './product_index.jsx';
import $ from 'jquery';
import Rcslider from 'rc-slider';
import Select from 'react-select';

class Root extends Component {

  constructor(props) {
    super(props);
    this.state = {
      allProducts: null,
      showProducts: null,
      sortBy: "default",
      options: [
        { value: 'price', label: 'Price' },
        { value: 'name', label: 'Name' },
        { value: 'date', label: 'Recently Added' }
      ]
    };
    this.filterPrice = this.filterPrice.bind(this);
    this.sortProducts = this.sortProducts.bind(this);
    this.sortByPrice = this.sortByPrice.bind(this);
    this.sortByName = this.sortByName.bind(this);
    this.sortByDate = this.sortByDate.bind(this);
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

  sortByName(products) {
    return (products.sort((a,b) => {
        if(a.name < b.name) {
          return -1;
        } else if(b.name < a.name) {
          return 1;
        } else {
          return 0;
        }
      })
    );
  }

  sortByDate(products) {
    return (products.sort((a,b) => {
        if(a.createdAt < b.createdAt) {
          return -1;
        } else if(b.createdAt < a.createdAt) {
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

  sortProducts(type) {
    let sortedProducts;
    if(type.value === 'price') {
      sortedProducts = this.sortByPrice(this.state.showProducts);
    } else if(type.value === 'name') {
      sortedProducts = this.sortByName(this.state.showProducts);
    } else {
      sortedProducts = this.sortByDate(this.state.showProducts);
    }
    this.setState({showProducts: sortedProducts});
  }

  render() {
    return(
      <div className="outer-container">
        <div className="filters-container">
          <div className="price-slider">
            <h1>Select Price Range</h1>
            <Rcslider range={true} max={40} defaultValue={[0, 100]}
              pushable={3} onAfterChange={this.filterPrice}
              marks={{0: "0", 10: "10", 20: "20", 30: "30" }}/>
          </div>
          <div className="sort-options">
            <Select
              options={this.state.options}
              onChange={this.sortProducts}
              />
          </div>
        </div>
        <ProductIndex products={this.state.showProducts} />
      </div>
    );
  }
}

export default Root;
