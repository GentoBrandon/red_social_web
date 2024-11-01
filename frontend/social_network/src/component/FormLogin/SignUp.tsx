'use client';
import styles from '../../styles/SignUpForm.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { API_ROUTES } from '../../routes/apiRoutes';
import { useState } from 'react';

interface User {
  first_name: string;
  last_name: string;
  user_name: string;
  birth_date: string;
  email: string;
  password: string;
  confirmpassword: string;
}

export default function SignUpForm() {
  const [user, setUser] = useState<User>({
    first_name: '',
    last_name: '',
    user_name: '',
    birth_date: '',
    email: '',
    password: '',
    confirmpassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    // Validación de la confirmación de contraseña
    if (user.password !== user.confirmpassword) {
      console.error("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(API_ROUTES.REGISTER, user);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.frame}>
        <form className={styles.formSignup} onSubmit={handleSubmit}>
          <label htmlFor="first_name">Nombre completo</label>
          <div className="row">
            <div className="col">
              <input
                className={styles.formStylingII}
                type="text"
                name="first_name"
                placeholder="Ingrese su nombre"
                required
                value={user.first_name}
                onChange={handleChange}
              />
            </div>
            <div className="col">
              <input
                className={styles.formStylingII}
                type="text"
                name="last_name"
                placeholder="Ingrese su apellido"
                required
                value={user.last_name}
                onChange={handleChange}
              />
            </div>
          </div>
          <label htmlFor="user_name">Nombre de usuario</label>
          <input
            className={styles.formStyling}
            type="text"
            name="user_name"
            placeholder="Ingrese su nombre de usuario"
            required
            value={user.user_name}
            onChange={handleChange}
          />
          <label htmlFor="birth_date">Fecha de nacimiento</label>
          <input
            className={styles.formStyling}
            type="date"
            name="birth_date"
            placeholder="Ingrese su fecha de nacimiento"
            required
            value={user.birth_date}
            onChange={handleChange}
          />
          <label htmlFor="email">Email</label>
          <input
            className={styles.formStyling}
            type="email"
            name="email"
            placeholder="Email"
            required
            value={user.email}
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            className={styles.formStyling}
            type="password"
            name="password"
            placeholder="Password"
            required
            value={user.password}
            onChange={handleChange}
          />
          <label htmlFor="confirmpassword">Confirm Password</label>
          <input
            className={styles.formStyling}
            type="password"
            name="confirmpassword"
            placeholder="Confirm Password"
            required
            value={user.confirmpassword}
            onChange={handleChange}
          />
          <button type="submit" className={styles.btnSignup}>
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}
