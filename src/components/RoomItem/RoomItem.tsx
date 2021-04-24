import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Store } from '../../redux/reduxTypes';

import { Event, Room, User } from '../../Types';
import { loadEventsByRoom } from '../../utils/api/loadEvents';
import { getDateFromString } from '../../utils/custom';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';

import styles from './RoomItem.module.css';

function getEventRow(event: Event): JSX.Element {
  return (
    <NavLink to={`/events/${event.id}`} className={styles.link}>
      <span className={styles.date}>{getDateFromString(event.time)}</span>
      <span className={styles.date}>{event.title}</span>
    </NavLink>
  );
}

const RoomItem: FC<Room> = ({ id, type, photo }) => {
  const user: User | null = useSelector((state: Store) => state.user);
  const [events, setEvents] = useState<Event[] | null>(null);

  useEffect(() => {
    loadEventsByRoom(id).then((eventsResponse: Event[]) => {
      setEvents(eventsResponse);
    });
  }, [id]);

  if (events === null) return <Loader />;

  return (
    <div className={styles.box} key={id}>
      <div className={styles.descriptionBlock}>
        <div className={styles.title}>{id}</div>
        <span className={styles.capacity}>{`Вместимость: 20${type === 'lecture' ? '0' : ''} человек`}</span>
        <div className={styles.eventsBlock}>
          {events.length > 0 ? (
            <>
              <h3 className={styles.busy}>Ближайшие мероприятия:</h3>
              {events.map((event) => getEventRow(event))}
            </>
          ) : (
            <h3 className={styles.free}>Аудитория свободна, ближайших мероприятий нет</h3>
          )}
        </div>
        {user !== null && user.type === 'admin' && <div className={styles.buttonWrapper}><Button text='Забронировать' link='/booking'/></div>}
      </div>
      <img className={styles.photo} alt='Здесь могла бы быть картинка, но её нет(' src={photo} />
    </div>
  );
};

export default RoomItem;
