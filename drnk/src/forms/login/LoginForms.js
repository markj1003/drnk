import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import GenericForm from "../Form";
import Card from "react-bootstrap/Card";
import {Link} from "react-router-dom";
import {log_in, new_account} from "../../interface";
import store from "../../store";
import {setLoggedIn} from "../../storeSlices/loginSlice";

function LoginForm() {
    const onSubmit = async (ev, userInput) => {
        let token = await log_in(userInput["Username"], userInput["Password"]);
        if (token) {
            store.dispatch(setLoggedIn(token))
            console.log("logged in");
        }
    }
    return (
        <React.Fragment>
            <GenericForm prompt={"Log in"} inputFields={["Username", "Password"]} onSubmit={onSubmit}/>
            <Row className="justify-content-center">
                <Col>
                    <Link to={"/auth/reset"} className='link-primary'>Forgot password?</Link>
                </Col>
                <Col>
                    <div className='text-center mb-4'>
                        <Link to={"/auth/signup"} className='link-primary'>Don't have an account?</Link>
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
}

function SignupForm() {
    const onSubmit = (ev, userInputs) => {
        if (userInputs["Password"] != userInputs["Confirm Password"]) {
            console.log("passwords don't match");
            return;
        }
        let token = new_account(userInputs["Username"], userInputs["Password"]);
        if (token) {
            store.dispatch(setLoggedIn(token))
            console.log("signed up")
        }
    }
    return (
        <React.Fragment>
            <GenericForm prompt={"Sign up"} inputFields={["Username", "Email", "Password", "Confirm Password"]} />
            <Row className="justify-content-center">
                <Col>
                    <div className='text-center mb-4'>
                        <Link to={"/auth/login"} className="text-primary">Already have an account?</Link>
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
}

function ResetForm() {
    return (
        <React.Fragment>
            <GenericForm prompt={"Reset password"} inputFields={["Username"]} />
            <Row className="justify-content-center">
                <Col>
                    <Link to={"/auth/login"} className='link-primary'>Remember your password?</Link>
                </Col>
                <Col>
                    <div className='text-center mb-4'>
                        <Link to={"/auth/signup"} className={"link-primary"}>Don't have an account?</Link>
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
}

function formWithCard(FormComponent) {
    return () => {
        return (
            <div className="pt-5 b-5 w-100 justify-content-center">
                <Card className="text-dark w-card h-100 container-fluid text-center bg-card">
                    <FormComponent/>
                </Card>
            </div>
        )
    };
}

export const StyledLoginForm = formWithCard(LoginForm);
export const StyledResetForm = formWithCard(ResetForm);
export const StyledSignupForm = formWithCard(SignupForm);

