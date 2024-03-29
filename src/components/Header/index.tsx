import React from 'react';
import Button from '@mui/material/Button';
import {Link} from "react-router-dom";
import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectIsAuth } from '../../redux/slices/auth';

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const onClickLogout = () => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
      if ('isAdmin' in window.localStorage) {
        window.localStorage.removeItem('isAdmin');
      };
    };
    document.location.reload();
  };
  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/home"><div>HOME</div></Link>
          <div className={styles.buttons}>
            {isAuth ? (<><Button onClick={onClickLogout} variant="contained" color="error">Выйти</Button></>): 
              (<><Link to="/login"><Button variant="outlined">Войти</Button></Link></>)}
          </div>
        </div>
      </Container>
    </div>
  );
};