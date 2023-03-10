import './App.css';
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import useIntervalHook  from './hooks/useIntervalHook';
import { getUserStatuses } from "./storeSlices/onlineStatusesSlice";
import {RouterProvider} from "react-router-dom";
import {router} from "./routes";

function App() {
  return (
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
