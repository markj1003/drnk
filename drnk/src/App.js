import './App.css';
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import useIntervalHook  from './hooks/useIntervalHook';
import { getUserStatuses } from "./storeSlices/onlineStatusesSlice";
import {RouterProvider} from "react-router-dom";
import {router} from "./routes";

function App() {
  //this will get the online statuses of all your friends every 2 mins
  // todo: send an update request to the server every x mins to say you're still online
  useIntervalHook(() => {
    store.dispatch(getUserStatuses());
  }, 120000);

  return (
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
