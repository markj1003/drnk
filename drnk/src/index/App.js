import './App.css';
import React from 'react';
import { Provider } from 'react-redux';
import store from '../storeSlices/store';
import { setLoggedIn } from '../storeSlices/loginSlice';
import {RouterProvider} from "react-router-dom";
import {router} from "../routes/routes";
import Cookies from 'universal-cookie';

function App() {
  const cookies = new Cookies();
  const user = cookies.get('user');
  if (user && user.token) {
  store.dispatch(setLoggedIn({token: user.token, 
    Username: user.Username}));
  }
  return (
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
