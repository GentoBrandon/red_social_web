import { Socket } from "socket.io";

export default function SocketController(socket: Socket) {
  console.log('a user connected',socket.id);
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('error', (err) => {
    console.error('Socket.IO error:', err);
  });
  // Ejemplo de evento personalizado
  socket.on('customEvent', (data) => {
    console.log('Custom Event Data:', data);
    // Lógica para el evento personalizado
  });

  socket.on('chat message', (msg) =>{
    console.log('message: ' + msg);
    socket.broadcast.emit('chat message', msg);
  })
  

}