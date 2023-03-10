import './App.css';
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import useIntervalHook  from './hooks/useIntervalHook';
import { getUserStatuses } from "./storeSlices/onlineStatusesSlice";
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import {StyledLoginForm, StyledSignupForm, StyledResetForm} from "./forms/login/LoginForms";
import SiteNavbar from "./navbar";
import LoginOrHomePage from "./LoginOrHomepage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <NavbarWrapper />,
        children: [
            {
                path: "/",
                element: <LoginOrHomePage />
            },
            {
                path: "/auth/login",
                element: <StyledLoginForm />
            },
            {
                path: "/auth/signup",
                element: <StyledSignupForm />
            },
            {
                path: "/auth/reset",
                element: <StyledResetForm />
            }
        ]
    }
])

function NavbarWrapper() {
    return (
      <>
          <SiteNavbar />
          <Outlet />
      </>
    );
}

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
