import React from 'react';
import ReactDOM from 'react-dom/client';
import "./custom_styles/custom.scss";
//import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';

import App from './App';
import reportWebVitals from './reportWebVitals';

//to render a single component by default, import it as Item
//otherwise, set DebugMode to false to run the app
import Item from './master';
const DebugMode = false;
document.title = "onlyDrinks";
const root = ReactDOM.createRoot(document.getElementById('root'));

if (!DebugMode) {
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);}

else {
  root.render(
    <React.StrictMode>
      <DebugMode/>
    </React.StrictMode>
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

