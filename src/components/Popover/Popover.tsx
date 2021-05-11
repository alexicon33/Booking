import { FC } from 'react';
import { useHistory } from 'react-router';

import { Event } from '../../Types';
import { getDateFromString, getTimeFromString } from '../../utils/custom';

import styles from './Popover.module.css';


function getTableRow(e: Event, trCallback: (id: string) => void): JSX.Element {
  return (
    <tr key={e.id} onClick={() => trCallback(e.id)} className={styles.tr}>
      <td className={styles.td}>{`${getDateFromString(e.start)}`}</td>
      <td className={styles.td}>{`${getTimeFromString(e.start)} — ${getTimeFromString(e.end)}`}</td>
      <td className={styles.td}>{e.title}</td>
      <td className={styles.td}>
        {e.description ? e.description.slice(0, 25) + (e.description.length > 25 ? '...' : '') : '—'}
      </td>
    </tr>
  );
}

const Popover: FC<{events: Event[]}> = ({ events }) => {
  const history = useHistory();

  const trCallback = (id: string) => {
    history.push(`/events/${id}`);
  }

  return (
    <div className={styles.box}>
      <h2 className={styles.title}>{events.length > 0 ? 'Ближайшие мероприятия:' : 'Ближайших мероприятий нет'}</h2>
      <table className={styles.table}><tbody>
        {events.slice(0, 3).map(event => getTableRow(event, trCallback))}
        </tbody></table>
    </div>
  );
};

export default Popover;
