import ProfileHeader from "@/component/Profile/ProfileHeader";
import ProfileActions from "@/component/Profile/ProfileActions";
import Tabs from "@/component/Profile/Tabs";
import styles from '../../styles/Profile/ProfilePage.module.css';
import { Children, ReactNode } from "react";

function Profile({children}: {children: ReactNode}) {
    return(
             <div className={styles.profilePage}>
                <ProfileHeader
                    coverImage="url-a-imagen-de-portada"
                    profileImage="url-a-imagen-de-perfil"
                />
                <br/>
                <ProfileActions/>
                <Tabs />
                {children}
                {/* Aquí podrías agregar el componente para el contenido principal, como publicaciones */}
            </div>
    )

}
export default Profile;