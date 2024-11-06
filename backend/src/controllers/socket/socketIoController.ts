import { Socket, Server } from 'socket.io';
import chatController from '../chat/chatController';
import { Knex } from 'knex';

export default function SocketController(socket: Socket, io: Server, knex: Knex) {
    console.log('User connected:', socket.id);

    // Configuramos el controlador del chat
    chatController(socket, io, knex);

    // Evento para manejar la desconexión del usuario
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
}
