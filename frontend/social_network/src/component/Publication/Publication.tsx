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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import style from '../../styles/Publication.module.css';
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import axios from "axios";
import { fetchProfileId } from "@/services/IdProfile";
import { Routes_Post } from "@/routes/apiRoutes";

interface PublicationProps {
  id_profile: number;
  description: string;
  content: string;
}

function Publication() {
  const [idProfile, setIdProfile] = useState<number | null>(null);
  const [content, setContent] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchAndSetProfileData = async () => {
      try {
        const id = await fetchProfileId();
        setIdProfile(id);
      } catch (error) {
        console.error("Error al obtener el ID del perfil:", error);
      }
    };

    fetchAndSetProfileData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!idProfile) return;

    try {
      const payload = {
        id_profile: idProfile,
        description: description,
        content: content
      };
      console.log("Payload:", payload);

      const response = await axios.post(Routes_Post.CREATE_POST, payload, {
        withCredentials: true,
      });
      console.log("Respuesta de creación de publicación:", response.data);

      // Limpiar los campos después de publicar y cerrar el diálogo
      setContent("");
      setDescription("");
      setIsDialogOpen(false); // Cerrar el diálogo
    } catch (error) {
      console.error("Error al crear la publicación:", error);
    }
  };

  return (
    <div className={style.publication}>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className={style.btn}>¿Qué estás pensando hoy?</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Crear publicación</DialogTitle>
              <Separator />
              <DialogDescription>
                Escribe una publicación para compartir tus pensamientos.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Título
                </Label>
                <Input
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Descripción
                </Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="col-span-3"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Publicar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Publication;
