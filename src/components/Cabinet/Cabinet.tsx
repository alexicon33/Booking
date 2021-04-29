import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Store } from '../../redux/reduxTypes';
import { Event, User } from '../../Types';
import Button from '../Button/Button';
import EventsBlock from '../EventsBlock/EventsBlock';
import { loadEventsByOrganiser, loadEventsByParticipant } from '../../utils/api/loadEvents';

import styles from './Cabinet.module.css';
import Loader from '../Loader/Loader';

const Cabinet: FC<{}> = () => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [orgEvents, setOrgEvents] = useState<Event[]>([])
  const [userEvents, setUserEvents] = useState<Event[]>([]);
  const user: User | null = useSelector((state: Store) => state.user);

  useEffect(() => {
    async function fetchEvents(): Promise<void> {
      if (user === null) {
        return;
      }
      setOrgEvents(await loadEventsByOrganiser(user.id));
      setUserEvents(await loadEventsByParticipant(user.id));
      setLoaded(true);
    }

    fetchEvents();
  }, [user]);

  if (!loaded) {
    return <Loader />
  }

  return (
    <>
      {user !== null && user.type === 'admin' && (orgEvents.length > 0 ?
        <> 
          <h2 className={styles.title}>Ваши бронирования</h2>
          <EventsBlock events={orgEvents} />
          <div className={styles.buttonWrapper}>
            <Button text='Забронировать аудиторию' link='/booking' />
          </div>
        </>
        : <h2 className={styles.title}>Пока бронирований нет...</h2>)}
      {user !== null && user.type === 'admin' && <hr className={styles.hr}/>}
      {userEvents.length > 0 ?
        <> 
          <h2 className={styles.title}>Вы приглашены</h2>
          <EventsBlock events={userEvents} />
        </>
        : <h2 className={styles.title}>Пока приглашений нет...</h2>}
    </>
  );
};

export default Cabinet;
