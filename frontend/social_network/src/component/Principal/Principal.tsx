'use client';
import { ReactNode } from 'react';
import { SidebarProvider} from "@/components/ui/sidebar"
import { AppSidebar } from "../../component/Sidebar/Sidebar"
import NavBar from '../Nav/NavBar';

function Principal({ children }: { children: ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar/>
            <main>
                <NavBar/>
                {children}
            </main>
        </SidebarProvider> 
    )
}
export default Principal;