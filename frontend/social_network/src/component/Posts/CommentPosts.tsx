// components/Posts/CommentPosts.tsx
'use client';
import { Button } from "@/components/ui/button";
import styles from "@/styles/Comment.module.css";
import { useState } from "react";
import axios from "axios";

interface CommentPostsProps {
  id_profile: number | null;
  id_post: number | null;
  refreshComments?: () => void; // Prop opcional
}

function CommentPosts({ id_profile, id_post, refreshComments }: CommentPostsProps) {
  const [comment, setComment] = useState("");

  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const payload = {
        id_profile: id_profile,
        id_post: id_post,
        comment: comment
      };
      console.log("Payload:", payload);

      await axios.post("http://localhost:5000/api/post-comments/insert-coments", payload);

      setComment(""); // Limpiar el campo de comentario después de enviarlo

      // Llamar a refreshComments si existe
      if (refreshComments) {
        refreshComments();
      }
    } catch (error) {
      console.error("Error al enviar el comentario:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          placeholder="Comentario"
          value={comment}
          id="comment"
          onChange={(e) => setComment(e.target.value)}
          className={styles.input}
        />
        <Button type="submit" variant="btnBlue" className={styles.btn}>
          Comentar
        </Button>
      </form>
    </div>
  );
}

export default CommentPosts;
