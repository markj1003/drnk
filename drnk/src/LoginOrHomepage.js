import React from "react";
import HomePage from "./homePageBS";
import {useSelector} from "react-redux";
import Welcome from "./forms/login/Welcome";

export default function LoginOrHomePage() {
    const isLoggedIn = useSelector((state) => state.login.loggedIn);
    return isLoggedIn ? <HomePage /> : <Welcome />;
}