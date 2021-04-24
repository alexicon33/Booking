import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { setValid } from '../../redux/ValidData/actions';
import { DatePicker, Select, TimePicker } from 'antd';

import { BookingFormData, User } from '../../Types';
import { Store } from '../../redux/reduxTypes';
import Button from '../Button/Button';
import { addEvent } from '../../utils/api/loadEvents';
import rooms from '../Rooms/rooms.json';

import styles from './BookingForm.module.css';

const { Option } = Select;

const BookingForm: FC<{}> = () => {
  const { register, handleSubmit, setValue } = useForm();

  const [error, setError] = useState<boolean>(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const user: User | null = useSelector((state: Store) => state.user)

  useEffect(() => {
    register('room', { required: true });
    register('date', { required: true });
    register('time', { required: true });
  }, [register]);

  const onSubmit = handleSubmit((data: BookingFormData) => {
    const dateDays = new Date(data.date);
    const dateTime = new Date(data.time);
    const dateString = new Date(dateDays.getFullYear(), dateDays.getMonth(), dateDays.getDate(), 
                                dateTime.getHours(), dateTime.getMinutes()).toISOString();
    addEvent(data, dateString, user?.id).then(
      () => {
        dispatch(setValid(false));
        history.push('/events');
      },
      (error) => {
        console.log(error);
        setError(true);
      }
    );
  });

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
                placeholder='Выберите дату'
                onChange={(newDateObject) => {
                  setValue('date', newDateObject?.utc().format());
                }}
              />
              <TimePicker
                className={styles.Picker}
                format='HH:mm'
                placeholder='Выберите время'
                onChange={(newTimeObject) => {
                  setValue('time', newTimeObject?.utc().format());
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
          <textarea
            className={`${styles.photoLink} ${styles.input}`}
            placeholder='Ссылка на картинку. Потом надо будет разобраться с хостингом изображений и сделать по-нормальному.'
            {...register('photo')}
          />
        </div>
        <h2 className={styles.title}>Приглашённые пользователи</h2>
        <textarea className={`${styles.input} ${styles.participants}`} placeholder='Введите e-mail-ы в любом формате' {...register('participants')}/>
        {error && <span className={styles.errorNote}>Извините, но в выбранное время аудитория уже занята.</span>}
        <div className={styles.buttonWrapper}><Button text={'Забронировать'} onClick={onSubmit} /></div>
      </form>
    </>
  );
};

export default BookingForm;
