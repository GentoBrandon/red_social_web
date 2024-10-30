import Principal from "@/component/Principal/Principal";
import Publication from "@/component/Publication/Publication";
import TweetCard from "@/components/ui/tweet-card";
function dashboardPage() {
  return (
    
    <Principal>
      <Publication />
      <div>
      <TweetCard 
        title="Mi primer día en el campus"
        content="Hoy es mi primer día en la escuela @_buildspace! Un lugar donde conviertes tus ideas en realidad y haces amigos en el camino."
      />
    </div>
    </Principal>
  );
}
export default dashboardPage;