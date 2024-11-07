import Principal from "@/component/Principal/Principal";
import Profile from "@/component/Profile/Profile";
import FriendsList from "@/component/Profile/FriendList";
function FriendsPage(){
    return (
        <Principal>
            <Profile>
                <FriendsList/>
            </Profile>
        </Principal>
    )
}

export default FriendsPage;