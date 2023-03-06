import './App.css';
import React from 'react';
import Master from './master.js'

const logic = require('./logic.js');
const LoginStates = {
  Login: 'Login',
  Reset: 'Reset',
  New: 'New'
};

function App() {
  return (<div className='background'><Master /></div>)
/*    <div className="App">
      <header className="App-header">
        <title>onlyCans</title>
        <h1 className='Main-title'>onlyDrinks</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to a world of better beverages.
        </p>
        <LoginBox />
      </header>
    </div> */
}

export default App;
