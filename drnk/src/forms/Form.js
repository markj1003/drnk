import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function GenericForm(props) {
    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={{span: 10}}>
                    <Form onSubmit={props.onSubmit}>
                        <h1 className="text-primary">{props.prompt}</h1>
                        {props.inputFields.map((inputField)=>(
                            <Form.Group className="mb-4" key={inputField}>
                                <Form.Label>{inputField}</Form.Label>
                                <Form.Control name={inputField} placeholder={"Enter " +  inputField} />
                            </Form.Group>  ))}
                        {/* it's a bit hacky to just repeat the header prompt as the submit button */}
                        <Button type="submit" className="btn btn-primary btn-block mb-2">{props.prompt}</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}