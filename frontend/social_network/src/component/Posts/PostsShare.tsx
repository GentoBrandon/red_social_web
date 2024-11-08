// components/PostCard.tsx
'use client';
import React, { useState, useEffect } from "react";
import styles from "@/styles/Post.module.css";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { FaHeart } from "react-icons/fa";
import { BsSend } from "react-icons/bs";
import { BsChatDots } from "react-icons/bs";
import axios from "axios";
import { fetchProfileId } from "@/services/IdProfile";
import Options from "@/component/Posts/DeletePosts";
import SharePosts from "@/component/Posts/SharePosts";

interface SharedPost {
  post_shared: {
    id: number;
    id_profile: number;
    id_post: number;
    description: string;
    date: string;
  };
  post_original: {
    id: number;
    id_profile: number;
    description: string;
    content: string;
    date: string;
    isLiked?: boolean;
  };
  owner_name: string;
  sharer_name: string;
}

const PostCard: React.FC = () => {
  const [sharedPosts, setSharedPosts] = useState<SharedPost[]>([]);
  const [idProfile, setIdProfile] = useState<number | null>(null);

  // Función para alternar la reacción (like/unlike) en el post específico
  const toggleLike = async (postId: number) => {
    const post = sharedPosts.find((p) => p.post_original.id === postId);
    if (!post || idProfile === null) return;

    const isLiked = post.post_original.isLiked;
    const url = isLiked
      ? `http://localhost:5000/api/post-reactions/delete-reaction/${postId}/${idProfile}`
      : `http://localhost:5000/api/post-reactions/insert-reaction`;

    try {
      if (isLiked) {
        await axios.delete(url);
      } else {
        await axios.post(url, {
          id_profile: idProfile,
          id_post: postId,
          reactions: true,
        });
      }

      // Update local state to reflect the new like status
      setSharedPosts((prevPosts) =>
        prevPosts.map((p) =>
          p.post_original.id === postId
            ? { ...p, post_original: { ...p.post_original, isLiked: !isLiked } }
            : p
        )
      );
    } catch (error) {
      console.error("Error al actualizar la reacción:", error);
    }
  };

  // Cargar el perfil y los posts compartidos
  useEffect(() => {
    const fetchAndSetProfileData = async () => {
      try {
        const id = await fetchProfileId();
        console.log("ID del perfil:", id);
        setIdProfile(id);

        if (id) {
          // Llama a la API de posts compartidos
          const response = await axios.get(`http://localhost:5000/api/post-share/get-all-post-shared-original/${id}`);
          
          // Mapea los datos solo si la respuesta está definida y es un array
          if (response.data && Array.isArray(response.data)) {
            setSharedPosts(
              response.data.map((item: SharedPost) => ({
                ...item,
                post_original: { ...item.post_original, isLiked: false }, // Inicializa `isLiked` en falso
              }))
            );
          } else {
            console.error("Error: Estructura de datos no válida en la respuesta de la API.");
          }
        }
      } catch (error) {
      }
    };

    fetchAndSetProfileData();
  }, []);


  return (
    <div>
      {sharedPosts.map((sharedPost) => (
        <div key={sharedPost.post_shared.id} className={styles["post-card"]}>
          <div className={styles["post-header"]}>
            <div className={styles["profile-info"]}>
              <img src="/avatar.png" alt="Profile" className={styles["profile-image"]} />
              <div className={styles["author-info"]}>
                <h3 className={styles["post-author"]}>{sharedPost.sharer_name} compartió</h3>
                <p className={styles["postDate"]}>{new Date(sharedPost.post_shared.date).toLocaleDateString()}</p>
              </div>
            </div>
            <h3 className={styles["post-title"]}>{sharedPost.post_shared.description}</h3>
          </div>
          <Separator />
          {/* Post Original */}
          <div className={styles["post-card"]}>
            <div className={styles["post-header"]}>
              <div className={styles["profile-info"]}>
                <img src="/avatar.png" alt="Profile" className={styles["profile-image"]} />
                <div className={styles["author-info"]}>
                  <h3 className={styles["post-author"]}>{sharedPost.owner_name}</h3>
                  <p className={styles["postDate"]}>{new Date(sharedPost.post_original.date).toLocaleDateString()}</p>
                </div>
              </div>
              <h3 className={styles["post-title"]}>{sharedPost.post_original.description}</h3>
            </div>
            <div className={styles["post-body"]}>
              <p>{sharedPost.post_original.content}</p>
            </div>
          </div>
          <Separator />
          <div className={styles["options"]}>
              <button
                className={`${styles["like-button"]} ${sharedPost.post_original.isLiked ? styles["liked"] : ""}`}
                onClick={() => toggleLike(sharedPost.post_original.id)}
              >
                <FaHeart />
                {sharedPost.post_original.isLiked ? " Liked" : " Like"}
              </button>
              <Button variant="link"><BsChatDots /> Comentar</Button>
              <SharePosts postId={sharedPost.post_original.id} idProfile={idProfile}/>
              <Options idProfile={idProfile} idPostSelect={sharedPost.post_original.id} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostCard;
