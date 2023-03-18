import {createBrowserRouter} from "react-router-dom";
import LoginOrHomePage from "../homePage/LoginOrHomepage";
import AboutUs from "../aboutPage/aboutUs";
import Profile from "../profile/userProfile";
import {StyledLoginForm, StyledResetForm, StyledSignupForm} from "../forms/login/LoginForms";
import React from "react";
import NavbarWrapper from "../navbars/navbar";
import BottomNav from "../navbars/selectNavBar";
import Room from '../roomPage/room';
import PublicProfile from "../profile/publicProfile";
import { getAccount } from '../serverInterface/interface';
import SD from '../navbars/speedDial';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <React.Fragment>
                    <NavbarWrapper />
                    <SD />
                    <BottomNav />
                </React.Fragment>,
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
            },
            {
                path: "/aboutUs",
                element: <AboutUs />
            },
            {
                path: "/profile",
                element: <Profile />
            },
            {
                path: "/room",
                element: <Room />
            },
            {
                path: "/u/:username",
                element: <PublicProfile />,
                loader: ({params}) => {
                    return getAccount(params.username);
                }
            }

        ]
    }
])