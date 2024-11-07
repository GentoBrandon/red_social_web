// components/Posts/EditPostDialog.tsx
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

interface PostData {
  id: number;
  id_profile: number;
  description: string;
  content: string;
  date: string;
}

function EditPostDialog({ postId, idProfile }: { postId: number | null; idProfile: number | null }) {
  const router = useRouter();
  const [post, setPost] = useState<PostData | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Cargar datos de la publicación cuando se hace clic en el botón de "Editar publicación"
  const loadPostData = async () => {
    if (postId) {
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/get-id-post/${postId}`);
        setPost(response.data);
        setIsDialogOpen(true); // Abrir el diálogo después de cargar datos
      } catch (error) {
        console.error("Error al obtener los datos de la publicación:", error);
      }
    }
  };

  // Manejar cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    if (!post) return;
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  // Enviar actualización de la publicación y cerrar el diálogo
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!post || !idProfile) return;

    try {
      const payload = {
        id_profile: idProfile,
        description: post.description,
        content: post.content,
      };
      console.log("Payload:", payload);
      await axios.put(
        `http://localhost:5000/api/posts/update-post/${postId}`, payload,
        { withCredentials: true }
      );

      setIsDialogOpen(false); // Cierra el diálogo después de actualizar
      router.refresh(); // Refrescar para ver los cambios actualizados
    } catch (error) {
      console.error("Error al actualizar la publicación:", error);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="link" onClick={loadPostData}>
          Editar publicación
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Editar publicación</DialogTitle>
            <Separator />
            <DialogDescription>
              Haz cambios en tu publicación aquí. Haz clic en guardar cuando termines.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Título
              </Label>
              <Input
                id="description"
                name="description"
                value={post?.description || ""}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="content" className="text-right">
                Descripción
              </Label>
              <Textarea
                id="content"
                name="content"
                value={post?.content || ""}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={()=> window.location.reload()} >Guardar cambios</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditPostDialog;
