import React from 'react';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../redux/slices/auth';
import { Link } from 'react-router-dom';
import { adminID } from './Login';
import Button from '@mui/material/Button';

export const UserHome = () => {
  const isAuth = useSelector(selectIsAuth);
  return (
    <>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {isAuth && adminID === '657760fe413c8157ca089e59' ?
          (<div><Link to="/adminPage"><Button>admin</Button></Link></div>): null}
          {isAuth ? ('Hello user'): null}
        </Grid>
      </Grid>
    </>
  );
};