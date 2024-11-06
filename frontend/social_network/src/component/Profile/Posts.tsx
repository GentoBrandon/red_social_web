// components/PostCard.tsx
'use client';
import React from "react";
import styles from "@/styles/Post.module.css";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { FaHeart } from "react-icons/fa";
import { BsSend } from "react-icons/bs";
import { BsChatDots } from "react-icons/bs";
import { useState, useEffect } from "react";
import axios from "axios";
import { fetchProfileId } from "@/services/IdProfile";
import { SlOptions } from "react-icons/sl";
interface Post {
  id: number;
  description: string;
  content: string;
  date: string;
}

const PostCard: React.FC = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [idProfile, setIdProfile] = useState<number | null>(null);

  // Cambia el estado de "Me gusta"
  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    const fetchAndSetProfileData = async () => {
      try {
        const id = await fetchProfileId();
        setIdProfile(id);
        
        if (id) {
          const response = await axios.get(`http://localhost:5000/api/posts/get-all-post-profile/${id}`);
          setPosts(response.data);
        }
      } catch (error) {
        console.error("Error al obtener los datos del perfil:", error);
      }
    };

    fetchAndSetProfileData();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className={styles["post-card"]}>
          <div className={styles["post-header"]}>
            <h3 className={styles["post-title"]}>{post.description}</h3>
            <p className={styles["postDate"]}>{new Date(post.date).toLocaleDateString()}</p>
          </div>
          <div className={styles["post-body"]}>
            <p>{post.content}</p>
          </div>
          <Separator />
          <div className={styles["options"]}>
            <button 
              className={`${styles["like-button"]} ${isLiked ? styles["liked"] : ""}`} 
              onClick={handleLike}
            >
              <FaHeart />
              {isLiked ? " Like" : " Like"}
            </button>
            <Button variant="link"><BsChatDots /> Comentar</Button>
            <Button variant="link"><BsSend /> Compartir</Button>
            <Button variant="link"><SlOptions />Opciones</Button>
          </div>
          <Separator />
        </div>
      ))}
    </div>
  );
};

export default PostCard;
