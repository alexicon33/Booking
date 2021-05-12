import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { RegistrationPageFormData, User } from '../../Types';
import Button from '../Button/Button';
import { addUser } from '../../utils/api/loadUsers';

import styles from './RegistrationPage.module.css';
import { loadUserData } from '../../redux/User/actions';
import { useHistory } from 'react-router';

const RegistrationPage: FC<{}> = () => {
  const { register, handleSubmit, reset } = useForm<RegistrationPageFormData>();
  const [error, setError] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = handleSubmit((data: RegistrationPageFormData) => {
    console.log(data);
    addUser(data).then(
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
      <h2 className={styles.title}>Добро пожаловать!<br />Для регистрации достаточно придумать имя и пароль, <br /> ввести email и выбрать тип аккаунта.</h2>
      <form className={styles.registrationForm}>
        <input
          type='text'
          placeholder='Придумайте имя...'
          className={styles.input}
          {...register('name', { required: true })}>
        </input>
        <input
          type='text'
          placeholder='Введите ваш email...'
          className={styles.input}
          {...register('login', { required: true })}>
        </input>
        <input
          type='password'
          placeholder='Придумайте пароль...'
          className={styles.input} 
          {...register('password', { required: true })}>
        </input>
        <fieldset className={styles.fieldset}>
          <legend>Выберите тип аккаунта:</legend>
          <span>
            <input className={styles.radio} type="radio" id="user" value="user" {...register('userType', { required: true })} checked={true}/>
            <label htmlFor="user">Пользователь</label>
          </span>
          <span>
            <input className={styles.radio} type="radio" id="admin" value="admin" {...register('userType', { required: true })}/>
            <label htmlFor="admin">Администратор</label>
          </span>
        </fieldset>
        {error && <span className={styles.errorNote}>Такой пользователь уже зарегистрирован</span>}
        <Button text={'Зарегистрироваться'} onClick={onSubmit} />
      </form>
    </>
  );
};

export default RegistrationPage;
