// components/Options.tsx (anteriormente DeletePosts)
'use client';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsFillTrashFill } from "react-icons/bs";
import { useState } from "react";
import axios from "axios";
import { SlOptionsVertical } from "react-icons/sl";
import EditPostDialog from "@/component/Posts/UpdatePost";
import { Routes_Post } from "@/routes/apiRoutes";

interface OptionsProps {
  idProfile: number | null;
  idPostSelect: number;
}

export default function Options({ idProfile, idPostSelect }: OptionsProps) {
  const [deleteStatus, setDeleteStatus] = useState<string | null>(null);
  console.log("idProfile", idProfile);
  console.log("idPostSelect", idPostSelect);

  const handleDeletePost = async () => {
    if (idProfile === null) return;

    try {
      // await axios.delete(`http://localhost:5000/api/postS/delete-post-profile/${idPostSelect}/${idProfile}`);
      await axios.delete(`${Routes_Post.DELETE_POST_PROFILE}${idPostSelect}/${idProfile}`);
      setDeleteStatus("Publicación eliminada exitosamente.");
      // Idealmente, actualiza el estado o utiliza router.refresh() para refrescar
    } catch (error) {
      console.error("Error al eliminar la publicación:", error);
      setDeleteStatus("Error al eliminar la publicación.");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link">
          <SlOptionsVertical /> Opciones
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Button variant="link" onClick={() => {handleDeletePost();  window.location.reload();}}> Borrar publicación <BsFillTrashFill /></Button>
          {/* <DropdownMenuItem onClick={()=> handleDeletePost}>
            Eliminar publicación
            <BsFillTrashFill />
          </DropdownMenuItem> */}
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <EditPostDialog postId={idPostSelect} idProfile={idProfile} />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
      {deleteStatus && <p>{deleteStatus}</p>}
    </DropdownMenu>
  );
}
