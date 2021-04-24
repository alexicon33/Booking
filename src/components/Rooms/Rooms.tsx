import { FC } from 'react';
import { Room } from '../../Types';

import RoomItem from '../RoomItem/RoomItem';
import rooms from './rooms.json';

import styles from './Rooms.module.css';

const Rooms: FC<{}> = () => {
  return (
    <>
      <div className={styles.block}>
        <h2 className={styles.title}>Лекционные</h2>
        {rooms.filter(room => room.type === 'lecture').map(room => <RoomItem {...(room as Room)} />)}
      </div>
      <div className={styles.block}>
        <h2 className={styles.title}>Семинарские</h2>
        {rooms.filter(room => room.type === 'seminar').map(room => <RoomItem {...(room as Room)} />)}
      </div>
    </>
  );
};

export default Rooms;
