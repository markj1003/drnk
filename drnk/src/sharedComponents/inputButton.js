import {useState} from 'react';
import {Form, Col, Button} from 'react-bootstrap';
//props: onSubmit, button (text)
//optional: placeholder (''), keep (keep text on submit, false), onChange
export default function InputButton(props) {
    const [boxText, updateBox] = useState('');
    const onSubmit = (ev) => {
        ev.preventDefault();
        const date = new Date();
        const sentTime = String(date.getHours())+ ':' + String(date.getMinutes());
        if (!props.keep) updateBox('');
        props.onSubmit(boxText, sentTime);
    }
    const onChange = (ev) => {
        updateBox(ev.target.value)
        if (props.onChange) {
            props.onChange(ev.target.value);
        }
    }
    if (!props.placeholder) {
        var placeholder = '';
    }
    else {
        var placeholder = props.placeholder;
    }
    return <Form onSubmit={onSubmit} className='row mx-1'>
                    <Col className='col-9 p-0'>
                        <Form.Control value={boxText} onChange={onChange} placeholder={placeholder} />
                    </Col>
                    <Col className='col-3 d-flex justify-content-center'>
                        <Button onClick={onSubmit}>{props.button}</Button></Col>
                </Form>
}