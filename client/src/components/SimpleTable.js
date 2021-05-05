import React, { Component } from 'react';

class ProductCategoryRow extends React.Component {
  render() {
    const category = this.props.category;
    return (
      <tr>
        <th colSpan="2">
          {category}
        </th>
      </tr>
    );
  }
}

class ProductRow extends React.Component {
  render() {
    const product = this.props.product;
    const name = product.stocked ?
      product.name :
      <span className="simple-table-first-col">{product.name}</span>;

    return (
      <tr>
        <td className="simple-table-td" style={{width:"50%"}}>{name}</td>
        <td className={this.props.bold ? "simple-table-td simple-table-second-col bold" : "simple-table-td simple-table-second-col"} >{product.price}</td>
      </tr>
    );
  }
}

class ProductTable extends React.Component {
  render() {
    const rows =[];
    let lastCategory = null;
    
    this.props.products.forEach((product) => {
      if (product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow
            category={product.category}
            key={product.category}/>
        );
      }
      rows.push(
        <ProductRow
          bold={this.props.bold}
          product={product}
          key={product.name}/>
      );
      lastCategory = product.category;
    });

    return (
      <table className="simple-table">
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  render() {
    return (
      <form>
        <input type="text" placeholder="Search..." />
        <p>
          <input type="checkbox" />
          {' '}
          Only show products in stock
        </p>
      </form>
    );
  }
}

class SimpleTable extends React.Component {
  render() {

    return (
      <>
        <ProductTable bold={this.props.bold} products={this.props.data}/>
      </>
    );
  }
}

export default SimpleTable