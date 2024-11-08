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
import Options from "@/component/Posts/DeletePosts"; // Componente mejorado con menú de opciones
import SharePosts from "@/component/Posts/SharePosts";
import CommentPosts from "../Posts/CommentPosts";
import ViewCommentPosts from "../Posts/ViewCommentPost";

interface Post {
  id: number;
  description: string;
  content: string;
  date: string;
  name_person: string;
  isLiked: boolean;
}

const PostCard: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [idProfile, setIdProfile] = useState<number | null>(null);

  // Función para alternar la reacción (like/unlike) en el post específico
  const toggleLike = async (postId: number) => {
    const post = posts.find((p) => p.id === postId);
    if (!post || idProfile === null) return;

    const url = post.isLiked
      ? `http://localhost:5000/api/post-reactions/delete-reaction/${postId}/${idProfile}`
      : `http://localhost:5000/api/post-reactions/insert-reaction`;

    try {
      if (post.isLiked) {
        // DELETE request to remove reaction
        await axios.delete(url);
      } else {
        // POST request to add reaction
        await axios.post(url, {
          id_profile: idProfile,
          id_post: postId,
          reactions: true,
        });
      }

      // Update local state to reflect the new like status
      setPosts((prevPosts) =>
        prevPosts.map((p) =>
          p.id === postId ? { ...p, isLiked: !p.isLiked } : p
        )
      );
    } catch (error) {
      console.error("Error al actualizar la reacción:", error);
    }
  };

  useEffect(() => {
    const fetchAndSetProfileData = async () => {
      try {
        const id = await fetchProfileId();
        setIdProfile(id);

        if (id) {
          const response = await axios.get(`http://localhost:5000/api/posts/get-all-post-profile/${id}`);
          const postsWithLikes = response.data.map((post: Post) => ({
            ...post,
            isLiked: false, // Suponemos que false inicialmente; puedes cargar el estado real si está disponible
          }));
          setPosts(postsWithLikes);
        }
      } catch (error) {
      }
    };

    fetchAndSetProfileData();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className={styles["post-card"]}>
          <div className={styles["post-header"]}>
            <div className={styles["profile-info"]}>
              <img src="/avatar.png" alt="Profile" className={styles["profile-image"]} />
              <div className={styles["author-info"]}>
                <h3 className={styles["post-author"]}>{post.name_person}</h3>
                <p className={styles["postDate"]}>{new Date(post.date).toLocaleDateString()}</p>
              </div>
            </div>
            <h3 className={styles["post-title"]}>{post.description}</h3>
          </div>
          <div className={styles["post-body"]}>
            <p>{post.content}</p>
          </div>
          <Separator />
          <div className={styles["options"]}>
            <button
              className={`${styles["like-button"]} ${post.isLiked ? styles["liked"] : ""}`}
              onClick={() => toggleLike(post.id)}
            >
              <FaHeart />
              {post.isLiked ? " Liked" : " Like"}
            </button>
            <ViewCommentPosts postId={post.id} idProfile={idProfile} />
            <SharePosts postId={post.id} idProfile={idProfile}/>
            <Options idProfile={idProfile} idPostSelect={post.id} />
          </div>
          <Separator />
          <CommentPosts id_post={post.id} id_profile={idProfile} />
        </div>
      ))}
    </div>
  

  );
};

export default PostCard;
