/*
import React, { useState, useEffect } from 'react';
import { useSocket } from '../../context/SocketContext'; // Usa el contexto de Socket
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

const ChatWindow: React.FC<ChatWindowProps> = ({ profileId, friendId, friendName, onClose }) => {
    const { socket } = useSocket(); // Obtén el socket del contexto
    const [messages, setMessages] = useState<Message[]>([]);
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        if (!socket) return;

        // Emitir evento de registro del usuario al componente
       

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

        // Limpiar los eventos al desmontar el componente
        return () => {
            socket.off('load messages');
            socket.off('room message');
        };
    }, [socket, profileId, friendId]);

    const sendMessage = () => {
        if (message.trim() && socket) {
            const roomName = profileId < friendId ? `room-${profileId}-${friendId}` : `room-${friendId}-${profileId}`;
            
            // Emitir evento de envío de mensaje
            socket.emit('room message', {
                data: {
                    userId: profileId,
                    roomName: roomName,
                    content: message,
                    friendId: friendId,
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
                {messages.map((msg) => (
                    <div 
                        key={msg.id} 
                        className={msg.user_id === profileId ? styles.messageSent : styles.messageReceived}
                    >
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
import { useSocket } from '../../context/SocketContext'; // Usa el contexto de Socket
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

const ChatWindow: React.FC<ChatWindowProps> = ({ profileId, friendId, friendName, onClose }) => {
    const { socket } = useSocket(); // Obtén el socket del contexto
    const [messages, setMessages] = useState<Message[]>([]);
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        if (!socket) return;

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

        // Limpiar los eventos al desmontar el componente
        return () => {
            socket.off('load messages');
            socket.off('room message');
        };
    }, [socket, profileId, friendId]);

    const sendMessage = () => {
        if (message.trim() && socket) {
            const roomName = profileId < friendId ? `room-${profileId}-${friendId}` : `room-${friendId}-${profileId}`;
            
            // Emitir evento de envío de mensaje
            socket.emit('room message', {
                data: {
                    userId: profileId,
                    roomName: roomName,
                    content: message,
                    friendId: friendId,
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
                {messages.map((msg) => (
                    <div 
                        key={`${msg.id}-${msg.created}`}  // Combinación única de id y created
                        className={msg.user_id === profileId ? styles.messageSent : styles.messageReceived}
                    >
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
