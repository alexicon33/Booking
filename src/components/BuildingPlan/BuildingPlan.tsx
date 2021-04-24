import { FC, useEffect, useState } from 'react';
import { Popover } from 'antd';

import styles from './BuildingPlan.module.css';
import { loadAllEvents } from '../../utils/api/loadEvents';
import { Event } from '../../Types';
import { selectEvents } from '../../utils/custom';
import PopoverContent from '../Popover/Popover';
import { NavLink } from 'react-router-dom';

const BuildingPlan: FC<{}> = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    loadAllEvents().then((eventsResponse) => {
      setEvents(eventsResponse);
    });
  }, []);

  return (
    <div className={styles.box}>
      <div className={styles.leftLectureHall}>
        <Popover content={<PopoverContent events={selectEvents(events, 'Большая Физическая')} />}>
          <NavLink to='/booking'>
            <div className={`${styles.lectureRoom} ${styles.left}`}>
              Большая
              <br />
              Физическая
            </div>
          </NavLink>
        </Popover>
      </div>
      <div className={styles.BordersContainer}>
        <div className={styles.upSpace} />
        <div className={styles.Container}>
          <div className={styles.rooms}>
            <Popover content={<PopoverContent events={selectEvents(events, '402')} />}>
              <div className={`${styles.room} ${styles.up}`} id='402'>
                402
              </div>
            </Popover>
            <Popover content={<PopoverContent events={selectEvents(events, '404')} />}>
              <div className={`${styles.room} ${styles.up}`} id='404'>
                404
              </div>
            </Popover>
            <Popover content={<PopoverContent events={selectEvents(events, '406')} />}>
              <div className={`${styles.room} ${styles.up}`} id='406'>
                406
              </div>
            </Popover>
            <Popover content={<PopoverContent events={selectEvents(events, '408')} />}>
              <div className={`${styles.room} ${styles.up}`} id='408'>
                408
              </div>
            </Popover>
          </div>
          <div className={styles.hall}></div>
          <div className={styles.rooms}>
            <Popover content={<PopoverContent events={selectEvents(events, '401')} />}>
              <div className={`${styles.room} ${styles.down}`} id='401'>
                401
              </div>
            </Popover>
            <Popover content={<PopoverContent events={selectEvents(events, '403')} />}>
              <div className={`${styles.room} ${styles.down}`} id='403'>
                403
              </div>
            </Popover>
            <Popover content={<PopoverContent events={selectEvents(events, '405')} />}>
              <div className={`${styles.room} ${styles.down}`} id='405'>
                405
              </div>
            </Popover>
            <Popover content={<PopoverContent events={selectEvents(events, '407')} />}>
              <div className={`${styles.room} ${styles.down}`} id='407'>
                407
              </div>
            </Popover>
          </div>
        </div>
        <div className={styles.downSpace} />
      </div>
      <div className={styles.rightLectureHall}>
        <Popover content={<PopoverContent events={selectEvents(events, 'Большая Химическая')} />}>
          <div className={`${styles.lectureRoom} ${styles.right}`}>
            Большая
            <br />
            Химическая
          </div>
        </Popover>
      </div>
    </div>
  );
};

export default BuildingPlan;
