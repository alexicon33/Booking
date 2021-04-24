import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { LoginPageFormData, User } from '../../Types';
import Button from '../Button/Button';
import { loadUser } from '../../utils/api/loadUsers';

import styles from './LoginPage.module.css';
import { loadUserData } from '../../redux/User/actions';
import { useHistory } from 'react-router';

const LoginPage: FC<{}> = () => {
  const { register, handleSubmit, reset } = useForm<LoginPageFormData>();
  const [error, setError] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = handleSubmit((data: LoginPageFormData) => {
    loadUser(data.login, data.password).then(
      (user: User) => {
        dispatch(loadUserData(user));
        sessionStorage.setItem('BookingServiceUser', JSON.stringify(user));
        history.push('/cabinet');
      },
      () => {
        setError(true);
        reset();
      }
    );
  });

  return (
    <>
      <h2 className={styles.title}>Добро пожаловать!</h2>
      <form className={styles.loginForm}>
        <input
          type='text'
          placeholder='Введите ваш логин...'
          className={styles.input}
          {...register('login', { required: true })}>
        </input>
        <input
          type='password'
          placeholder='Введите ваш пароль...'
          className={styles.input} 
          {...register('password', { required: true })}>
        </input>
        {error && <span className={styles.errorNote}>Неверный логин или пароль</span>}
        <Button text={'Войти'} onClick={onSubmit} />
      </form>
    </>
  );
};

export default LoginPage;
