import FriendItem from "./FriendItem";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import Divider from '@mui/material/Divider';
import Ruaridh from '../assets/aboutPhotos/ruaridh.jpg';
import Mark from '../assets/aboutPhotos/mark.jpg';
import Joyal from '../assets/aboutPhotos/joyal.jpg';
import Liam from '../assets/aboutPhotos/lang.jpg';

import Button from '@mui/material/Button';

export default function FriendList(props) {
    // todo: uncomment when backend work is done to make requests to server
    // const friendStatuses = useSelector((state) => state.onlineStatuses.friendStatuses);
    const friendStatuses = [
        {name: 'Ruaridh',
        online: false,
        pic: Ruaridh},
        {name: 'Joyal',
        online: true,
        pic: Joyal},
        {name: 'Mark',
        online: true,
        pic: Mark},
        {name: 'Liam',
        online: false,
        pic: Liam},
        {name: 'Kwang',
        online: true,
        pic: false}]

    return <Stack>
        {friendStatuses
        .map((friend) => 
            <FriendItem className='border-all' onClick={props.onClick} key={friend.name} username={friend.name} pic={friend.pic} status={friend.online} />)}
        <Divider className='bg-dark' />
    </Stack>
}