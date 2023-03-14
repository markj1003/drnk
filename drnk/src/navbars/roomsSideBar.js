import Offcanvas from 'react-bootstrap/Offcanvas';

export default function RoomsSideBar(props) {
    return (
        <>
            <Offcanvas show={props.show} onHide={props.onHide} placement={'end'}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title> Rooms </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    Some text as placeholder. In real life you can have the elements you
                    have chosen. Like, text, images, lists, etc.
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}