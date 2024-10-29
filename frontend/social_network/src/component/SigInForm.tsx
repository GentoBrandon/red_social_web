import styles from '../styles/SignInForm.module.css';
import { Button } from '@/components/ui/button';

export default function SignInForm() {
  return (
    <div className={styles.container}>
      <div className={styles.frame}>
        <form className={styles.formSignin}>
          <label htmlFor="username">Username</label>
          <input className={styles.formStyling} type="text" name="username" placeholder="Username" />
          <label htmlFor="password">Password</label>
          <input className={styles.formStyling} type="password" name="password" placeholder="Password" />
          <button type="button" className={styles.btnSignin}>Sign in</button>
        </form>
        <a href="#" className={styles.forgot}>Forgot your password?</a>
        <br/>
        <br/>
        <Button variant="btnGreen">Crear cuenta nueva </Button>
      </div>
    </div>
  );
}
