import React, {useState} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Toast from "react-bootstrap/Toast";
import GenericForm from "../Form";
import Card from "react-bootstrap/Card";
import {Link, useNavigate} from "react-router-dom";
import {log_in, new_account, reset} from "../../serverInterface/interface";
import store from "../../storeSlices/store";
import {setLoggedIn} from "../../storeSlices/loginSlice";
import {authenticatedPost} from "../../serverInterface/httpUtils";
import './LoginForm.css'


function GiveToast(props) {
    return (
        <Toast show={props.showToast} onClose={() => props.setShowToast(!props.showToast)} className="toast-top-right" autohide="true">
            <Toast.Header className="d-flex justify-content-between">
                <strong>{props.header}</strong>
            </Toast.Header>
            <Toast.Body>
                <props.Body />
            </Toast.Body>
        </Toast>
    );
}

function LoginForm() {
    const navigate = useNavigate();
    const [showToast, setShowToast] = useState(false);
    const onSubmit = async (ev, userInput) => {
        log_in(userInput["Username"], userInput["Password"]).then(res => {
            console.log(res)
            console.log(res.session)
            if (res.session) {
                localStorage.setItem('access_token', res.session)
                authenticatedPost("rooms", { room: {name: "hi"}})
                store.dispatch(setLoggedIn({ session: res.session, username: userInput["Username"] }))
                navigate('/');
            }
        });
    }
    return (
        <React.Fragment>
            <GiveToast showToast={showToast} setShowToast={setShowToast}
                       header={"Details not recognised"}
                       Body={() => <p>Please try again or <Link to={'/auth/reset'}>reset your password.</Link></p>}
            />
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
    const [errMessage, setError] = useState("");
    const onSubmit = (ev, userInputs) => {
        if (userInputs["Password"] !== userInputs["Confirm Password"]) {
            console.log("passwords don't match");
            setError("Passwords don't match");
            setShowToast(!showToast);
            return;
        }
        console.log("hio")
        new_account(userInputs["Username"], userInputs["Password"]).then(tokens => {
            console.log(tokens)
            store.dispatch(setLoggedIn(tokens))
            console.log("signed up")  
            navigate('/');
        }, e => setShowToast(!showToast))
    }
    return (
        <React.Fragment>
            <GiveToast showToast={showToast} setShowToast={setShowToast}
                       header={"Signup Failed"}
                       Body={() => <p>{errMessage}</p>}
            />
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
    const [showToast, setShowToast] = useState(false);
    const onSubmit = (ev, userInputs) => {
        let token = reset(userInputs['Username']);
        if (token) {
            setShowToast(!showToast);
        }
    }
    return (
        <React.Fragment>
            <GiveToast showToast={showToast} setShowToast={setShowToast}
                       header={"Password reset submitted"}
                       Body={() => <p>A reset link has been sent to your registered email address</p>}
            />
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

