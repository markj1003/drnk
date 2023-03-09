import {useSelector} from "react-redux";
import FriendItem from "./FriendItem";

export default function FriendList() {
    // const friendStatuses = useSelector((state) => state.onlineStatuses.friendStatuses);
    const friendStatuses = {"ruaridh": 0, "joyal": 1, "mark": 0, "liam": 0}
    return <div>
        {Object.keys(friendStatuses).map((friend) => <FriendItem key={friend} username={friend} status={friendStatuses[friend]} />)}
    </div>
}