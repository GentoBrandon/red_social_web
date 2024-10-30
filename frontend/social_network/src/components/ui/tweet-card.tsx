// components/PostCard.tsx
'use client';
import React from "react";
import styles from "@/styles/Post.module.css";
import { Separator } from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import { FaHeart } from "react-icons/fa";
import { FaComment } from "react-icons/fa";

interface PostCardProps {
  title: string;
  content: string;
}

const PostCard: React.FC<PostCardProps> = ({ title, content }) => {
  const [isLiked, setIsLiked] = React.useState(false);

  // Cambia el estado de "Me gusta"
  const handleLike = () => {
    setIsLiked(!isLiked);
  };
  return (
    <div className={styles["post-card"]}>
      <div className={styles["post-header"]}>
        <h3 className={styles["post-title"]}>{title}</h3>
      </div>
      <div className={styles["post-body"]}>
        <p>{content}</p>
      </div>
      <Separator />
      <div>
      <button 
          className={`${styles["like-button"]} ${isLiked ? styles["liked"] : ""}`} 
          onClick={handleLike}
        >
          <FaHeart />
          {isLiked ? " Liked" : " Like"}
      </button>
      <Button><FaComment/></Button>
      </div>
      <Separator />
      
    </div>
  );
};

export default PostCard;
