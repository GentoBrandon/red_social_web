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
import { useState, useEffect } from "react";
import { ROUTES_PROFILE } from "@/routes/apiRoutes";
import axios from "axios";
import { fetchProfileId } from "@/services/IdProfile";
import { useRouter } from "next/navigation";

interface Data {
  presentation: string;
  address: string;
  phone_number: string;
  job: string;
  university: string;
}

function DialogDemo() {
  const router = useRouter();
  const [user, setUser] = useState<Data>({
    presentation: "",
    address: "",
    phone_number: "",
    job: "",
    university: "",
  });
  const [idProfile, setIdProfile] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!idProfile) return;

    try {
      await axios.put(`${ROUTES_PROFILE.UPDATE_PROFILE}/${idProfile}`, user, {
        withCredentials: true,
      });
      setIsDialogOpen(false);  // Cierra el diálogo después de actualizar
      
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
    }
  };

  const fetchProfileData = async () => {
    if (idProfile === null) return;

    try {
      const response = await axios.get(`${ROUTES_PROFILE.FIND_PROFILE_BY_ID}${idProfile}`);
      setUser({
        presentation: response.data.presentation,
        address: response.data.address,
        phone_number: response.data.phone_number,
        job: response.data.job,
        university: response.data.university,
      });
    } catch (error) {
      console.error("Error al obtener el perfil:", error);
    }
  };

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

  useEffect(() => {
    fetchProfileData();
  }, [idProfile]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="btnBlue">Editar perfil</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Editar perfil</DialogTitle>
            <Separator />
            <DialogDescription>
              Haz cambios en tu perfil aquí. Haz clic en guardar cuando termines.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="presentation" className="text-right">
                Presentación
              </Label>
              <Textarea
                id="presentation"
                name="presentation"
                value={user.presentation}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                Dirección
              </Label>
              <Input
                id="address"
                name="address"
                value={user.address}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone_number" className="text-right">
                Número de teléfono
              </Label>
              <Input
                id="phone_number"
                name="phone_number"
                value={user.phone_number}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="job" className="text-right">
                Trabajo
              </Label>
              <Input
                id="job"
                name="job"
                value={user.job}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="university" className="text-right">
                Universidad
              </Label>
              <Input
                id="university"
                name="university"
                value={user.university}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={() => window.location.reload()}>Guardar cambios</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default DialogDemo;
