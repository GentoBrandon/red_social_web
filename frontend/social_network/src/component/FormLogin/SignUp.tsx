import styles from '../../styles/SignUpForm.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function SignUpForm() {
  return (
    <div className={styles.container}>
      <div className={styles.frame}>
        <form className={styles.formSignup}>
        <div className="row">
            <div className="col">
              <label htmlFor="fullname">Nombres</label>
              <input className={styles.formStyling} type="text" name="first_name" placeholder="Ingrese su nombre" required/>
            </div>
            <div className="col">
              <label htmlFor="fullname">Apellidos</label>
              <input className={styles.formStyling} type="text" name="last_name" placeholder="Ingrese su apellido" required/>
            </div>
          </div>
          <label htmlFor="fullname">Nombre de usuario</label>
          <input className={styles.formStyling} type="text" name="user_name" placeholder="Ingrese su nombre de usuario" required/>
          <label htmlFor="fullname">Fecha de nacimiento</label>
          <input className={styles.formStyling} type="date" name="birth_date" placeholder="Ingrese su fecha de nacimiento" required/>
          <label htmlFor="email">Email</label>
          <input className={styles.formStyling} type="email" name="email" placeholder="Email" required/>
          <label htmlFor="password">Password</label>
          <input className={styles.formStyling} type="password" name="password" placeholder="Password" required />
          <label htmlFor="confirmpassword">Confirm Password</label>
          <input className={styles.formStyling} type="password" name="confirmpassword" placeholder="Confirm Password" required/>
          <button type="submit" className={styles.btnSignup}>Registrarse</button>
        </form>
      </div>
    </div>
  );
}
