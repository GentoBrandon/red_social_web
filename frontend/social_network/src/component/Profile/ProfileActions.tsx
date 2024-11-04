'use client';
import React, { useState, useEffect } from 'react';
import styles from '../../styles/Profile/ProfileActions.module.css';
import style from '../../styles/Profile/ProfileHeader.module.css';
import axios from 'axios';
import { API_ROUTES } from '../../routes/apiRoutes';

interface Profile {
  id: number;
  first_name: string;
  last_name: string;
  birth_date: string;
  email: string;
}

function ProfileActions() {
  const [profile, setProfile] = useState<Profile | null>(null);

  const fetchProfile = async (): Promise<void> => {
    try {
      const response = await axios.get(API_ROUTES.DASHBOARD, { withCredentials: true });
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
