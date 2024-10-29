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
  } from "@/components/ui/menubar"
import { SidebarTrigger } from "@/components/ui/sidebar";
  
function NavBar() {
    return (
      <Menubar>
        <SidebarTrigger />
        <MenubarMenu>
          <MenubarTrigger>Inicio</MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Amigos</MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Notificaciones</MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Perfil</MenubarTrigger>
          <MenubarContent>
            <MenubarRadioGroup value="benoit">
              <MenubarRadioItem value="#">Perfil</MenubarRadioItem>
            </MenubarRadioGroup>
            <MenubarSeparator />
            <MenubarItem inset>Configuraciones</MenubarItem>
            <MenubarSeparator />
            <MenubarItem inset>Cerrar sesion</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )
  }

export default NavBar;
  