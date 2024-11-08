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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BsSend } from "react-icons/bs";
import { Routes_Post } from "@/routes/apiRoutes";
import styles from "@/styles/Post.module.css";
import CommentPosts from "@/component/Posts/CommentPosts";
 

function SharePostDialog({ postId, idProfile }: { postId: number | null; idProfile: number | null }) {

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="link" onClick={loadPostData}>
          Comentar <BsSend/>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Compartir publicación</DialogTitle>
            <Separator />
            <DialogDescription>
              Añade una descripción adicional y comparte la publicación.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* Información de la publicación original */}
            {post && (
              <div className={styles["post-card"]}>
                <div className={styles["post-header"]}>
                  <div className={styles["profile-info"]}>
                    <img src="/avatar.png" alt="Profile" className={styles["profile-image"]} />
                    <div className={styles["author-info"]}>
                      <h3 className={styles["post-author"]}>Brandon Gento</h3>
                      <p className={styles["postDate"]}>{new Date(post.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <h3 className={styles["post-title"]}>{post.description}</h3>
                </div>
                <div className={styles["post-body"]}>
                  <p>{post.content}</p>
                </div>
                <Separator />
              </div>
            )}
          </div>
          <CommentPosts id_post={post.id} id_profile={idProfile}/>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default SharePostDialog;
