import React from 'react';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import styles from './Post.module.scss';
import { UserInfo } from '../UserInfo';
import { PostSkeleton } from './Skeleton';
import { useDispatch } from 'react-redux';
import { fetchRemoveUsers } from '../../redux/slices/users';

export const Post = ({
  id,
  createdAt,
  userName,
  login,
  isFullPost,
  isLoading,
  isEditable,
}) => {
  const dispatch = useDispatch();
  if (isLoading) {
    return <PostSkeleton />;
  }
  const onClickRemove = () => {
    if (window.confirm('Вы действительно хотите удалить пользователя?')) {
      dispatch(fetchRemoveUsers(id));
    }
  };
  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
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