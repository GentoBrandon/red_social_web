import Principal from "@/component/Principal/Principal";
import Publication from "@/component/Publication/Publication";
import styles from "@/styles/Principal.module.css";
import PostShareFriends from "@/component/Principal/PostsShareFriends";
function dashboardPage() {
  return (
    
    <Principal>
      <div className={styles["mainContainer"]}>
          <Publication />
        <div className={styles["cardContainer"]}>
          <PostShareFriends /> 
        </div>
      </div>
    </Principal>
  );
}
export default dashboardPage;