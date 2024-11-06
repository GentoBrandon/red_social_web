import { Socket, Server } from 'socket.io';
import { Knex } from 'knex';

// Mapa para rastrear usuarios en línea
const onlineUsers = new Map<string, string>();

export default function chatController(socket: Socket, io: Server, knex: Knex) {
    console.log('User connected to chat:', socket.id);

    socket.on('register', (data) => {
        const userId = data.data; // Extrae userId de data
        if (userId) {
            onlineUsers.set(userId, socket.id);
            console.log(`User ${userId} registered with socket ID: ${socket.id}`);
            console.log('Current online users:', onlineUsers); // Verifica el contenido del mapa
    
            // Enviar una confirmación de registro al cliente
            socket.emit('register confirmation', {
                message: `User ${userId} registered successfully`,
                userId: userId,
                socketId: socket.id
            });
        } else {
            console.error('Error: Missing userId in register event');
        }
    });
    

    // Evento `disconnect` para eliminar al usuario del mapa cuando se desconecte
    socket.on('disconnect', () => {
        for (const [userId, socketId] of onlineUsers.entries()) {
            if (socketId === socket.id) {
                onlineUsers.delete(userId);
                console.log(`User ${userId} disconnected`);
                break;
            }
        }
    });

    // Evento `private message` para enviar mensajes privados entre usuarios
    socket.on('private message', async (data) => {
        // Asegúrate de que data tenga los valores necesarios
        const { senderId, receiverId, content } = data.data;
        console.log('Sender ID:', senderId, 'Receiver ID:', receiverId, 'Content:', content);
        console.log('Current online users:', onlineUsers); // Verifica los usuarios en línea

        // Verifica que los valores no estén vacíos o nulos
        if (!senderId || !receiverId || !content) {
            console.error('Error: Missing data in private message event:', data);
            return;
        }
    
        try {
            // Inserta el mensaje en la base de datos
            const [messageId] = await knex('messages').insert({
                content: content,
                user_id: senderId,   // Relaciona el mensaje con el ID del usuario que envía
                created: new Date()
            }).returning('id');
    
            // Busca el socket del receptor en el mapa `onlineUsers`
            const receiverSocketId = onlineUsers.get(receiverId);
            console.log('Receiver socket ID:', receiverSocketId); // Verifica si `receiverSocketId` es válido

            if (receiverSocketId) {
                // Envía el mensaje solo al socket del receptor
                io.to(receiverSocketId).emit('private message', {
                    id: messageId,
                    senderId,
                    receiverId,
                    content,
                    created: new Date()
                });

                // Opcional: También envía una confirmación al remitente
                socket.emit('private message confirmation', {
                    message: 'Mensaje enviado',
                    senderId,
                    receiverId,
                    content
                });
            } else {
                console.log(`User ${receiverId} is offline. Message stored.`);
            }
        } catch (error) {
            console.error('Error saving message:', error);
        }
    });
}
