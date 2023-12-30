import React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../components/User';
import { fetchUsers } from '../redux/slices/users';
import { selectIsAuth } from '../redux/slices/auth';
export const Home = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const userData = useSelector((state) => state.auth.data);
  const {users} = useSelector(state => state.users);
  const isUsersLoading = users.status === 'loading';
  React.useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  return (
    <>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {isAuth ? (isUsersLoading ? [...Array(5)] : users.items).map((obj, index) =>
           isUsersLoading ? (<User key={index} isLoading={true}/>):
          (<User
            id={obj._id}
            login={obj.login}
            userName={obj.userName}
            createdAt={obj.createdAt}
            isEditable={userData?._id === '657760fe413c8157ca089e59'}/>)): null}
            {isAuth ? (<Link to="/register"><Button variant="contained">Добавить пользователя</Button></Link>): null}
        </Grid>
      </Grid>
    </>
  );
};