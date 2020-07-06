import React from 'react';
import './App.css';


const App = () => {
  const products = {
    Beans: '0.50',
    Coke: '0.70',
    Orange: '1.99/kg'
  };
  // const products = ['Beans', 'Coke', 'Orange'];
  return (
    <div className="App">
      <ul>
        {Object.keys(products).map(title => (
          <li className="product-item" key={title}>
            <span className="product-title">{title}</span>
            <span className="product-price">{products[title]}</span>
            <button className="add-btn">add</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
