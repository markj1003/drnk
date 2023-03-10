import {createBrowserRouter} from "react-router-dom";
import LoginOrHomePage from "./LoginOrHomepage";
import {StyledLoginForm, StyledResetForm, StyledSignupForm} from "./forms/login/LoginForms";
import React from "react";
import NavbarWrapper from "./navbar";

export const router = createBrowserRouter([
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