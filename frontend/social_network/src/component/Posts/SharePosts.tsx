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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BsSend } from "react-icons/bs";
import { Routes_Post } from "@/routes/apiRoutes";
import styles from "@/styles/Post.module.css";

interface Post {
  id_profile: number;
  description: string;
  content: string;
  date: string;
  name_person: string;
  last_name_person: string;
}

function SharePostDialog({ postId, idProfile }: { postId: number | null; idProfile: number | null }) {
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [shareDescription, setShareDescription] = useState(""); 
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Cargar datos de la publicación cuando se hace clic en el botón de "Compartir publicación"
  const loadPostData = async () => {
    if (postId) {
      try {
        const response = await axios.get(`${Routes_Post.GET_POST_ID}${postId}`);
        if (response.data && response.data.length > 0) {
          setPost(response.data[0]);
        }
        setIsDialogOpen(true);
      } catch (error) {
        console.error("Error al obtener los datos de la publicación:", error);
      }
    }
  };

  // Enviar información del post compartido y cerrar el diálogo
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!post || !idProfile) return;

    try {
      const payload = {
        id_profile: idProfile,
        id_post: postId,
        description: shareDescription,
      };
      await axios.post(`http://localhost:5000/api/post-share/create-post-share`, payload, {
        withCredentials: true,
      });

      setIsDialogOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Error al compartir la publicación:", error);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="link" onClick={loadPostData}>
          Compartir <BsSend />
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
            {post && (
              <div className={styles["post-card"]}>
                <div className={styles["post-header"]}>
                  <div className={styles["profile-info"]}>
                    <img src="/avatar.png" alt="Profile" className={styles["profile-image"]} />
                    <div className={styles["author-info"]}>
                      <h3 className={styles["post-author"]}>
                        {post.name_person} {post.last_name_person}
                      </h3>
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="share-description" className="text-right">
                Descripción adicional
              </Label>
              <Textarea
                id="share-description"
                name="share-description"
                value={shareDescription}
                onChange={(e) => setShareDescription(e.target.value)}
                className="col-span-3"
                placeholder="Añade una descripción para el post compartido..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Compartir</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default SharePostDialog;
