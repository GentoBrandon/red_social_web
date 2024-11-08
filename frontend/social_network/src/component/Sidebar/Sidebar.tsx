
/*
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

*/
'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import ChatWindow from '../../components/chatWindow/ChatWindow';
import styles from '../../styles/Profile/FriendList.module.css';
import style from "../../styles/Publication.module.css";
import { fetchProfileId } from "@/services/IdProfile";
import { Routes_friend } from '../../routes/apiRoutes';
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSocket } from '../../context/SocketContext'; // Importa el contexto de WebSocket

interface Friend {
  friend_id: number;
  friend_name: string;
  mutual_friends_count: string;
}

interface Notification {
  [key: number]: boolean; // Almacena el estado de notificación por `friend_id`
}

interface SidebarProps {
  notifications: string[]; // Lista de notificaciones de mensajes
}

export default function Sidebar({ notifications }: SidebarProps) {
  const [idProfile, setIdProfile] = useState<number | null>(null);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeChat, setActiveChat] = useState<{ friendId: number, friendName: string } | null>(null);
  const [messageNotifications, setMessageNotifications] = useState<Notification>({}); // Estado de notificaciones por amigo
  const { socket } = useSocket(); // WebSocket

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

  // Escucha de notificaciones de mensajes en tiempo real
  useEffect(() => {
    if (socket) {
      socket.on('notification', (data: { senderId: number }) => {
          if (data.senderId && data.senderId !== idProfile) {
              alert(`Tu amigo con ID ${data.senderId} te ha enviado un mensaje.`);
          }
      });
  }

    // Limpia el evento al desmontar
    return () => {
      socket?.off('notification');
    };
  }, [socket, idProfile]);

  const openChat = (friendId: number, friendName: string) => {
    setActiveChat({ friendId, friendName });

    // Restablece la notificación de este amigo
    setMessageNotifications((prevNotifications) => ({
      ...prevNotifications,
      [friendId]: false,
    }));
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
                  {messageNotifications[friend.friend_id] && (
                    <span className={styles.notificationDot}></span> // Indicador de notificación
                  )}
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
          profileId={idProfile!}
          friendId={activeChat.friendId}
          friendName={activeChat.friendName}
          onClose={closeChat}
        />
      )}
    </aside>
  );
}
