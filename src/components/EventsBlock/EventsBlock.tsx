import { FC } from 'react';
import { useHistory } from 'react-router-dom';

import { Event } from '../../Types';
import { getDateFromString, getTimeFromString } from '../../utils/custom';
import Loader from '../Loader/Loader';

import styles from './EventsBlock.module.css';


function getTableRow(e: Event, trCallback: (id: string) => void): JSX.Element {
  return (
    <tr key={e.id} onClick={() => trCallback(e.id)} className={styles.tr}>
      <td className={styles.td}>{`${getDateFromString(e.start)}`}</td>
      <td className={styles.td}>{`${getTimeFromString(e.start)} — ${getTimeFromString(e.end)}`}</td>
      <td className={styles.td}>{e.title}</td>
      <td className={styles.td}>{e.description?.slice(0, 80)}</td>
      <td className={styles.td}>{e.room}</td>
    </tr>
  );
}


const EventsBlock: FC<{ events: Event[] }> = ({ events }) => {
  const history = useHistory();

  const trCallback = (id: string) => {
    history.push(`/events/${id}`);
  }

  if (events === undefined) {
    return <Loader />
  }

  return (
    <table className={styles.table}><tbody>
      <tr className={styles.tr}>
        <th className={styles.th}>Дата</th>
        <th className={styles.th}>Время</th>
        <th className={styles.th}>Название</th>
        <th className={styles.th}>Краткое описание</th>
        <th className={styles.th}>Аудитория</th>
      </tr>
      {events.map((event) => getTableRow(event, trCallback))}
    </tbody></table>
  );
};

export default EventsBlock;
