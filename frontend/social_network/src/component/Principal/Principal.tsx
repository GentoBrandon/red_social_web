/*'use client';
import { ReactNode } from 'react';
import NavBar from '../Nav/NavBar';
import Publication from '../Publication/Publication';
import Sidebar from '../Sidebar/Sidebar';


function Principal({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col h-screen">
            <NavBar/>
            <main className="flex-1 ml-64 p-4 overflow-y-auto">
                <div className="flex flex-1">
                <Sidebar />
                </div>
                {children}
            </main>
        </div>
      )
}
export default Principal;*/

// src/components/Principal.tsx
'use client';
import { ReactNode, useEffect, useState } from 'react';
import NavBar from '../Nav/NavBar';
import Sidebar from '../Sidebar/Sidebar';
import { SocketProvider, useSocket } from '../../context/SocketContext';

function Principal({ children }: { children: ReactNode }) {
    const { socket } = useSocket();
    const [notifications, setNotifications] = useState<string[]>([]);

    useEffect(() => {
        if (socket) {
            // Escucha el evento de notificación cuando el WebSocket está conectado
            socket.on('notification', (message: string) => {
                setNotifications((prev) => [...prev, message]);
            });
        }

        // Limpia el evento cuando el componente se desmonta
        return () => {
            socket?.off('notification');
        };
    }, [socket]);

    return (
        <div className="flex flex-col h-screen">
            <NavBar />
            <main className="flex-1 ml-64 p-4 overflow-y-auto">
                <div className="flex flex-1">
                    <Sidebar 
                     /> {/* Pasa las notificaciones al Sidebar */}
                </div>
                {children}
            </main>
        </div>
    );
}

// Envuelve Principal con SocketProvider en lugar de hacerlo en el layout
export default function WrappedPrincipal({ children }: { children: ReactNode }) {
    return (
        <SocketProvider>
            <Principal>{children}</Principal>
        </SocketProvider>
    );
}
