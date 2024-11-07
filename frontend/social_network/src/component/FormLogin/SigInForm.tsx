'use client';
import styles from '../../styles/SignInForm.module.css';
import { Button } from '@/components/ui/button';
import {useRouter} from 'next/navigation';
import { useState } from 'react';
import { API_ROUTES } from '../../routes/apiRoutes';
import axios from 'axios';
import { toast } from "nextjs-toast-notify";
import "nextjs-toast-notify/dist/nextjs-toast-notify.css";

interface User {
  user_name: string;
  password: string;
}
export default function SignInForm() {
  const router = useRouter();
  const [user, setUser] = useState<User>({
    user_name: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>):void =>{
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> =>{
    e.preventDefault();
    try{
      const response = await axios.post(API_ROUTES.LOGIN, user, {withCredentials: true});
      router.push('/dashboard');
      toast.success("¡Bienvenido!", {
        duration: 1500,
        progress: true,
        position: "top-center",
        transition: "bounceIn",
      });
      console.log(response);
    }catch(error){
      console.error(error);
      toast.error("¡Error al iniciar sesión!", {
        duration: 1500,
        progress: true,
        position: "top-center",
        transition: "bounceIn",
      });
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.frame}>
        <form className={styles.formSignin} onSubmit={handleSubmit} >
          <label htmlFor="username">Username</label>
          <input className={styles.formStyling} 
          type="text" 
          name="user_name"
          id="user_name" 
          placeholder="Username" 
          value={user.user_name}
          onChange={handleChange}
          required/>
          <label htmlFor="password">Password</label>
          <input className={styles.formStyling} 
          type="password" 
          name="password" 
          placeholder="Password" 
          value={user.password}
          onChange={handleChange}
          required/>
          <button type="submit" className={styles.btnSignin}>Iniciar sesión</button>
        </form>
        <a href="#" className={styles.forgot}>Forgot your password?</a>
        <br/>
        <br/>
        <Button variant="btnGreen" onClick={() => router.push('login/sign_up')}>Crear cuenta nueva</Button>
      </div>
    </div>
  );
}
