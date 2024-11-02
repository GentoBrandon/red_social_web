import React from 'react';
import styles from '../../styles/Profile/Tabs.module.css';

const Tabs: React.FC = () => {
  return (
    <div className={styles.tabsContainer}>
      <button className={styles.tab}>Publicaciones</button>
      <button className={styles.tab}>Información</button>
      <button className={styles.tab}>Amigos</button>
      <button className={styles.tab}>Fotos</button>
      <button className={styles.tab}>Videos</button>
      <button className={styles.tab}>Reels</button>
      <button className={styles.tab}>Más</button>
    </div>
  );
};

export default Tabs;
