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
      priceFiltered: null,
      searchFiltered: null,
      sortBy: "price",
      priceRange: [0, 40],
      options: [
        { value: 'price', label: 'Price' },
        { value: 'name', label: 'Name' },
        { value: 'date', label: 'Recently Added' }
      ]
    };
    this.priceFilter = this.priceFilter.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.sortProducts = this.sortProducts.bind(this);
    this.searchFilter = this.searchFilter.bind(this);
  }

  componentDidMount() {
    const error = message => console.log(message);
    const success = response => {
      this.setState({allProducts: response.products,
                     showProducts: this.sortProducts(response.products),
                     priceFiltered: response.products,
                     searchFiltered: response.products
                   });
    };
    $.ajax({
      method: 'GET',
      url: 'https://sneakpeeq-sites.s3.amazonaws.com/interviews/ce/feeds/store.js',
      dataType: 'JSON',
      success,
      error
    });
  }

  handleSort(e) {
    const type = e.target.value;
    const sortedProducts = this.sortProducts(this.state.showProducts, type);
    this.setState({showProducts: sortedProducts, sortBy: type});
  }

  sortProducts(products, type) {

    const sortTypes = {
      price: "msrpInCents",
      name: "name",
      date: "createdAt"
    };

    type = type ? sortTypes[type] : sortTypes[this.state.sortBy];

    return (products.sort((a,b) => {
        if(a[type] < b[type]) {
          return -1;
        } else if(b[type] < a[type]) {
          return 1;
        } else {
          return 0;
        }
      })
    );
  }

  priceFilter(range) {
    range = range ? range : this.state.priceRange;

    let allMatching = this.state.allProducts.filter(product => {
      return ((product.msrpInCents / 100) >= range[0] && (product.msrpInCents / 100) <= range[1]);
    });

    let filteredMatching = this.state.searchFiltered.filter(product => {
      return ((product.msrpInCents / 100) >= range[0] && (product.msrpInCents / 100) <= range[1]);
    });

    allMatching = this.sortProducts(allMatching, this.state.sortBy);
    this.setState({showProducts: filteredMatching, priceFiltered: allMatching});
  }


  searchFilter(e) {
    e.preventDefault();
    const text = e.target.value;

    let allMatching = this.state.allProducts.filter(product => {
      return product.name.toLowerCase().includes(text);
    });

    let filteredMatching = this.state.priceFiltered.filter(product => {
      return product.name.toLowerCase().includes(text);
    });

    filteredMatching = this.sortProducts(filteredMatching, this.state.sortBy);
    this.setState({showProducts: filteredMatching, searchFiltered: allMatching});
  }

  render() {
    return(
      <div className="outer-container">
        <div className="heading">
          <h1 className="heading-text">Fiji Water Store</h1>
        </div>
        <div className="filters-container">
          <div className="price-slider">
            <h1 className="filter-text">Select Price Range</h1>
            <Rcslider range={true} max={40} defaultValue={[0, 100]}
              pushable={3} onAfterChange={this.priceFilter}
              marks={{0: "0", 10: "10", 20: "20", 30: "30" }}/>
          </div>
          <div>
            <h1 className="filter-text">Sort By:</h1>
            <select className="sort-options" onChange={this.handleSort}>
              <option value="price">Price</option>
              <option value="name">Name</option>
              <option value="date">Recently Added</option>
            </select>
          </div>
          <div className="search-container">
            <h1 className="filter-text">Search</h1>
            <input className="search-box" onChange={this.searchFilter} type="text" name="search" />
          </div>
        </div>
        <ProductIndex products={this.state.showProducts} />
      </div>
    );
  }
}

export default Root;
