import { Socket, Server } from 'socket.io';
import { Knex } from 'knex';

// Mapa para rastrear usuarios en línea
const onlineUsers = new Map<string, string>();

export default function chatController(socket: Socket, io: Server, knex: Knex) {
    console.log('User connected to chat:', socket.id);

    // Evento `register` para asociar el user_id con el socket.id
    socket.on('register', (data) => {
        const userId = data.data; // Extrae userId de data
        if (userId) {
            onlineUsers.set(userId, socket.id);
            console.log(`User ${userId} registered with socket ID: ${socket.id}`);
            socket.emit('register confirmation', {
                message: `User ${userId} registered successfully`,
                userId: userId,
                socketId: socket.id
            });

            // Notificar a los amigos conectados del usuario
            io.emit('user status', { userId, status: 'online' });
        } else {
            console.error('Error: Missing userId in register event');
        }
    });
    
    socket.on('join room', async (data) => {
        try {
            const { roomName, userId, friendId } = data.data;

            // Verifica que `friendId` no sea undefined
            if (!userId || !friendId) {
                console.error('Error: userId or friendId is missing in join room event');
                socket.emit('error', { message: 'User ID and Friend ID are required' });
                return;
            }
            // Definir el nombre de la sala con IDs en orden
            const orderedRoomName = userId < friendId ? `room-${userId}-${friendId}` : `room-${friendId}-${userId}`;

            let roomId;
            let room = await knex('rooms').where({ name: orderedRoomName }).first();
            if (!room) {
                const resultInsert = await knex('rooms').insert({ name: orderedRoomName }).returning('id');
                roomId = resultInsert[0].id;
            } else {
                roomId = room.id;
            }

            const member = await knex('room_members').where({ room_id: roomId, profile_id: userId }).first();
            if (!member) {
                await knex('room_members').insert({ room_id: roomId, profile_id: userId });
            }

            socket.join(roomId.toString());
            console.log(`User ${userId} joined room "${orderedRoomName}" with ID ${roomId}`);

            //const messages = await knex('messages').where({ room_id: roomId }).orderBy('created', 'asc');
            const messages = await knex('messages')
    .where({ room_id: roomId })
    .select('id', 'profile_id as user_id', 'content', 'created')  // Asegúrate de incluir 'user_id' aquí
    .orderBy('created', 'asc');
            socket.emit('load messages', messages);
        } catch (error) {
            console.error('Error joining room:', error);
        }
    });

    // Evento para enviar un mensaje en una sala
    socket.on('room message', async (data) => {
        try {
            const { userId, roomName, content,friendId } = data.data;

            if (!userId || !roomName || !content) {
                console.error('Error: Missing data for room message event:', data);
                socket.emit('error', { message: 'User ID, Room Name, and Content are required' });
                return;
            }

            let roomId;
            let room = await knex('rooms').where({ name: roomName }).first();
            if (!room) {
                const resultInsert = await knex('rooms').insert({ name: roomName }).returning('id');
                roomId = resultInsert[0].id;
            } else {
                roomId = room.id;
            }

            const [messageId] = await knex('messages').insert({
                room_id: roomId,
                profile_id: userId,
                content: content,
                created: new Date()
            }).returning('id');

            const message = { id: messageId, user_id: userId, room_id: roomId, content, created: new Date() };
            
            // Envía el mensaje a todos los usuarios de la sala, incluido el remitente
            io.to(roomId.toString()).emit('room message', message);
            // Notificar al amigo si está en línea y el chat no está abierto
       // Verificar si el amigo está conectado y enviar una notificación
       const friendSocketId = onlineUsers.get(friendId);
        if (friendSocketId && friendSocketId !== socket.id) { 
            console.log(`Enviando notificación al amigo con Socket ID: ${friendSocketId}`);
            io.to(friendSocketId).emit('notification', { senderId: userId });
        }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    });

    // Evento `private message` para enviar mensajes privados
    socket.on('private message', async (data) => {
        const { senderId, receiverId, content } = data.data;
        console.log('Sender ID:', senderId, 'Receiver ID:', receiverId, 'Content:', content);

        if (!senderId || !receiverId || !content) {
            console.error('Error: Missing data in private message event:', data);
            return;
        }

        try {
            const [messageId] = await knex('messages').insert({
                content: content,
                profile_id: senderId,
                created: new Date()
            }).returning('id');

            const receiverSocketId = onlineUsers.get(receiverId);
            console.log('Receiver socket ID:', receiverSocketId);

            if (receiverSocketId) {
                io.to(receiverSocketId).emit('private message', {
                    id: messageId,
                    senderId,
                    receiverId,
                    content,
                    created: new Date()
                });
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

    // Evento `disconnect` para limpiar usuarios en línea
    socket.on('disconnect', () => {
        for (const [userId, socketId] of onlineUsers.entries()) {
            if (socketId === socket.id) {
                onlineUsers.delete(userId);
                console.log(`User ${userId} disconnected`);
                io.emit('user status', { userId, status: 'offline' });
                break;
            }
        }
    });
}
