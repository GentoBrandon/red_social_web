'use client';
import { ReactNode } from 'react';
import NavBar from '../Nav/NavBar';
import Publication from '../Publication/Publication';
import Sidebar from '../Sidebar/Sidebar';


function Principal({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col h-screen">
            {/* Navbar */}
            <NavBar/>
    
            <div className="flex flex-1">
            {/* Sidebar */}
            <Sidebar />
            </div>
            <main className="flex-1 ml-64 p-4 overflow-y-auto">
                {children}
            </main>
        </div>
      )
}
export default Principal;