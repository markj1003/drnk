import React, {useState} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function GenericForm(props) {
    const [userInput, setUserInput] = useState({});
    const getValue = (fieldName) => {
        return fieldName in userInput ? userInput[fieldName] : "";
    }
    const handleChange = (ev) => {
        setUserInput({...userInput, [ev.target.name]: ev.target.value});
    }

    const onSubmit = (ev) => {
        ev.preventDefault();
        props.onSubmit(ev, userInput);
        setUserInput({});
    }

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={{span: 10}}>
                    <Form onSubmit={onSubmit}>
                        <h1 className="text-primary">{props.prompt}</h1>
                        {props.inputFields.map((inputField)=>(
                            <Form.Group className="mb-4" key={inputField}>
                                <Form.Label>{inputField}</Form.Label>
                                <Form.Control name={inputField} placeholder={"Enter " +  inputField}
                                value={getValue(inputField)} onChange={handleChange}/>
                            </Form.Group>  ))}
                        {/* it's a bit hacky to just repeat the header prompt as the submit button */}
                        <Button type="submit" className="btn btn-primary btn-block mb-2">{props.prompt}</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}