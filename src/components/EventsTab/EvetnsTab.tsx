import { FC, useState, useEffect } from 'react';
import { Event } from '../../Types';
import { loadAllEvents } from '../../utils/api/loadEvents';
import { compareEvents } from '../../utils/custom';
import EventsBlock from '../EventsBlock/EventsBlock';

import styles from './EventsTab.module.css';


const EventsTab: FC<{}> = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    loadAllEvents().then((eventsResponse) => {
      setEvents(eventsResponse.sort(compareEvents));
    });
  }, []);

  return (
    <>
      <h2 className={styles.title}>Расписание событий</h2>
      <EventsBlock events={events} />
    </>
  );
}

export default EventsTab;