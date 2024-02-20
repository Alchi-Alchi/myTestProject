import React from 'react';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../redux/slices/auth';
import { Link } from 'react-router-dom';
import styles from '../components/Header/Header.module.scss';

export const UserHome: React.FC = () => {
  const isAuth = useSelector(selectIsAuth);
  return (
    <>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {isAuth ? ('Hello user'): null}
          {isAuth && window.localStorage.isAdmin === "true" ?
          (<div><Link to="/adminPage" className={styles.logo}>ADMIN</Link></div>): null}
        </Grid>
      </Grid>
    </>
  );
};