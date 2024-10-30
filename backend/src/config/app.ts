import express from 'express';
import erroHandling from '../middleware/errorHandling';
import personRoutes from '../modules/person/routes/personRoutes';
import userCredentialsRoutes from '../modules/user-credentials/routes/userCredentialsRoutes';
import profileRoutes from '../modules/profile/routes/profileRoutes';
class App {
  private app: express.Application;
  private _PORT: number;
  public constructor(PORT: number) {
    this.app = express();
    this._PORT = PORT;
  }
  private settings(): void {
    this.app.use(express.json());
  }
  private routes(): void {
    this.app.use('/api/persons', personRoutes);
    this.app.use('/api/user-credentials', userCredentialsRoutes);
    this.app.use('/api/profile', profileRoutes);
  }
  private middlewares(): void {
    this.app.use(erroHandling);
  }
  private startServer(): void {
    this.app.listen(this._PORT, () => {
      console.log(`Server running on port ${this._PORT}`);
    });
  }
  private startSettings(): void {
    this.settings();
    this.routes();
    this.middlewares();

    this.startServer();
  }
  public start() {
    this.startSettings();
  }
}
export default App;
