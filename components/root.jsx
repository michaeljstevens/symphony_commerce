import React, { Component } from 'react';
import ProductIndex from './product_index.jsx';
import $ from 'jquery';

class Root extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products: null
    };
  }

  componentDidMount() {
    const error = message => console.log(message);
    const success = response => {
      debugger
    };
    $.ajax({
      method: 'GET',
      url: 'https://sneakpeeq-sites.s3.amazonaws.com/interviews/ce/feeds/store.js',
      dataType: 'JSON',
      success,
      error
    });
  }

  render() {
    return(
      <div>
        <ProductIndex />
      </div>
    );
  }
}

export default Root;
