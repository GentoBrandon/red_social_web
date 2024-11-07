/*
import React, { useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';
import styles from './chatwindow.module.css';

interface ChatWindowProps {
    profileId: number;
    friendId: number;
    friendName: string;
    onClose: () => void;
}

interface Message {
    id: number;
    user_id: number;
    content: string;
    created: Date;
}

let socket: Socket;
const ChatWindow: React.FC<ChatWindowProps> = ({ profileId, friendId, friendName, onClose }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        socket = io('http://localhost:5000');
        socket.emit('register', { data: profileId });

        // Definir el nombre de la sala usando IDs en orden
        const roomName = profileId < friendId ? `room-${profileId}-${friendId}` : `room-${friendId}-${profileId}`;
        
        socket.emit('join room', { data: { roomName, userId: profileId, friendId: friendId} });

        // Escuchar los mensajes de la sala
        socket.on('load messages', (data: Message[]) => {
            setMessages(data);
        });
        socket.on('room message', (newMessage: Message) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        return () => {
            socket.disconnect();
        };
    }, [profileId, friendId]);

    const sendMessage = () => {
        if (message.trim()) {
            // Enviar mensaje a la sala correcta
            const roomName = profileId < friendId ? `room-${profileId}-${friendId}` : `room-${friendId}-${profileId}`;
            
            socket.emit('room message', {
                data: {
                    userId: profileId,
                    roomName: roomName,
                    content: message,
                },
            });
            setMessage('');
        }
    };

    return (
        <div className={styles.chatWindow}>
            <div className={styles.chatHeader}>
                <span>Chat con {friendName}</span>
                <button onClick={onClose} className={styles.closeButton}>X</button>
            </div>
            <div className={styles.messagesContainer}>
                {messages.map((msg,index) => (
                    <div key={msg.id|| index} className={styles.message}>
                        <strong>{msg.user_id === profileId ? 'Tú' : friendName}:</strong> {msg.content}
                    </div>
                ))}
            </div>
            <div className={styles.inputContainer}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Escribe un mensaje..."
                    className={styles.input}
                />
                <button onClick={sendMessage} className={styles.sendButton}>Enviar</button>
            </div>
        </div>
    );
};

export default ChatWindow;
*/
import React, { useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';
import styles from './chatwindow.module.css';

interface ChatWindowProps {
    profileId: number; // ID del usuario actual
    friendId: number;  // ID del amigo con el que estás chateando
    friendName: string; // Nombre del amigo
    onClose: () => void;
}

interface Message {
    id: number;
    user_id: number;
    content: string;
    created: Date;
}

let socket: Socket;
const ChatWindow: React.FC<ChatWindowProps> = ({ profileId, friendId, friendName, onClose }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        // Inicializar conexión de socket
        socket = io('http://localhost:5000');
        
        // Emitir evento de registro del usuario
        socket.emit('register', { data: profileId });

        // Definir el nombre de la sala basado en los IDs en orden
        const roomName = profileId < friendId ? `room-${profileId}-${friendId}` : `room-${friendId}-${profileId}`;
        
        // Emitir evento para unirse a la sala
        socket.emit('join room', { data: { roomName, userId: profileId, friendId: friendId } });

        // Escuchar el evento para cargar mensajes
        socket.on('load messages', (data: Message[]) => {
            setMessages(data);
        });

        // Escuchar mensajes nuevos en la sala
        socket.on('room message', (newMessage: Message) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        // Desconectar el socket al desmontar el componente
        return () => {
            socket.disconnect();
        };
    }, [profileId, friendId]);

    const sendMessage = () => {
        if (message.trim()) {
            const roomName = profileId < friendId ? `room-${profileId}-${friendId}` : `room-${friendId}-${profileId}`;
            
            // Emitir evento de envío de mensaje
            socket.emit('room message', {
                data: {
                    userId: profileId,
                    roomName: roomName,
                    content: message,
                },
            });
            setMessage('');
        }
    };

    return (
        <div className={styles.chatWindow}>
            <div className={styles.chatHeader}>
                <span>{friendName}</span>
                <button onClick={onClose} className={styles.closeButton}>X</button>
            </div>
            <div className={styles.messagesContainer}>
                {messages.map((msg) => {
                    console.log("Mensaje ID:", msg.id, "Enviado por:", msg.user_id, "Tu ID:", profileId);
                    return (
                        <div 
                            key={msg.id} 
                            className={msg.user_id === profileId ? styles.messageSent : styles.messageReceived}
                        >
                            <strong>{msg.user_id === profileId ? 'Tú' : friendName}:</strong> {msg.content}
                        </div>
                    );
                })}
            </div>
            <div className={styles.inputContainer}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Escribe un mensaje..."
                    className={styles.input}
                />
                <button onClick={sendMessage} className={styles.sendButton}>Enviar</button>
            </div>
        </div>
    );
};

export default ChatWindow;
