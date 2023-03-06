import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Item from './homePage';

document.title = "onlyDrinks";
const root = ReactDOM.createRoot(document.getElementById('root'));

const DebugMode = false;

if (!DebugMode) {
root.render(
  <React.StrictMode>
    <div className='background'>
    <App />
    </div>
  </React.StrictMode>
);}
else {
  root.render(
    <React.StrictMode>
      <div className='background'>
      <DebugMode state='hello' handler={()=>{}}/>
      </div>
    </React.StrictMode>
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
