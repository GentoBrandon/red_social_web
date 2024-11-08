import Principal from '@/component/Principal/Principal';
import Profile from '@/component/Profile/Profile';
import Posts from '@/component/Profile/Posts';
import PostsShare from '@/component/Posts/PostsShare';
function ProfilePage(){
    return(
        <Principal>
            <Profile>
                <Posts/>
                <PostsShare/>
            </Profile>
        </Principal>
    )
}
export default ProfilePage;