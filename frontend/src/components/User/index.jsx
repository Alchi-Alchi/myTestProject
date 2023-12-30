import React from 'react';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import styles from './User.module.scss';
import { UserInfo } from '../UserInfo';
import { useDispatch } from 'react-redux';
import { fetchRemoveUsers } from '../../redux/slices/users';

export const User = ({
  id,
  createdAt,
  userName,
  login,
  isLoading,
  isEditable,
}) => {
  const dispatch = useDispatch();
  if (isLoading) {
    return null;
  }
  const onClickRemove = () => {
    if (window.confirm('Вы действительно хотите удалить пользователя?')) {
      dispatch(fetchRemoveUsers(id));
    }
  };
  return (
    <div className={clsx(styles.root)}>
      {isEditable && (
        <div className={styles.editButtons}>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      <div className={styles.wrapper}>
        <UserInfo additionalText={[userName, login, id, createdAt]} />
      </div>
    </div>
  );
};