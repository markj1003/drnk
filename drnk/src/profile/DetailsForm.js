import React, {useState} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';

export default function DetailsForm(props) {
    const [userInput, setUserInput] = [props.current, props.handleChange];
    const getValue = (fieldName) => {
        return fieldName in userInput ? userInput[fieldName] : "";
    }
    const handleChange = (ev) => {
        setUserInput({...userInput, [ev.target.name]: ev.target.value});
    }

    const onSubmit = (ev) => {
        console.log(ev);
        if (ev) {
            ev.preventDefault();
        }
        props.onSubmit();
    }
    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={{span: 10}}>
                    <Form onSubmit={onSubmit}>
                        <h1 className="text-primary">{props.prompt}</h1>
                        {Object.keys(props.current).map((inputField)=>(
                            <Form.Group className="mb-4" key={inputField}>
                                <Form.Label>{inputField}</Form.Label>
                                <Form.Control name={inputField} placeholder={"Enter " +  inputField}
                                value={getValue(inputField)} onChange={handleChange}/>
                            </Form.Group>  ))}
                    <Button type='submit' className='invisible'/>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}