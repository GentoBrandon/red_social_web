import Principal from "@/component/Principal/Principal";
import Publication from "@/component/Publication/Publication";
import TweetCard from "@/components/ui/tweet-card";
import styles from "@/styles/Principal.module.css";
function dashboardPage() {
  return (
    
    <Principal>
      <div className={styles["mainContainer"]}>
          <Publication />
        <div className={styles["cardContainer"]}>
          <TweetCard 
          title="Mi primer día en el campus"
          content="Hoy es mi primer día en la escuela @_buildspace! Un lugar donde conviertes tus ideas en realidad y haces amigos en el camino."
          />
        </div>
      </div>
    </Principal>
  );
}
export default dashboardPage;