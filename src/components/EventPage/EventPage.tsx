import { FC, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';

import { Event, EventId, User } from '../../Types';
import { loadEventById } from '../../utils/api/loadEvents';
import { loadUsersByIds, loadUserById } from '../../utils/api/loadUsers';
import { getDateFromString, getTimeFromString } from '../../utils/custom';
import Loader from '../Loader/Loader';
import defaultImage from './default-placeholder.png';

import styles from './EventPage.module.css'; 

const EventPage: FC<RouteComponentProps<EventId>> = ({ match }) => {
  const [event, setEvent] = useState<Event | null>(null);
  const [participants, setParticipants] = useState<User[]>([]);
  const [organiser, setOrganiser] = useState<User | null>(null);

  useEffect(() => {
    loadEventById(match.params.eventId).then(eventResponse => {
      setEvent(eventResponse);
    })
  }, [match.params.eventId]);

  useEffect(() => {
    if (event !== null) {
      loadUsersByIds(event.participants).then(usersResponse => {
        setParticipants(usersResponse);
      })
    }
  }, [event]);

  useEffect(() => {
    if (event !== null) {
      loadUserById(event.organiser).then(organiserResponse => {
        setOrganiser(organiserResponse);
      })
    }
  }, [event])

  if (event === null || organiser === null)
    return <Loader />;

  return (
    <div className={styles.box}>
      <div className={styles.descriptionBox}>
        <div className={styles.description}>
          <div className={styles.title}>{event.title}</div>
          <div className={styles.dateTime}>{`Дата: ${getDateFromString(event.start)}`}</div>
          <div className={styles.dateTime}>{`Время: ${getTimeFromString(event.start)} — ${getTimeFromString(event.end)}`}</div>
          <div className={styles.organiser}>{`Организатор: ${organiser.name}`}</div>
          <div className={styles.details}>{event.description}</div>
        </div>
        <img alt='Здесь могла бы быть картинка, но её нет(' src={event.photo || defaultImage} className={styles.photo}/>
      </div>
      <div className={styles.participants}>
        <h3 className={styles.participantsTitle}>Приглашённые пользователи</h3>
        <ul>
          {participants.map(user => <li key={user.id} className={styles.userItem}>{user.name}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default EventPage;