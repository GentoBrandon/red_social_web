'use client';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsFillTrashFill } from "react-icons/bs";
import { useState } from "react";
import axios from "axios";
import { Routes_friend } from "@/routes/apiRoutes";

interface DropdownMenuDemoProps {
  idProfile: number | null;
  idProfileSelect: number;
}

export default function DropdownMenuDemo({ idProfile, idProfileSelect }: DropdownMenuDemoProps) {
  const [deleteStatus, setDeleteStatus] = useState<string | null>(null);

  const handleDeleteFriend = async () => {
    if (idProfile === null) return; // Verificar que idProfile esté definido

    try {
      const response = await axios.delete(
        `${Routes_friend.DELETE_REQUEST_1ID}${idProfile}/${idProfileSelect}`
      );
      setDeleteStatus("Amigo eliminado"); // Mensaje de éxito o puedes manejarlo como prefieras
      console.log("Amigo eliminado:", response.data);
    } catch (error) {
      console.error("Error al eliminar amigo:", error);
      setDeleteStatus("Error al eliminar amigo");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">⋮</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => { window.location.reload(); handleDeleteFriend(); }}>
            Eliminar amigo
            <DropdownMenuShortcut>
              <BsFillTrashFill />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
      {deleteStatus && <p>{deleteStatus}</p>} {/* Muestra el mensaje de estado */}
    </DropdownMenu>
  );
}
