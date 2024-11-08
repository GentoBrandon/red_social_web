// components/Posts/SharePostDialog.tsx
'use client';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import axios from "axios";
import { BsChatDots } from "react-icons/bs";
import styles from "@/styles/Post.module.css";
import CommentPosts from "@/component/Posts/CommentPosts";
import { ScrollArea } from "@radix-ui/react-scroll-area";

interface Comment {
  first_name: string;
  last_name: string;
  comment: string;
  date: string;
}

interface PostData {
  post_id: number;
  post_owner_first_name: string;
  post_owner_last_name: string;
  post_content: string;
  post_description: string;
  post_fecha: string;
  comments: Comment[];
}

function SharePostDialog({ postId, idProfile }: { postId: number | null; idProfile: number | null }) {
  const [post, setPost] = useState<PostData | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Función para cargar los datos del post y comentarios
  const loadPostData = async () => {
    if (postId) {
      try {
        const response = await axios.get(`http://localhost:5000/api/post-comments/coments-post/${postId}`);
        setPost(response.data.data);
        setIsDialogOpen(true);
      } catch (error) {
        console.error("Error al obtener los datos de la publicación y comentarios:", error);
      }
    }
  };

  // Función para actualizar comentarios tras hacer un nuevo comentario
  const refreshComments = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/post-comments/coments-post/${postId}`);
      setPost(response.data.data);
    } catch (error) {
      console.error("Error al actualizar los comentarios:", error);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="link" onClick={loadPostData}>
          Comentar <BsChatDots />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Comentarios</DialogTitle>
          <Separator />
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className={styles["post-card"]}>
            <div className={styles["post-header"]}>
              <div className={styles["profile-info"]}>
                <img src="/avatar.png" alt="Profile" className={styles["profile-image"]} />
                <div className={styles["author-info"]}>
                  <h3 className={styles["post-author"]}>{post?.post_owner_first_name} {post?.post_owner_last_name}</h3>
                  <p>{post?.post_fecha ? new Date(post.post_fecha).toLocaleDateString() : "Fecha no disponible"}</p>
                </div>
              </div>
              <h3 className={styles["post-title"]}>{post?.post_description}</h3>
            </div>
            <div className={styles["post-body"]}>
              <p>{post?.post_content}</p>
            </div>
          </div>
        </div>

        <ScrollArea className={`${styles["comments-section"]} h-[250px] w-full overflow-y-auto`}>
          {post?.comments && post.comments.length > 0 ? (
            post.comments.map((comment, index) => (
              <div key={index} className={styles["comment-card"]}>
                <div className={styles["comment-header"]}>
                  <img src="/avatar.png" alt="Profile" className={styles["profile-image"]} />
                  <h4>{comment.first_name} {comment.last_name}</h4>
                  <p>{new Date(comment.date).toLocaleDateString()}</p>
                </div>
                <p>{comment.comment}</p>
                <Separator />
              </div>
            ))
          ) : (
            <p>No hay comentarios para esta publicación.</p>
          )}
        </ScrollArea>

        <CommentPosts id_post={postId} id_profile={idProfile} refreshComments={refreshComments} />
      </DialogContent>
    </Dialog>
  );
}

export default SharePostDialog;
