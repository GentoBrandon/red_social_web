import React from 'react';
import styles from '../../styles/Profile/ProfileHeader.module.css';

interface ProfileHeaderProps {
  coverImage: string;
  profileImage: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ coverImage, profileImage}) => {
  return (
    <div className={styles.headerContainer}>
      <img src="/portada.png" alt="Cover" className={styles.coverImage} />
      <div className={styles.profileSection}>
        <img src="/avatar.png" alt="Profile" className={styles.profileImage} />
      </div>
    </div>
  );
};

export default ProfileHeader;
