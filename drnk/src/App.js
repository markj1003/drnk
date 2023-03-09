import logo from './logo.svg';
import './App.css';
import React from 'react';
import LoginBox from './login/Login.js';
import { Provider } from 'react-redux';
import store from './store';
import useIntervalHook  from './hooks/useIntervalHook';
import { getUserStatuses } from "./storeSlices/onlineStatusesSlice";
import FriendList from "./friend/FriendList";

function App() {
  //this will get the online statuses of all your friends every 2 mins
  // todo: send an update request to the server every x mins to say you're still online
  useIntervalHook(() => {
    store.dispatch(getUserStatuses());
  }, 120000);
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <title>onlyCans</title>
          <FriendList/>
          <h1 className='Main-title'>onlyDrinks</h1>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Welcome to a world of better beverages.
          </p>
          <div className='purple'>
          <LoginBox />
          </div>
        </header>
      </div>
    </Provider>
  );
}

export default App;
