import { FC } from 'react';
import { useHistory } from 'react-router';

import { Event } from '../../Types';
import { getDateFromString } from '../../utils/custom';

import styles from './Popover.module.css';


function getTableRow(e: Event, trCallback: (id: string) => void): JSX.Element {
  return (
    <tr key={e.id} onClick={() => trCallback(e.id)} className={styles.tr}>
      <td className={styles.td}>{getDateFromString(e.time)}</td>
      <td className={styles.td}>{e.title}</td>
      <td className={styles.td}>{e.description?.slice(0, 20)}</td>
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
      <h2 className={styles.title}>Ближайшие мероприятия: </h2>
      <table className={styles.table}><tbody>
        {events.slice(0, 3).map(event => getTableRow(event, trCallback))}
        </tbody></table>
    </div>
  );
};

export default Popover;
