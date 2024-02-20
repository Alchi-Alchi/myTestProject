import React from 'react';
import styles from './UserInfo.module.scss';

interface UserInfoProps {
  avatarUrl?: string | undefined;
  login: string;
  additionalText: [string, string, string, string];
};

export const UserInfo: React.FC<UserInfoProps> = ({ avatarUrl, login, additionalText }) => {
  return (
    <div className={styles.root}>
      <img className={styles.avatar} src={avatarUrl || '/noavatar.png'} alt={login} />
      <div className={styles.userDetails}>
        <span className={styles.userName}>Имя пользователя: {additionalText[0]}</span>
        <span className={styles.additional}>Login: {additionalText[1]}</span>
        <span className={styles.additional}>ID: {additionalText[2]}</span>
        <span className={styles.additional}>Создан: {additionalText[3]}</span>
      </div>
    </div>
  );
};
