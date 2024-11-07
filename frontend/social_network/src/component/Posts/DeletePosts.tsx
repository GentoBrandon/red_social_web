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
import { FaEdit } from "react-icons/fa";
import { SlOptionsVertical } from "react-icons/sl";
import EditPostDialog from "@/component/Posts/UpdatePost";
import { Routes_Post } from "@/routes/apiRoutes";

interface OptionsProps {
  idProfile: number | null;
  idPostSelect: number;
}

export default function Options({ idProfile, idPostSelect }: OptionsProps) {
  const [deleteStatus, setDeleteStatus] = useState<string | null>(null);

  const handleDeletePost = async () => {
    if (idProfile === null) return;

    try {
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
          <DropdownMenuItem onClick={()=> {handleDeletePost; window.location.reload()}}>
            Eliminar publicación
            <BsFillTrashFill />
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <EditPostDialog postId={idPostSelect} idProfile={idProfile} />
          </DropdownMenuItem>
          <FaEdit />
        </DropdownMenuGroup>
      </DropdownMenuContent>
      {deleteStatus && <p>{deleteStatus}</p>}
    </DropdownMenu>
  );
}
