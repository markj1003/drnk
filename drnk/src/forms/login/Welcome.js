import Stack from "react-bootstrap/Stack";
import Beer from "../../assets/beerSVG"
import Container from "react-bootstrap/Container";
import React from "react";
import Button from "react-bootstrap/Button";
import { useNavigate, Link } from 'react-router-dom';
import './Welcome.css'


function WelcomeInfo() {
    return (
        <Container className="text-dark container-fluid text-center p-0">
            <Stack className="p-0 d-flex justify-content-center">
                <h1 className="text-primary main-header">onlyDrinks</h1>
                <Beer />
                <h3>Welcome to a world of better beverages!</h3>
            </Stack>
        </Container>
    );
}

function LoginButtons() {
    const navigate = useNavigate();
    return (
        <Container className="d-flex justify-content-center">
            <Stack direction="horizontal" gap={3}>
                <Button size='lg' name='login' onClick={() => navigate('/auth/login')}>Log in</Button>
                <Button size='lg' name='signup' onClick={() => navigate('/auth/signup')}>Sign up</Button>
                <Button size='lg' name='about' onClick={() => navigate('/aboutUs')}>About us</Button>
            </Stack>
        </Container>
    );
}

export default function Welcome() {
    return (
        <div>
            <WelcomeInfo />
            <LoginButtons />
        </div>
    );
}