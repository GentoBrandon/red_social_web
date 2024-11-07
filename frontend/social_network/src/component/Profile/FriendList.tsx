'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../styles/Profile/FriendList.module.css';
import DeleteFriend from '@/component/Profile/DeleteFriend';
import { fetchProfileId } from "@/services/IdProfile";
import { ROUTES_PROFILE, Routes_friend } from '../../routes/apiRoutes';

interface Friend {
  friend_id: number;
  friend_name: string;
  mutual_friends_count: string;
}

export default function FriendsList() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [idProfile, setIdProfile] = useState<number | null>(null);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const tabs = ["Todos los amigos", "Agregados recientemente", "Cumpleaños", "Seguidos"];

  // Obtiene el ID del perfil del usuario actual y luego la lista de amigos
  useEffect(() => {
    const fetchAndSetProfileData = async () => {
      try {
        const id = await fetchProfileId();
        setIdProfile(id);
      } catch (error) {
        console.error("Error al obtener el ID del perfil:", error);
      }
    };

    fetchAndSetProfileData();
  }, []);

  useEffect(() => {
    if (idProfile) {
      const fetchFriends = async () => {
        try {
          const response = await axios.get(
            `${Routes_friend.GET_FRIENDS_LIST}${idProfile}`,
            { withCredentials: true }
          );
          setFriends(response.data.friends);
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
      };

      fetchFriends();
    }
  }, [idProfile]);

  const filteredFriends = friends.filter((friend) =>
    friend.friend_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Buscar amigos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
      </div>
      <div className={styles.tabs}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`${styles.tab} ${activeTab === tab ? styles.active : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className={styles.friendsContainer}>
        {loading ? (
          <p>Cargando amigos...</p>
        ) : filteredFriends.length > 0 ? (
          filteredFriends.map((friend, index) => (
            <div key={index} className={styles.friendCard}>
              <img src="/avatar.png" alt={friend.friend_name} className={styles.profileImage} />
              <div className={styles.friendInfo}>
                <h4 className={styles.friendName}>{friend.friend_name}</h4>
                <p className={styles.mutualFriends}>
                  {friend.mutual_friends_count} amigos en común
                </p>
              </div>
              <DeleteFriend idProfile={idProfile} idProfileSelect={friend.friend_id}/>
            </div>
          ))
        ) : (
          <p>No se encontraron amigos.</p>
        )}
      </div>
    </div>
  );
}
