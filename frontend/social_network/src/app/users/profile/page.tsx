import Principal from '@/component/Principal/Principal';
import Profile from '@/component/Profile/Profile';
import Posts from '@/component/Profile/Posts';
function ProfilePage(){
    return(
        <Principal>
            <Profile>
                <Posts/>
            </Profile>
        </Principal>
    )
}
export default ProfilePage;