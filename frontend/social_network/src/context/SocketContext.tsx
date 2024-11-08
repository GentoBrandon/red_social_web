// src/context/SocketContext.tsx
'use client';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import io, { Socket } from 'socket.io-client';

interface SocketContextType {
    socket: Socket | null;
}

const SocketContext = createContext<SocketContextType>({ socket: null });

export const SocketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const newSocket = io('http://localhost:5000'); // Conexión con el servidor WebSocket
        setSocket(newSocket);

        return () => {
            newSocket.disconnect(); // Desconectar el WebSocket cuando el componente se desmonta
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);
