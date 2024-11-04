'use client';
import React from 'react';
import styles from '../../styles/Profile/Tabs.module.css';
import { useRouter } from 'next/navigation';

const Tabs: React.FC = () => {
  const router = useRouter();
  return (
    <div className={styles.tabsContainer}>
      <button className={styles.tab} onClick={() => router.push('/users/profile')}>Publicaciones</button>
      <button className={styles.tab} onClick={() => router.push('/users/information')}>Información</button>
      <button className={styles.tab} onClick={() => router.push('/users/friends')}>Amigos</button>
      <button className={styles.tab}>Fotos</button>
      <button className={styles.tab}>Videos</button>
      <button className={styles.tab}>Reels</button>
      <button className={styles.tab}>Más</button>
    </div>
  );
};

export default Tabs;
