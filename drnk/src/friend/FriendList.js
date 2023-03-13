import {useSelector} from "react-redux";
import FriendItem from "./FriendItem";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";

export default function FriendList(props) {
    // todo: uncomment when backend work is done to make requests to server
    // const friendStatuses = useSelector((state) => state.onlineStatuses.friendStatuses);
    const friendStatuses = {"ruaridh": 0, "joyal": 1, "mark": 0, "liam": 0, "kwang": 1}
    return <Stack>
        {Object.keys(friendStatuses).map((friend) => 
            <FriendItem className='border-all' onClick={props.onClick} key={friend} username={friend} status={friendStatuses[friend]} />)}
        <hr />
    </Stack>
}