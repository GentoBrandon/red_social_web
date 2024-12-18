import express from 'express';
import erroHandling from '../middleware/errorHandling';
import personRoutes from '../modules/person/routes/personRoutes';
import userCredentialsRoutes from '../modules/person/routes/userCredentialsRoutes';
import profileRoutes from '../modules/profile/routes/profileRoutes';
import authRoutes from '../modules/auth/routes/authRoutes';
import userRoutes from '../modules/person/routes/userRoutes';
import postsRoutes from '../modules/posts/routes/postRoutes';
import postShareRoutes from '../modules/posts/routes/postShareRoutes';
import postReactionsRoutes from '../modules/posts/routes/postReactionsRoutes';
import postComentsRoutes from '../modules/posts/routes/postComentsRoutes';
import cookieParser from 'cookie-parser';
import dbConfig from './dbConfig'; // Importa tu instancia de Knex
import SocketController from '../controllers/socket/socketIoController';
import friendStatusRoutes from '../modules/profile/routes/friendStatusRoutes';
import requestFriendRoutes from '../modules/profile/routes/requestFriendRoutes';
import friendRoutes from '../modules/profile/routes/friendRoutes';
// configuracion de sockect.io
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
class App {
  private app: express.Application;
  private _PORT: number;
  private _server: http.Server;
  private _io: Server;
  public constructor(PORT: number) {
    this.app = express();
    this._PORT = PORT;
    this._server = http.createServer(this.app);
    this._io = new Server(this._server, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    });
  }

  public get io(): Server {
    return this._io;
  }

  private settings(): void {
    this.app.use(
      cors({
        origin: 'http://localhost:3000',
        credentials: true,
      }),
    );
    this.app.use(express.json());
    this.app.use(cookieParser());
  }
  private routes(): void {
    this.app.use('/api/users', userRoutes);
    this.app.use('/api/persons', personRoutes);
    this.app.use('/api/user-credentials', userCredentialsRoutes);
    this.app.use('/api/profile', profileRoutes);
    this.app.use('/api/auth', authRoutes);
    this.app.use('/api/friend-status', friendStatusRoutes);
    this.app.use('/api/request-friend', requestFriendRoutes);
    this.app.use('/api/friend', friendRoutes);
    this.app.use('/api/posts/', postsRoutes);
    this.app.use('/api/post-share', postShareRoutes);
    this.app.use('/api/post-reactions', postReactionsRoutes);
    this.app.use('/api/post-comments', postComentsRoutes);
  }
  private middlewares(): void {
    this.app.use(erroHandling);
  }
  private startServer(): void {
    this._server.listen(this._PORT, () => {
      console.log(`Server running on port ${this._PORT}`);
    });
  }
  private settingsSocketIo(): void {
    this._io.on('connection', (socket) => {
      console.log('a user connected', socket.id);
      SocketController(socket, this._io, dbConfig);
    });
  }
  private startSettings(): void {
    this.settings();
    this.routes();
    this.middlewares();
    this.settingsSocketIo();
    this.startServer();
  }
  public start() {
    this.startSettings();
  }
}
export default App;
