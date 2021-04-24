import { FC } from 'react';

import styles from './Loader.module.css';
import spinner from './spinner.gif';
 

const Loader: FC<{}> = () => {
  return (
    <img src={spinner} alt='Подождите, идёт загрузка...' className={styles.loader}/>
  );
};

export default Loader;