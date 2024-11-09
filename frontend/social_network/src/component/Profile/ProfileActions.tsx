/*
'use client';
import React, { useState, useEffect } from 'react';
import styles from '../../styles/Profile/ProfileActions.module.css';
import style from '../../styles/Profile/ProfileHeader.module.css';
import axios from 'axios';
import { API_ROUTES, Routes_friend } from '../../routes/apiRoutes';

interface Profile {
  id: number;
  first_name: string;
  last_name: string;
  birth_date: string;
  email: string;
}
interface Friend {

}

function ProfileActions() {
  const [profile, setProfile] = useState<Profile | null>(null);

  const fetchProfile = async (): Promise<void> => {
    try {
      const response = await axios.get(API_ROUTES.DASHBOARD, { withCredentials: true });
      // const CountFriend = await axios.get(Routes_friend.GET_FRIEND_COUNT, { withCredentials: true });
      const profileData = response.data.person; // Asegúrate de acceder a 'person' dentro de 'data'
      setProfile(profileData);
    } catch (error) {
      console.error("Error al obtener el perfil:", error);
    }
  };

  useEffect(() => {
    fetchProfile(); // Llama a fetchProfile cuando el componente se monte
  }, []);

  return (
    <div className={styles.actionsContainer}>
      <h2>{profile?.first_name} {profile?.last_name}</h2>
      <h2>{profile?.id} amigos</h2>
    </div>
  );
}

export default ProfileActions;
*/

'use client';
import React, { useState, useEffect } from 'react';
import styles from '../../styles/Profile/ProfileActions.module.css';
import axios from 'axios';
import { API_ROUTES, Routes_friend } from '../../routes/apiRoutes';

interface Profile {
  id: number;
  first_name: string;
  last_name: string;
  birth_date: string;
  email: string;
}

function ProfileActions() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [friendCount, setFriendCount] = useState<number | null>(null); // Estado para el conteo de amigos

  const fetchProfile = async (): Promise<void> => {
    try {
      const response = await axios.get(API_ROUTES.DASHBOARD, { withCredentials: true });
      const profileData = response.data.person; 
      setProfile(profileData);

      // Llamada a la API para obtener el conteo de amigos
      if (profileData.id) {
        console.log('profileData.id',profileData.id);
        const countResponse = await axios.get(`http://localhost:5000/api/request-friend/profile/${profileData.id}/friends/count`, { withCredentials: true });
        console.log('total',countResponse.data);
        setFriendCount(countResponse.data.data-1); // Suponiendo que el conteo está en la propiedad 'count'
      }
    } catch (error) {
      console.error("Error al obtener el perfil o el conteo de amigos:", error);
    }
  };

  useEffect(() => {
    fetchProfile(); 
  }, []);

  return (
    <div className={styles.actionsContainer}>
      <h2>{profile?.first_name} {profile?.last_name}</h2>
      <h2>{friendCount !== null ? `${friendCount} amigos` : "Cargando amigos..."}</h2>
    </div>
  );
}

export default ProfileActions;
