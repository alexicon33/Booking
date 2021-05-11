import { BookingFormData, Event, User } from '../../Types';
import { compareEvents } from '../custom';

import { db, dbLink, storage } from '../../index';

export async function loadAllEvents(): Promise<Event[]> {
  return fetch(`${dbLink}/events.json`)
    .then((response) => response.json())
    .then((response) => Object.values(response) as Event[])
    .then((eventsArray) => eventsArray.sort(compareEvents));
}

export async function loadEventById(id: string): Promise<Event> {
  return db
    .ref(`events/${id}`)
    .get()
    .then((snapshot) => snapshot.val());
}

export async function loadEventsByRoom(id: string): Promise<Event[]> {
  return fetch(`${dbLink}/events.json?orderBy="room"&equalTo="${id}"`)
    .then((response) => response.json())
    .then((response) => Object.values(response) as Event[])
    .then((eventsArray) => eventsArray.sort(compareEvents));
}

export async function loadEventsByOrganiser(id: string): Promise<Event[]> {
  return fetch(`${dbLink}/events.json?orderBy="organiser"&equalTo="${id}"`)
    .then((response) => response.json())
    .then((response) => Object.values(response) as Event[])
    .then((eventsArray) => eventsArray.sort(compareEvents));
}

export async function loadEventsByParticipant(id: string): Promise<Event[]> {
  return fetch(`${dbLink}/events.json?`)
    .then((response) => response.json())
    .then((response) => Object.values(response) as Event[])
    .then((eventsArray) => eventsArray.filter(event => event.participants.includes(id)));
}

export async function checkEvent(formData: BookingFormData, dateStart: string, dateEnd: string, userId?: string) {
  if (userId === undefined) {
    throw Error('Извините, но вы не можете бронировать аудитории. Войдите в аккаунт администратора.');
  }

  if (dateEnd <= dateStart) {
    throw Error('Время окончания не может быть раньше времени начала');
  }

  const currentTimeString = (new Date()).toISOString();
  if (dateStart < currentTimeString) {
    throw Error('Нельзя создать мероприятие в прошлом: время начала не может быть раньше текущего времени');
  }

  const eventsInTime: Event[] = await fetch(`${dbLink}/events.json?orderBy="start"&startAt="${currentTimeString}"`)
    .then((res) => res.json())
    .then((res) => Object.values(res) as Event[])
    .then((events) => events.filter((event) => event.room === formData.room));

  eventsInTime.forEach(event => {
    if (Math.max(Date.parse(event.start), Date.parse(dateStart)) < Math.min(Date.parse(event.end), Date.parse(dateEnd))) {
      throw Error('Извините, но в выбранное время аудитория уже занята');
    }
  })
}


async function getPhotoUrl(eventId: string, file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const fileRef = storage.ref(`/images/${eventId}`);
    const uploadTask = fileRef.put(file);
    uploadTask.on('state_changed', 
      () => {}, 
      () => { reject('Ошибка загрузки файла'); }, 
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log('File available at', downloadURL);
          resolve(downloadURL)
        });
      }
    );
  })
}


export async function addEvent(formData: BookingFormData, dateStart: string, dateEnd: string, userId: string) {

  let users: User[] = await fetch(`${dbLink}/users.json`)
    .then((response) => response.json())
    .then((usersObject) => Object.values(usersObject) as User[]);
  users = users.filter((user) => formData.participants.includes(user.email));

  let eventId: string = '';
  const newEventRef = await db.ref('events').push();
  await newEventRef.get().then(snapshot => {
    eventId = snapshot.key || '';
  });

  let photo = '';
  if (formData.photo && formData.photo.length > 0) {
    photo = await getPhotoUrl(eventId, formData.photo[0]);
  }

  const participants = (users.length > 0 ? users.map(user => user.id) : ['null_id']);

  const objectToSend: Event = {
    id: eventId,
    title: formData.title,
    start: dateStart,
    end: dateEnd,
    description: formData.description,
    room: formData.room,
    photo,
    organiser: userId,
    participants,
  };
  await newEventRef.set(objectToSend);
}
