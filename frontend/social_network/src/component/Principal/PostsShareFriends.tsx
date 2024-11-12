// components/FriendsPosts.tsx
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
import CommentPosts from "../Posts/CommentPosts";
import ViewCommentPosts from "../Posts/ViewCommentPost";

interface FriendPost {
  friend_name: string;
  posts: {
    id: number;
    content: string;
    description: string;
    date: string;
  }[];
  posts_shares: {
    id: number;
    description: string;
    date: string;
    original_content: string;
    original_description: string;
    original_date: string;
  }[];
}

const FriendsPosts: React.FC = () => {
  const [friendsPosts, setFriendsPosts] = useState<FriendPost[]>([]);
  const [idProfile, setIdProfile] = useState<number | null>(null);

  useEffect(() => {
    const fetchFriendsPosts = async () => {
      try {
        const profileId = await fetchProfileId();
        setIdProfile(profileId);

        if (profileId) {
          const response = await axios.get(`http://localhost:5000/api/posts/get-friends-posts/${profileId}`);
          setFriendsPosts(response.data);
        }
      } catch (error) {
        console.error("Error fetching friends' posts:", error);
      }
    };

    fetchFriendsPosts();
  }, []);

  const toggleLike = async (postId: number, isLiked: boolean) => {
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
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <div>
      {friendsPosts.map((friend) => (
        <div key={friend.friend_name}>
          {/* Renderizar Posts Originales */}
          {friend.posts.length > 0 && friend.posts.map((post) => (
            <div key={post.id} className={styles["post-card"]}>
              <div className={styles["post-header"]}>
                <div className={styles["profile-info"]}>
                  <img src="/avatar.png" alt="Profile" className={styles["profile-image"]} />
                  <div className={styles["author-info"]}>
                    <h3 className={styles["post-author"]}>{friend.friend_name}</h3>
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
                  className={`${styles["like-button"]}`}
                  onClick={() => toggleLike(post.id, post.isLiked || false)}
                >
                  <FaHeart />
                  {post.isLiked ? " Liked" : " Like"}
                </button>
                <ViewCommentPosts postId={post.id} idProfile={idProfile} />
                <SharePosts postId={post.id} idProfile={idProfile} />
                <Options idProfile={idProfile} idPostSelect={post.id} />
              </div>
              <Separator />
              <CommentPosts id_post={post.id} id_profile={idProfile} />
            </div>
          ))}

          {/* Renderizar Posts Compartidos */}
          {friend.posts_shares.length > 0 && friend.posts_shares.map((share) => (
            <div key={share.id} className={styles["post-card"]}>
              <div className={styles["post-header"]}>
                <div className={styles["profile-info"]}>
                  <img src="/avatar.png" alt="Profile" className={styles["profile-image"]} />
                  <div className={styles["author-info"]}>
                    <h3 className={styles["post-author"]}>{friend.friend_name} compartió</h3>
                    <p className={styles["postDate"]}>{new Date(share.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <h3 className={styles["post-title"]}>{share.description}</h3>
              </div>
              <Separator />
              {/* Post Original Compartido */}
              <div className={styles["post-card"]}>
                <div className={styles["post-header"]}>
                  <div className={styles["profile-info"]}>
                    <img src="/avatar.png" alt="Profile" className={styles["profile-image"]} />
                    <div className={styles["author-info"]}>
                      <h3 className={styles["post-author"]}>{friend.friend_name}</h3>
                      <p className={styles["postDate"]}>{new Date(share.original_date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <h3 className={styles["post-title"]}>{share.original_description}</h3>
                </div>
                <div className={styles["post-body"]}>
                  <p>{share.original_content}</p>
                </div>
                <Separator />
                <div className={styles["options"]}>
                  <button
                    className={`${styles["like-button"]}`}
                    onClick={() => toggleLike(share.id, share.isLiked || false)}
                  >
                    <FaHeart />
                    {share.isLiked ? " Liked" : " Like"}
                  </button>
                  <Button variant="link"><BsChatDots /> Comentar</Button>
                  <SharePosts postId={share.id} idProfile={idProfile} />
                  <Options idProfile={idProfile} idPostSelect={share.id} />
                </div>
              </div>
              <Separator />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FriendsPosts;
