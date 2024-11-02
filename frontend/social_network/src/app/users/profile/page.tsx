import Principal from '@/component/Principal/Principal';
import Profile from '@/component/Profile/Profile';
import TweetCard from '@/components/ui/tweet-card';

function ProfilePage(){
    return(
        <Principal>
            <Profile>
                <TweetCard 
                title="Mi primer día en el campus"
                content="Hoy es mi primer día en la escuela @_buildspace! Un lugar donde conviertes tus ideas en realidad y haces amigos en el camino."
                />
            </Profile>
        </Principal>
    )
}
export default ProfilePage;