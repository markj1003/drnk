import React, {useState} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Toast from "react-bootstrap/Toast";
import GenericForm from "../Form";
import Card from "react-bootstrap/Card";
import {Link, useNavigate} from "react-router-dom";
import {log_in, new_account, reset} from "../../interface";
import store from "../../store";
import {setLoggedIn} from "../../storeSlices/loginSlice";
import './LoginForm.css'

function LoginForm() {
    const navigate = useNavigate();

    const [showToast, setShowToast] = useState(false);
    const toggleToast = () => setShowToast(!showToast);

    const giveToast = () => {
        return <Toast show={showToast} onClose={toggleToast} className="toast-top-right"
                autohide="true">
            <Toast.Header className="d-flex justify-content-between">
                <strong>Details not recognised</strong>
            </Toast.Header>
            <Toast.Body>
                <p>Please try again or <Link to={'/auth/reset'}>reset your password.</Link></p>
            </Toast.Body>
        </Toast>
    }

    const onSubmit = async (ev, userInput) => {
        let token = await log_in(userInput["Username"], userInput["Password"]);
        if (token) {
            navigate('/');
        }
        else {
            console.log('here')
            toggleToast();
        }
    }
    return (
        <React.Fragment>
            {giveToast()}
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
    const navigate = useNavigate();

    const [showToast, setShowToast] = useState(false);
    const [errMessage, setError] = useState(false);
    const toggleToast = () => setShowToast(!showToast);

    const giveToast = () => {
        return <Toast show={showToast} onClose={toggleToast} className="toast-top-right"
                autohide="true">
            <Toast.Header className="d-flex justify-content-between">
                <strong>Signup Failed</strong>
            </Toast.Header>
            <Toast.Body>
                <p>{errMessage}</p>
            </Toast.Body>
        </Toast>
    }

    const onSubmit = (ev, userInputs) => {
        if (userInputs["Password"] != userInputs["Confirm Password"]) {
            console.log("passwords don't match");
            setError("Passwords don't match");
            toggleToast();
            return;
        }
        let token = new_account(userInputs["Username"], userInputs["Password"]);
        if (token) {
            store.dispatch(setLoggedIn(token))
            console.log("signed up")
            navigate('/');
        }
        else {
            toggleToast();
        }
    }
    return (
        <React.Fragment>
            {giveToast()}
            <GenericForm prompt={"Sign up"} inputFields={["Username", "Email", "Password", "Confirm Password"]} onSubmit={onSubmit} />
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
    const navigate = useNavigate();
    const [showToast, setShowToast] = useState(false);
    const toggleToast = () => setShowToast(!showToast);

    const giveToast = () => {
        return <Toast show={showToast} onClose={toggleToast} className="toast-top-right"
                autohide="true">
            <Toast.Header className="d-flex justify-content-between">
                <strong>Password reset submitted</strong>
            </Toast.Header>
            <Toast.Body>
                <p>A reset link has been sent to your registered email address</p>
            </Toast.Body>
        </Toast>
    }

    const onSubmit = (ev, userInputs) => {
        let token = reset(userInputs['Username']);
        if (token) {
            toggleToast();
        }
    }
    return (
        <React.Fragment>
            {giveToast()}
            <GenericForm prompt={"Reset password"} inputFields={["Username"]} onSubmit={onSubmit} />
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

