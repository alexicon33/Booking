import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Store } from '../../redux/reduxTypes';
import { User } from '../../Types';
import Button from '../Button/Button';

import styles from './Cabinet.module.css';

const Cabinet: FC<{}> = () => {
  const user: User | null = useSelector((state: Store) => state.user);

  return (
    <>
      <h2 className={styles.title}>Пока бронирований и приглашений нет...</h2>
      {user !== null && user.type === 'admin' && (
        <div className={styles.buttonWrapper}>
          <Button text='Забронировать аудиторию' link='/booking' />
        </div>
      )}
    </>
  );
};

export default Cabinet;
