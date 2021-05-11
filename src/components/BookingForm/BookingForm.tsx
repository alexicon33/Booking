import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { setValid } from '../../redux/ValidData/actions';
import { DatePicker, Select, TimePicker } from 'antd';

import { BookingFormData, User } from '../../Types';
import { Store } from '../../redux/reduxTypes';
import Button from '../Button/Button';
import { addEvent, checkEvent } from '../../utils/api/loadEvents';
import rooms from '../Rooms/rooms.json';

import styles from './BookingForm.module.css';
import Loader from '../Loader/Loader';
import { getISOstring } from '../../utils/custom';
import defaultImage from '../EventPage/default-placeholder.png';

const { Option } = Select;


const BookingForm: FC<{}> = () => {
  const { register, handleSubmit, setValue } = useForm();

  const [error, setError] = useState<string>('');
  const [sent, setSent] = useState<boolean>(true);
  const [imageLink, setImageLink] = useState<string>(defaultImage);

  const history = useHistory();
  const dispatch = useDispatch();

  const user: User | null = useSelector((state: Store) => state.user)

  useEffect(() => {
    register('room', { required: true });
    register('date', { required: true });
    register('start', { required: true });
    register('end', { required: true });
  }, [register]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.onload = (() => {setImageLink(reader.result as string)});
    reader.readAsDataURL((e.target.files as FileList)[0]);
  }

  const onSubmit = handleSubmit((data: BookingFormData) => {
    const dateStart = getISOstring(data.date, data.start);
    const dateEnd = getISOstring(data.date, data.end);
    checkEvent(data, dateStart, dateEnd, user?.id).then(
      () => {
        setSent(false);
        return addEvent(data, dateStart, dateEnd, user?.id || '');
      }
    ).then(
      () => {
        dispatch(setValid(false));
        history.push('/events');
      },
      (err) => {
        setError(err.message);
      }
    ).finally(() => { setSent(true); });
  });

  if (!sent) {
    return <>
      <Loader />
      <h2 className={styles.title}>Отправляем приглашения...</h2>
    </>
  }

  if (user === null || user.type !== 'admin') {
    return <h2 className={styles.warnNote}>Эта страница находится в закрытой зоне. Для бронирования аудитории войдите в аккаунт администратора.</h2>
  }

  return (
    <>
      <h2 className={styles.title}>Создание мероприятия</h2>
      <form className={styles.bookingForm}>
        <div className={styles.box}>
          <div className={styles.mainBox}>
            <input
              type='text'
              placeholder='Название мероприятия'
              className={styles.input}
              {...register('title', { required: true })}
            />
            <div className={styles.dateTimeBox}>
              <DatePicker
                className={styles.Picker}
                placeholder='Дата'
                onChange={(newDateObject) => {
                  setValue('date', newDateObject?.utc().format());
                }}
              />
              <TimePicker
                className={styles.Picker}
                format='HH:mm'
                placeholder='Время начала...'
                onChange={(newTimeObject) => {
                  setValue('start', newTimeObject?.format());
                }}
              />
              <TimePicker
                className={styles.Picker}
                format='HH:mm'
                placeholder='Время окончания...'
                onChange={(newTimeObject) => {
                  setValue('end', newTimeObject?.format());
                }}
              />
            </div>
            <textarea
              className={styles.input}
              placeholder='Краткое описание мероприятия'
              {...register('description')}
            />
            <Select
              placeholder='Выберите аудиторию'
              onChange={(newValue: string) => {
                setValue('room', newValue);
              }}>
              {rooms.map((room) => (
                <Option value={room.id} key={room.id}>
                  {room.id}
                </Option>
              ))}
            </Select>
          </div>
          <div className={styles.imageUpload}>
            <label htmlFor="file-input">
              <img src={imageLink} alt='Картинка мероприятия'/>
            </label>
            <input id="file-input" type="file" {...register('photo')} onChange={handleFile}/>
          </div>
        </div>
        <h2 className={styles.title}>Приглашённые пользователи</h2>
        <textarea className={`${styles.input} ${styles.participants}`} placeholder='Введите e-mail-ы в любом формате' {...register('participants')}/>
        {error && <span className={styles.errorNote}>{`${error}`}</span>}
        <div className={styles.buttonWrapper}><Button text={'Забронировать'} onClick={onSubmit} /></div>
      </form>
    </>
  );
};

export default BookingForm;
