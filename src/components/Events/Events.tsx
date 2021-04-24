import { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Event } from '../../Types';
import { loadAllEvents } from '../../utils/api/loadEvents';
import { compareEvents, getDateFromString } from '../../utils/custom';

import styles from './Events.module.css';

function getTableRow(e: Event, trCallback: (id: number) => void): JSX.Element {
  return (
    <tr key={e.id} onClick={() => trCallback(e.id)} className={styles.tr}>
      <td className={styles.td}>{getDateFromString(e.time)}</td>
      <td className={styles.td}>{e.title}</td>
      <td className={styles.td}>{e.description?.slice(0, 80)}</td>
      <td className={styles.td}>{e.room}</td>
    </tr>
  );
}

const Events: FC<{}> = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const history = useHistory();

  const trCallback = (id: number) => {
    history.push(`/events/${id}`);
  }

  useEffect(() => {
    loadAllEvents().then((eventsResponse) => {
      setEvents(eventsResponse.sort(compareEvents));
    });
  }, []);

  return (
    <>
      <h2 className={styles.title}>Расписание событий</h2>
      <table className={styles.table}><tbody>
        <tr className={styles.tr}>
          <th className={styles.th}>Дата и время</th>
          <th className={styles.th}>Название</th>
          <th className={styles.th}>Краткое описание</th>
          <th className={styles.th}>Аудитория</th>
        </tr>
        {events.map((event) => getTableRow(event, trCallback))}
        </tbody></table>
    </>
  );
};

export default Events;
