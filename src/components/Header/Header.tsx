import { FC, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { Store } from '../../redux/reduxTypes';
import { loadUserData } from '../../redux/User/actions';
import { User } from '../../Types';

import styles from './Header.module.css';

import { ReactComponent as LogoImage } from './school.svg';

const Header: FC<{}> = () => {
  const user = useSelector<Store, User | null>((state) => state.user);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogout = (e: MouseEvent): void => {
    dispatch(loadUserData(null));
    sessionStorage.removeItem('BookingServiceUser');
    history.push('/');
  }

  return (
    <div className={styles.header}>
      <ul className={styles.menuList}>
        <NavLink to='/' className={styles.logoItem}>
          <LogoImage className={styles.logoImage} />
        </NavLink>
        <NavLink to='/rooms' className={styles.menuItem} activeClassName={styles.menuItemActive}>
          Аудитории
        </NavLink>
        <NavLink to='/events' className={styles.menuItem} activeClassName={styles.menuItemActive}>
          События
        </NavLink>
      </ul>
      {user === null ?(
        <NavLink to='/login' className={styles.menuItem}>
          Войти
        </NavLink>
      ) : (
        <ul className={styles.menuList}>
          <NavLink to='/cabinet' className={styles.menuItem}>
            Кабинет
          </NavLink>
          <div className={styles.menuItem} onClick={handleLogout}>Выйти</div>
        </ul>
      )}
    </div>
  );
};

export default Header;
