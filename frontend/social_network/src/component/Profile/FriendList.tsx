'use client';
import React, { useState } from 'react';
import styles from '../../styles/Profile/FriendList.module.css';

interface Friend {
  id: number;
  name: string;
  mutualFriends: number;
  profileImage: string;
}

const friendsData: Friend[] = [
  { id: 1, name: "Distrito del Pacífico", mutualFriends: 9, profileImage: "/avatar.png" },
  { id: 2, name: "Carla Velasquez", mutualFriends: 17, profileImage: "/avatar.png" },
  { id: 3, name: "Miseldo Macario", mutualFriends: 8, profileImage: "/avatar.png" },
  { id: 4, name: "José Ixcoy Jr.", mutualFriends: 14, profileImage: "/avatar.png" },
  { id: 5, name: "Ici Reu", mutualFriends: 11, profileImage: "/avatar.png" },
  { id: 6, name: "Ariana Diaz", mutualFriends: 23, profileImage: "/avatar.png" },
  // Agrega más amigos aquí
];

export default function FriendsList() {
  const [activeTab, setActiveTab] = useState("all");

  const tabs = ["Todos los amigos", "Agregados recientemente", "Cumpleaños", "Seguidos"];
  const [searchQuery, setSearchQuery] = useState("");


  const filteredFriends = friendsData.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
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
        {friendsData.map((friend) => (
          <div key={friend.id} className={styles.friendCard}>
            <img src={friend.profileImage} alt={friend.name} className={styles.profileImage} />
            <div className={styles.friendInfo}>
              <h4 className={styles.friendName}>{friend.name}</h4>
              <p className={styles.mutualFriends}>{friend.mutualFriends} amigos en común</p>
            </div>
            <button className={styles.moreOptions}>⋮</button>
          </div>
        ))}
      </div>
    </div>
  );
}
