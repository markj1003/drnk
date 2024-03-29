import React from 'react';
import ReactDOM from 'react-dom/client';
import "./custom_styles/custom.scss";
//import 'bootstrap/dist/css/bootstrap.min.css'
import './index/index.css';
import App from './index/App';
import reportWebVitals from './index/reportWebVitals';
import store from './storeSlices/store';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

//to render a single component by default, import it as Item
//otherwise, set DebugMode to false to run the app
import Item from './testing';
import { Provider } from 'react-redux';
const DebugMode = false;

document.title = "onlyDrinks";
const root = ReactDOM.createRoot(document.getElementById('root'));

if (!DebugMode) {
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);}

else {
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <DebugMode/>
      </Provider>
    </React.StrictMode>
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
