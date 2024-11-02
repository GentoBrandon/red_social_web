import Principal from "@/component/Principal/Principal";
import Information from "@/component/Profile/Information";
import Profile from "@/component/Profile/Profile";
function InformationPage() {
  return (
    <Principal>
      <Profile>
        <h1>Informacion</h1>
        <Information />
      </Profile>
    </Principal>
  );
}
export default InformationPage;
