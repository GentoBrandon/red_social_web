'use client';
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarTrigger,
  } from "@/components/ui/menubar";
import Notifications from "@/component/Nav/Notifications";
import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { API_ROUTES } from "@/routes/apiRoutes";

function NavBar() {

    const [profile, setProfile] = useState<null | any>(null);
    const router = useRouter();

    const handleProfile = async (): Promise<void> => {
      try {
        await axios.post(API_ROUTES.LOGOUT,{},{ withCredentials: true });
        setProfile(null);
        router.push('/');
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Inicio</MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Amigos</MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Notificaciones</MenubarTrigger>
          <MenubarContent>
            <Notifications />
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger onClick={() => router.push('/users/profile')}>Perfil</MenubarTrigger>
          <MenubarContent>
            <MenubarRadioGroup value="benoit">
              <MenubarRadioItem value="#">Perfil</MenubarRadioItem>
            </MenubarRadioGroup>
            <MenubarSeparator />
            <MenubarItem inset>Configuraciones</MenubarItem>
            <MenubarSeparator />
            <MenubarItem inset onClick={handleProfile}>Cerrar sesion</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )
  }

export default NavBar;
  