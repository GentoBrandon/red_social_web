'use client';
import styles from '../../styles/SignUpForm.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { API_ROUTES } from '../../routes/apiRoutes';
import { useState } from 'react';
import { toast } from "nextjs-toast-notify";
import "nextjs-toast-notify/dist/nextjs-toast-notify.css";
import { useRouter } from 'next/navigation';
import React from 'react';

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
  const router = useRouter();
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
      toast.info("¡Error, las contraseñas no coinciden!", {
        duration: 1500,
        progress: true,
        position: "top-center",
        transition: "bounceIn",
      });
      return;
    }

    // Validación de campos vacíos
    if (Object.values(user).some(value => value === '')) {
      toast.info("Todos los campos son obligatorios", {
        duration: 1500,
        progress: true,
        position: "top-center",
        transition: "bounceIn",
      });
      return;
    }

    const { confirmpassword, ...userToSubmit } = user;

    try {
      const response = await axios.post(API_ROUTES.REGISTER, userToSubmit);
      toast.success("¡Usuario registrado correctamente!", {
        duration: 1500,
        progress: true,
        position: "top-center",
        transition: "bounceIn",
      });
      router.push('/dashboard');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`Error: ${error.response?.data.message || "Error al registrar usuario"}`, {
          duration: 1500,
          progress: true,
          position: "top-center",
          transition: "bounceIn",
        });
      } else {
        toast.error("Error desconocido", {
          duration: 1500,
          progress: true,
          position: "top-center",
          transition: "bounceIn",
        });
      }
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
                id="first_name"
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
                id="last_name"
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
            id="user_name"
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
            id="birth_date"
            required
            value={user.birth_date}
            onChange={handleChange}
          />
          <label htmlFor="email">Email</label>
          <input
            className={styles.formStyling}
            type="email"
            name="email"
            id="email"
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
            id="password"
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
            id="confirmpassword"
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
