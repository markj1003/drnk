import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import GenericForm from "../Form";
import Card from "react-bootstrap/Card";
import {Link} from "react-router-dom";

function LoginForm() {
    return (
        <React.Fragment>
            <GenericForm prompt={"Log in"} inputFields={["Username", "Password"]}/>
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

