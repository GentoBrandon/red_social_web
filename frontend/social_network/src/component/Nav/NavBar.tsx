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
import style from '../../styles/Profile/NavBar.module.css'
import Notifications from "@/component/Nav/Notifications";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { API_ROUTES } from "@/routes/apiRoutes";

function NavBar() {

    const [profile, setProfile] = useState<null | any>(null);
    const router = useRouter();
    // Función para cerrar sesión
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
      <Menubar className={style.Menubar}>
        <div className={style.MenubarMenu}>
          <MenubarMenu>
            <MenubarTrigger onClick={() => router.push('/dashboard')}>Inicio</MenubarTrigger>
          </MenubarMenu>
        </div>
        <div className={style.MenubarMenu}>
          <MenubarMenu>
            <MenubarTrigger>Amigos</MenubarTrigger>
          </MenubarMenu>
        </div>
        <div className={style.MenubarMenu}>
          <MenubarMenu>
            <MenubarTrigger>Notificaciones</MenubarTrigger>
            <MenubarContent>
              <Notifications />
            </MenubarContent>
          </MenubarMenu>
        </div>
        <div className={style.MenubarMenu}>
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
        </div>
      </Menubar>
    )
  }

export default NavBar;
  