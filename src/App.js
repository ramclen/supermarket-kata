import React from 'react';
import './App.css';


const App = () => {
  const products = ['Beans', 'Coke', 'Orange'];
  return (
    <div className="App">
      <ul>
        {products.map(product => <li className="product-item" key={product}>{product}</li>)}
      </ul>
    </div>
  );
}

export default App;
