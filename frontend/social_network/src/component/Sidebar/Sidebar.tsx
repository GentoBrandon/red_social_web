// components/Sidebar.js
/*
import style from "../../styles/Publication.module.css";
import * as React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import axios from 'axios';
import styles from '../../styles/Profile/FriendList.module.css';
import { fetchProfileId } from "@/services/IdProfile";
import { ROUTES_PROFILE, Routes_friend } from '../../routes/apiRoutes';
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

interface Friend {
  friend_id: number;
  friend_name: string;
  mutual_friends_count: string;
}


export default function Sidebar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [idProfile, setIdProfile] = useState<number | null>(null);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState<boolean>(true);


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
      <aside className={`w-64 h-full bg-gray-800 text-white flex flex-col p-4 fixed top-16 right-0 ${style.sideBar}`}>
          <ScrollArea className="h-72 w-48 rounded-md border">
          <div className={styles.friendsContainerSide}>
              {loading ? (
                <p>Cargando amigos...</p>
              ) : filteredFriends.length > 0 ? (
                filteredFriends.map((friend, index) => (
                  <div key={index} className={styles.friendCard}>
                    <img src="/avatar.png" alt={friend.friend_name} className={styles.profileImage} />
                    <div className={styles.friendInfo}>
                      <h4 className={styles.friendName}>{friend.friend_name}</h4>
                    </div>
                    <Button variant="outline" > <IoChatbubbleEllipsesOutline /> </Button>
                  </div>
                ))
              ) : (
                <p>No se encontraron amigos.</p>
              )}
            </div>
          </ScrollArea>
      </aside>
  );
}
*/
// components/Sidebar.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import ChatWindow from '../../components/chatWindow/ChatWindow';
import styles from '../../styles/Profile/FriendList.module.css';
import style from "../../styles/Publication.module.css";
import { fetchProfileId } from "@/services/IdProfile";
import { Routes_friend } from '../../routes/apiRoutes';
import { ScrollArea } from "@/components/ui/scroll-area"


interface Friend {
  friend_id: number;
  friend_name: string;
  mutual_friends_count: string;
}

export default function Sidebar() {
  const [idProfile, setIdProfile] = useState<number | null>(null);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeChat, setActiveChat] = useState<{ friendId: number, friendName: string } | null>(null);

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
          console.error("Error al obtener los amigos:", error);
          setLoading(false);
        }
      };

      fetchFriends();
    }
  }, [idProfile]);

  const openChat = (friendId: number, friendName: string) => {
    setActiveChat({ friendId, friendName });
  };

  const closeChat = () => {
    setActiveChat(null);
  };

  return (
    <aside className={`w-64 h-full bg-gray-800 text-white flex flex-col p-4 fixed top-16 right-0 ${style.sideBar}`}>
       <ScrollArea className="h-72 w-48 rounded-md border">
      <div className={styles.friendsContainerSide}>
        {loading ? (
          <p>Cargando amigos...</p>
        ) : friends.length > 0 ? (
          friends.map((friend) => (
            <div key={friend.friend_id} className={styles.friendCard}>
              <img src="/avatar.png" alt={friend.friend_name} className={styles.profileImage} />
              <div className={styles.friendInfo}>
                <h4 className={styles.friendName}>{friend.friend_name}</h4>
              </div>
              <Button variant="outline" onClick={() => openChat(friend.friend_id, friend.friend_name)}>
                <IoChatbubbleEllipsesOutline />
              </Button>
            </div>
          ))
        ) : (
          <p>No se encontraron amigos.</p>
        )}
      </div>
      </ScrollArea>
      
      {activeChat && (
        <ChatWindow
          profileId={idProfile!} // Utilizamos el operador `!` para asegurar que idProfile no sea null
          friendId={activeChat.friendId}
          friendName={activeChat.friendName}
          onClose={closeChat}
        />
      )}
    </aside>
  );
}
