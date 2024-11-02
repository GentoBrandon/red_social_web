import React, { ProfilerProps } from 'react';
import styles from '../../styles/Profile/ProfileActions.module.css';
import style from '../../styles/Profile/ProfileHeader.module.css';
import axiows from 'axios';
import { useState } from 'react';

interface ProfileActionsProps {
    userName: string;
    friendCount: number;
    }
interface DataUser{
    userName: string;
}
const ProfileActions: React.FC<ProfileActionsProps> = ({ userName, friendCount}) => {
  return (
    <div className={styles.actionsContainer}>
        <h2>{userName}</h2>
        <span>{friendCount} amigos</span>
    </div>
  );
};

export default ProfileActions;
