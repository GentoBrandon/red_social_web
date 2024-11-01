import express from 'express';
import erroHandling from '../middleware/errorHandling';
import personRoutes from '../modules/person/routes/personRoutes';
import userCredentialsRoutes from '../modules/user-credentials/routes/userCredentialsRoutes';
import profileRoutes from '../modules/profile/routes/profileRoutes';
import authRoutes from '../modules/auth/routes/authRoutes';
import cookieParser from 'cookie-parser';
// configuracion de sockect.io
import http from 'http';
import {Server} from 'socket.io';
import cors from 'cors'
class App {
  private app: express.Application;
  private _PORT: number;
  private _server : http.Server;
  private _io : Server;
  public constructor(PORT: number) {
    this.app = express();
    this._PORT = PORT;
    this._server = http.createServer(this.app);
    this._io = new Server(this._server);
  }


  private settings(): void {
    this.app.use(cors({
      origin: 'http://localhost:3000',
      credentials: true
    }))
    this.app.use(express.json());
    this.app.use(cookieParser());
  }
  private routes(): void {
    this.app.use('/api/persons', personRoutes);
    this.app.use('/api/user-credentials', userCredentialsRoutes);
    this.app.use('/api/profile', profileRoutes);
    this.app.use('/api/auth', authRoutes);
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
      console.log('a user connected');
      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
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
