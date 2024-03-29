import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import styles from "./Login.module.scss";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";
import { Navigate } from "react-router-dom";
export let adminID: string = '';
export const Login: React.FC = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch<any>();
  const {register, handleSubmit, formState: {errors, isValid}} = useForm({
    defaultValues: {
      login: '',
      password: '',
    },
    mode: 'onChange',
  });
  const onSubmit = async (values: any) => {
    const data: any = await dispatch(fetchAuth(values));
    if (!data.payload) {
      return alert ('Не удалось авторизоваться');
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
    if ('isAdmin' in data.payload) {
      window.localStorage.setItem('isAdmin', data.payload.isAdmin);
    }
    adminID = data.payload._id;
  };

  if (isAuth) {
    return <Navigate to="/home"/>;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="Login"
          error={Boolean(errors.login?.message)}
          helperText={errors.login?.message}
          {...register('login', {required: 'Введите логин'})}
          fullWidth
        />
        <TextField className={styles.field} label="Пароль"
        error={Boolean(errors.password?.message)}
        helperText={errors.password?.message}
        {...register('password', {required: 'Введите пароль'})} fullWidth />
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>Войти</Button>
      </form>
    </Paper>
  );
};