// App.js
import React, { useState } from 'react';
import Home from './Home';

function App() {
  const [cart, setCart] = useState([]);

  return (
    <div className="App">
      <Home  />
    </div>
  );
}

export default App;
