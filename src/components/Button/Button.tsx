import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { ButtonProps } from '../../Types';

import styles from './Button.module.css';

const Button: FC<ButtonProps> = ({text, onClick, link}) => {
  if (link) {
    return <NavLink to={link}>
      <button onClick={onClick} className={styles.button}>{text}</button>
    </NavLink>
  }

  return <button onClick={onClick} className={styles.button}>{text}</button>
}

export default Button;