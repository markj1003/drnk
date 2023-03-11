import FriendItem from "./FriendItem";

export default function FriendList() {
    // todo: uncomment when backend work is done to make requests to server
    // const friendStatuses = useSelector((state) => state.onlineStatuses.friendStatuses);
    const friendStatuses = {"ruaridh": 0, "joyal": 1, "mark": 0, "liam": 0}
    return <div>
        {Object.keys(friendStatuses).map((friend) => <FriendItem key={friend} username={friend} status={friendStatuses[friend]} />)}
    </div>
}